package com.reactnativejsiviewhelpers;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = JsiViewHelpersModule.NAME)
public class JsiViewHelpersModule extends ReactContextBaseJavaModule {
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

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void install() {
    jsiViewHelpers.install();
  }
}
