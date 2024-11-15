package com.jsiviewhelpers;

import android.app.Activity;
import android.graphics.Matrix;
import android.graphics.RectF;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.text.BoringLayout;
import android.text.Layout;
import android.text.SpannableString;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.view.View;
import android.view.ViewParent;

import androidx.annotation.Nullable;

import com.facebook.jni.annotations.DoNotStrip;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UIManager;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.DisplayMetricsHolder;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.RootViewUtil;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.util.ReactFindViewUtil;
import com.jsiviewhelpers.textSize.RNTextSizeConf;
import com.jsiviewhelpers.textSize.RNTextSizeSpannedText;

import java.util.Arrays;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
public class JsiViewHelpers {
  private static final float SPACING_ADDITION = 0f;
  private static final float SPACING_MULTIPLIER = 1f;
  private final ReactApplicationContext context;

  private Handler handler = new Handler(Looper.getMainLooper());
  public JsiViewHelpers(ReactApplicationContext reactContext) {
    context = reactContext;
  }
  @DoNotStrip
  public void scrollToChild(
    @Nullable String scrollNativeID,
    double scrollViewId,
    String childNativeID,
    double offset,
    boolean scrollToEnd
  ) {
    System.out.println("--- " + scrollNativeID + " " + scrollViewId + " " + scrollNativeID + " " + offset + " " + scrollToEnd);
    Activity currentActivity = context.getCurrentActivity();
    if (currentActivity == null) return;
    Scroller.scrollToChild(context, currentActivity, scrollNativeID, scrollViewId, childNativeID, offset, scrollToEnd);
  }
  @DoNotStrip
  public WritableMap measure(View view) {
    View rootView = (View) RootViewUtil.getRootView(view);
    if (rootView == null) {
      return emptyMeasure();
    }

    int[] buffer = new int[4];
    computeBoundingBox(rootView, buffer);
    int rootX = buffer[0];
    int rootY = buffer[1];
    computeBoundingBox(view, buffer);
    buffer[0] -= rootX;
    buffer[1] -= rootY;

    WritableMap result = Arguments.createMap();
    result.putDouble("x", PixelUtil.toDIPFromPixel(buffer[0]));
    result.putDouble("y", PixelUtil.toDIPFromPixel(buffer[1]));
    result.putDouble("width", PixelUtil.toDIPFromPixel(buffer[2]));
    result.putDouble("height", PixelUtil.toDIPFromPixel(buffer[3]));
    return result;
  }

  @DoNotStrip
  WritableMap measureView(double rawViewId) {
    int viewId = (int) rawViewId;

    WritableMap result = Arguments.createMap();

    try {
      CountDownLatch latch = new CountDownLatch(1);
      //ReactFindViewUtil.findView(context.getCurrentActivity().getWindow().getDecorView(), "")
      UIManager uiManager = UIManagerHelper.getUIManager(context, viewId);
      final View[] view = new View[1];
      handler.post(() -> {
        view[0] = uiManager.resolveView(viewId);
        latch.countDown();
      });
      latch.await(1, TimeUnit.SECONDS);
      if (view[0] != null) {
        return measure(view[0]);
      }
    } catch (IllegalViewOperationException | InterruptedException e) {
      e.printStackTrace();
    }

    return result;
  }

  @DoNotStrip
  WritableMap measureViewByNativeId(String nativeID) {
    try {
      View view = ReactFindViewUtil.findView(context.getCurrentActivity().getWindow().getDecorView(), nativeID);
      return measure(view);
    } catch (IllegalViewOperationException e) {
      e.printStackTrace();
    }
    return emptyMeasure();
  }

