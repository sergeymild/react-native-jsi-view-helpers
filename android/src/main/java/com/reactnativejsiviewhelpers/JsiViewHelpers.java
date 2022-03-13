package com.reactnativejsiviewhelpers;

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

import androidx.annotation.Nullable;

import com.facebook.jni.HybridData;
import com.facebook.jni.annotations.DoNotStrip;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl;
import com.facebook.react.turbomodule.core.interfaces.CallInvokerHolder;
import com.facebook.react.uimanager.DisplayMetricsHolder;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.RootViewUtil;
import com.facebook.react.uimanager.UIImplementation;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.UIViewOperationQueue;
import com.reactnativejsiviewhelpers.textSize.RNTextSizeConf;
import com.reactnativejsiviewhelpers.textSize.RNTextSizeSpannedText;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

@SuppressWarnings("JavaJniMissingFunction")
public class JsiViewHelpers {
  private static final float SPACING_ADDITION = 0f;
  private static final float SPACING_MULTIPLIER = 1f;
  private final ReactApplicationContext context;

  @Nullable
  private NativeViewHierarchyManager nativeViewHierarchyManager;

  @DoNotStrip
  @SuppressWarnings("unused")
  HybridData mHybridData;

  public native HybridData initHybrid(long jsContext, CallInvokerHolderImpl jsCallInvokerHolder);
  public native void installJSIBindings();

  public JsiViewHelpers(ReactApplicationContext reactContext) {
    context = reactContext;

  }

  public boolean install() {
    try {
      System.loadLibrary("react-native-jsi-view-helpers");
      JavaScriptContextHolder jsContext = context.getJavaScriptContextHolder();
      CallInvokerHolder jsCallInvokerHolder = context.getCatalystInstance().getJSCallInvokerHolder();
      mHybridData = initHybrid(jsContext.get(), (CallInvokerHolderImpl) jsCallInvokerHolder);
      installJSIBindings();
      return true;
    } catch (Exception exception) {
      return false;
    }
  }

  public double[] measure(View view) {
    View rootView = (View) RootViewUtil.getRootView(view);
    if (rootView == null) {
      double[] result = new double[6];
      result[0] = -1234567;
      return result;
    }

    int[] buffer = new int[4];
    computeBoundingBox(rootView, buffer);
    int rootX = buffer[0];
    int rootY = buffer[1];
    computeBoundingBox(view, buffer);
    buffer[0] -= rootX;
    buffer[1] -= rootY;

    double[] result = new double[6];
    result[0] = result[1] = 0;
    for (int i = 2; i < 6; ++i) result[i] = PixelUtil.toDIPFromPixel(buffer[i - 2]);

    return result;
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

  private double[] measureView(double rawViewId) {
    int viewId = (int) rawViewId;

    final double[][] measure = new double[1][1];

    try {
      if (nativeViewHierarchyManager == null) {
        UIManagerModule uiManager = context.getNativeModule(UIManagerModule.class);
        Class<? extends UIImplementation> aClass = uiManager.getUIImplementation().getClass();
        Method getUIViewOperationQueue = aClass.getDeclaredMethod("getUIViewOperationQueue");
        getUIViewOperationQueue.setAccessible(true);
        UIViewOperationQueue queue = (UIViewOperationQueue) getUIViewOperationQueue.invoke(uiManager.getUIImplementation());

        Method nativeViewHierarchyManagerMethod = queue.getClass().getDeclaredMethod("getNativeViewHierarchyManager");
        nativeViewHierarchyManagerMethod.setAccessible(true);
        nativeViewHierarchyManager = (NativeViewHierarchyManager) nativeViewHierarchyManagerMethod.invoke(queue);
      }

      View view = nativeViewHierarchyManager.resolveView(viewId);;
      if (view != null) {
        measure[0] = measure(view);
      }
    } catch (IllegalViewOperationException | NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
      e.printStackTrace();
    }

    return measure[0];
  }

  @DoNotStrip
  private double[] measureText(
    String t,
    @Nullable String fontFamily,
    double fontSize,
    double maxWidth,
    boolean usePreciseWidth,
    boolean allowFontScaling
  ) {
    System.out.println("😇 " + t + " f: " + fontFamily);
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
}
