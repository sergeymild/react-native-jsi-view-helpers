package com.jsiviewhelpers;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;


import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = JsiViewHelpersModule.NAME)
public class JsiViewHelpersModule extends NativeJsiViewHelpersSpec {
  public static final String NAME = "JsiViewHelpers";
  private final JsiViewHelpers jsiViewHelpers;

  public JsiViewHelpersModule(ReactApplicationContext reactContext) {
    super(reactContext);
    jsiViewHelpers = new JsiViewHelpers(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @Override
  public WritableMap measureText(ReadableMap params) {
    return jsiViewHelpers.measureText(
      params.getString("text"),
      params.hasKey("fontFamily") ? params.getString("fontFamily") : null,
      params.hasKey("weight") ? params.getString("weight") : null,
      params.getDouble("fontSize"),
      params.getDouble("maxWidth"),
      params.hasKey("usePreciseWidth") && params.getBoolean("usePreciseWidth"),
      params.hasKey("allowFontScaling") && params.getBoolean("allowFontScaling")

    );
  }

  @Override
  public WritableMap measureView(double viewId) {
    return jsiViewHelpers.measureView(viewId);
  }

  @Override
  public WritableMap measureViewByNativeId(String nativeID) {
    return jsiViewHelpers.measureViewByNativeId(nativeID);
  }

  @Override
  public void scrollToChild(ReadableMap params) {
    jsiViewHelpers.scrollToChild(
      params.hasKey("scrollNativeID") ? params.getString("scrollNativeID") : null,
      params.hasKey("scrollViewId") ? params.getDouble("scrollViewId") : -1,
      params.getString("childNativeID"),
      params.getDouble("offset"),
      params.getBoolean("scrollToEnd")
    );
  }
}