  @DoNotStrip
  WritableMap measureText(
    String t,
    @Nullable String fontFamily,
    @Nullable String weight,
    double fontSize,
    double maxWidth,
    boolean usePreciseWidth,
    boolean allowFontScaling
  ) {
    System.out.println("😇 " + t + " f: " + fontFamily);
    WritableMap specs = Arguments.createMap();
    specs.putString("text", t);
    specs.putString("fontFamily", fontFamily);
    specs.putString("fontWeight", weight);
    specs.putDouble("fontSize", fontSize);
    specs.putDouble("width", maxWidth);
    specs.putBoolean("usePreciseWidth", usePreciseWidth);
    specs.putBoolean("allowFontScaling", allowFontScaling);
    final RNTextSizeConf conf = getConf(specs, true);

    final String _text = conf.getString("text");
    if (_text == null) {
      WritableMap result = Arguments.createMap();
      result.putDouble("width", 0);
      result.putDouble("height", 0);
      result.putDouble("lineCount", 0);
      result.putDouble("lastLineWidth", 0);
      return result;
    }

    final float density = getCurrentDensity();
    final float width = conf.getWidth(density);
    final boolean includeFontPadding = conf.includeFontPadding;

    if (_text.isEmpty()) {
      WritableMap result = Arguments.createMap();
      result.putDouble("width", 0);
      result.putDouble("height", minimalHeight(density, includeFontPadding));
      result.putDouble("lineCount", 0);
      result.putDouble("lastLineWidth", 0);
      return result;
    }

    final SpannableString text = (SpannableString) RNTextSizeSpannedText
      .spannedFromSpecsAndText(context, conf, new SpannableString(_text));

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
            .setHyphenationFrequency(Layout.HYPHENATION_FREQUENCY_NORMAL)
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

      WritableMap result = Arguments.createMap();
      result.putDouble("width", rectWidth / density);
      result.putDouble("height", layout.getHeight() / density);
      result.putDouble("lineCount", lineCount);
      result.putDouble("lastLineWidth", lastLineWidth);

      return result;
    } catch (Exception e) {
      e.printStackTrace();
      WritableMap result = Arguments.createMap();
      result.putDouble("width", 0);
      result.putDouble("height", 0);
      result.putDouble("lineCount", 0);
      result.putDouble("lastLineWidth", 0);
      return result;
    }
  }

  // ============================================================================
  //
  //      Non-exposed instance & static methods
  //
  // ============================================================================

  @Nullable
  private RNTextSizeConf getConf(final ReadableMap specs, boolean forText) {
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
   * Returns the current density.
   */
  @SuppressWarnings("deprecation")
  private float getCurrentDensity() {
    return DisplayMetricsHolder.getWindowDisplayMetrics().density;
  }

  private static void computeBoundingBox(View view, int[] outputBuffer) {
    RectF boundingBox = new RectF();
    boundingBox.set(0, 0, view.getWidth(), view.getHeight());
    mapRectFromViewToWindowCoords(view, boundingBox);

    outputBuffer[0] = Math.round(boundingBox.left);
    outputBuffer[1] = Math.round(boundingBox.top);
    outputBuffer[2] = Math.round(boundingBox.right - boundingBox.left);
    outputBuffer[3] = Math.round(boundingBox.bottom - boundingBox.top);
  }

  private static void mapRectFromViewToWindowCoords(View view, RectF rect) {
    Matrix matrix = view.getMatrix();
    if (!matrix.isIdentity()) {
      matrix.mapRect(rect);
    }

    rect.offset(view.getLeft(), view.getTop());

    ViewParent parent = view.getParent();
    while (parent instanceof View) {
      View parentView = (View) parent;

      rect.offset(-parentView.getScrollX(), -parentView.getScrollY());

      matrix = parentView.getMatrix();
      if (!matrix.isIdentity()) {
        matrix.mapRect(rect);
      }

      rect.offset(parentView.getLeft(), parentView.getTop());

      parent = parentView.getParent();
    }
  }

  private WritableMap emptyMeasure() {
    WritableMap result = Arguments.createMap();
    result.putDouble("width", 0);
    result.putDouble("height", 0);
    result.putDouble("x", 0);
    result.putDouble("y", 0);
    return result;
  }
}
