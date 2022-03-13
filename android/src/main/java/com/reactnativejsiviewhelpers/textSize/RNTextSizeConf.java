package com.reactnativejsiviewhelpers.textSize;

import android.content.Context;
import android.graphics.Typeface;
import android.os.Build;
import android.text.Layout;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.views.text.ReactFontManager;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

@SuppressWarnings("SameParameterValue")
public final class RNTextSizeConf {

  private static final float DEF_FONTSIZE = 14.0f;

  /**
   * Make a Typeface from the supplied font family and style.
   */
  @Nonnull
  static Typeface getFont(
    @Nonnull final Context context,
    @Nullable String family,
    final int style
  ) {
    final Typeface typeface = family != null
      ? ReactFontManager.getInstance().getTypeface(family, style, context.getAssets())
      : null;

    return typeface != null ? typeface : Typeface.defaultFromStyle(style);
  }

  private final ReadableMap mOpts;
  private final boolean allowFontScaling;

  final String fontFamily;
  final float fontSize;
  final int fontStyle;
  public final boolean includeFontPadding;
  final float letterSpacing;

  /**
   * Proccess the user specs. Set both `allowFontScaling` & `includeFontPadding` to the user
   * value or the default `true` only if we have the `forText` flag.
   *
   * @param options User options
   * @param forText This will be used for measure text?
   */
  public RNTextSizeConf(@Nonnull final ReadableMap options, final boolean forText) {
    mOpts = options;

    allowFontScaling = forText && getBooleanOrTrue("allowFontScaling");
    fontFamily = getString("fontFamily");
    fontSize = getFontSizeOrDefault();
    fontStyle = getFontStyle();
    includeFontPadding = forText && getBooleanOrTrue("includeFontPadding");

    // letterSpacing is supported in RN 0.55+
    letterSpacing = getFloatOrNaN("letterSpacing");
  }

  public boolean has(@Nonnull final String name) {
    return mOpts.hasKey(name);
  }

  public boolean getBooleanOrTrue(@Nonnull final String name) {
    return !mOpts.hasKey(name) || mOpts.getBoolean(name);
  }

  public boolean getBooleanOrFalse(@Nonnull final String name) {
    if (mOpts.hasKey(name)) return false;
    return mOpts.getBoolean(name);
  }

  public Integer getIntOrNull(@Nonnull final String name) {
    return mOpts.hasKey(name)
      ? mOpts.getInt(name) : null;
  }

  @Nullable
  public String getString(@Nonnull final String name) {
    return mOpts.hasKey(name)
      ? mOpts.getString(name) : null;
  }

  public float scale(final float measure) {
    return allowFontScaling
      ? PixelUtil.toPixelFromSP(measure)
      : PixelUtil.toPixelFromDIP(measure);
  }

  public float getWidth(final float density) {
    float width = getFloatOrNaN("width");
    if (!Float.isNaN(width) && width > 0) {
      return width * density;                // always DIP
    } else {
      return Float.MAX_VALUE;
    }
  }

  public int getTextBreakStrategy() {
    if (Build.VERSION.SDK_INT < 23) {
      return 0;
    }

    final String textBreakStrategy = getString("textBreakStrategy");

    if (textBreakStrategy != null) {
      switch (textBreakStrategy) {
        case "balanced":
          return Layout.BREAK_STRATEGY_BALANCED;
        case "highQuality":
          return Layout.BREAK_STRATEGY_HIGH_QUALITY;
        case "simple":
          return Layout.BREAK_STRATEGY_SIMPLE;
        default:
          throw new JSApplicationIllegalArgumentException(
            "Invalid textBreakStrategy: " + textBreakStrategy);
      }
    }
    return Layout.BREAK_STRATEGY_HIGH_QUALITY;
  }

  private float getFloatOrNaN(@Nonnull final String name) {
    return mOpts.hasKey(name) ? (float) mOpts.getDouble(name) : Float.NaN;
  }

  private float getFontSizeOrDefault() {
    if (mOpts.hasKey("fontSize")) {
      final float num = (float) mOpts.getDouble("fontSize");

      if (num > 0f) {
        return num;
      }
    }
    return DEF_FONTSIZE;
  }

  private int getFontStyle() {
    int style = "italic".equals(getString("fontStyle")) ? Typeface.ITALIC : Typeface.NORMAL;

    final String weight = getString("fontWeight");
    if (weight != null) {
      switch (weight) {
        case "bold":
        case "900":
        case "800":
        case "700":
        case "600":
        case "500":
          style |= Typeface.BOLD;
          break;
      }
    }
    return style;
  }
}
