package com.jsiviewhelpers.textSize;

import android.content.Context;
import android.graphics.Matrix;
import android.graphics.RectF;
import android.os.Build;
import android.text.BoringLayout;
import android.text.Layout;
import android.text.SpannableString;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.view.View;
import android.view.ViewParent;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.DisplayMetricsHolder;

import javax.annotation.Nullable;

public class RNTextSize {

  private static final String TAG = "RNTextSize";
  private static final float SPACING_ADDITION = 0f;
  private static final float SPACING_MULTIPLIER = 1f;

  public static Context mReactContext;

  /**
   * Based on ReactTextShadowNode.java
   */
  // {height, width, lineCount, lastLineWidth}
  @Nullable
  public static double[] measure(
    String t,
    @Nullable String fontFamily,
    double fontSize,
    double maxWidth,
    boolean usePreciseWidth,
    boolean allowFontScaling
  ) {
    WritableMap specs = Arguments.createMap();
    specs.putString("text", t);
    specs.putString("fontFamily", fontFamily);
    specs.putDouble("fontSize", fontSize);
    specs.putDouble("width", maxWidth);
    specs.putBoolean("usePreciseWidth", usePreciseWidth);
    specs.putBoolean("allowFontScaling", allowFontScaling);
    final RNTextSizeConf conf = getConf(specs, true);

    final String _text = conf.getString("text");
    if (_text == null) {
      return new double[0];
    }

    final float density = getCurrentDensity();
    final float width = conf.getWidth(density);
    final boolean includeFontPadding = conf.includeFontPadding;

    if (_text.isEmpty()) {
      return new double[] {minimalHeight(density, includeFontPadding), 0, 0, 0};
    }

    final SpannableString text = (SpannableString) RNTextSizeSpannedText
      .spannedFromSpecsAndText(mReactContext, conf, new SpannableString(_text));

    final TextPaint textPaint = new TextPaint(TextPaint.ANTI_ALIAS_FLAG);
    Layout layout = null;
    try {
      final BoringLayout.Metrics boring = BoringLayout.isBoring(text, textPaint);
      int hintWidth = (int) width;

      if (boring == null) {
        // Not boring, ie. the text is multiline or contains unicode characters.
        final float desiredWidth = Layout.getDesiredWidth(text, textPaint);
        if (desiredWidth <= width) {
          hintWidth = (int) Math.ceil(desiredWidth);
        }
      } else if (boring.width <= width) {
        // Single-line and width unknown or bigger than the width of the text.
        layout = BoringLayout.make(
          text,
          textPaint,
          boring.width,
          Layout.Alignment.ALIGN_NORMAL,
          SPACING_MULTIPLIER,
          SPACING_ADDITION,
          boring,
          includeFontPadding);
      }

      if (layout == null) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
          layout = StaticLayout.Builder.obtain(text, 0, text.length(), textPaint, hintWidth)
            .setAlignment(Layout.Alignment.ALIGN_NORMAL)
            .setBreakStrategy(conf.getTextBreakStrategy())
            //.setHyphenationFrequency(Layout.HYPHENATION_FREQUENCY_NORMAL)
            .setIncludePad(includeFontPadding)
            .setLineSpacing(SPACING_ADDITION, SPACING_MULTIPLIER)
            .build();
        } else {
          layout = new StaticLayout(
            text,
            textPaint,
            hintWidth,
            Layout.Alignment.ALIGN_NORMAL,
            SPACING_MULTIPLIER,
            SPACING_ADDITION,
            includeFontPadding
          );
        }
      }

      final double lineCount = layout.getLineCount();
      double rectWidth;
      double lastLineWidth = 0.0;
      if (conf.getBooleanOrFalse("usePreciseWidth")) {
        float lastWidth = 0f;
        // Layout.getWidth() returns the configured max width, we must
        // go slow to get the used one (and with the text trimmed).
        rectWidth = 0f;
        for (int i = 0; i < lineCount; i++) {
          lastWidth = layout.getLineMax(i);
          if (lastWidth > rectWidth) {
            rectWidth = lastWidth;
          }
        }
        lastLineWidth = lastWidth / density;
      } else {
        rectWidth = layout.getWidth();
      }

      return new double[]{ layout.getHeight() / density, rectWidth / density, lineCount, lastLineWidth};
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }


  // ============================================================================
  //
  //      Non-exposed instance & static methods
  //
  // ============================================================================

  @Nullable
  private static RNTextSizeConf getConf(final ReadableMap specs, boolean forText) {
    if (specs == null) {
      return null;
    }
    return new RNTextSizeConf(specs, forText);
  }

  /**
   * RN consistently sets the height at 14dp divided by the density
   * plus 1 if includeFontPadding when text is empty, so we do the same.
   */
  private static double minimalHeight(final float density, final boolean includeFontPadding) {
    final double height = 14.0 / density;
    return includeFontPadding ? height + 1.0 : height;
  }

  /**
   * Retuns the current density.
   */
  @SuppressWarnings("deprecation")
  private static float getCurrentDensity() {
    return DisplayMetricsHolder.getWindowDisplayMetrics().density;
  }
}
