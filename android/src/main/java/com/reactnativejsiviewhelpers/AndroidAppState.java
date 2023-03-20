package com.reactnativejsiviewhelpers;

import android.os.Handler;
import android.os.Looper;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.lifecycle.DefaultLifecycleObserver;
import androidx.lifecycle.LifecycleOwner;
import androidx.lifecycle.ProcessLifecycleOwner;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class AndroidAppState extends ReactContextBaseJavaModule implements DefaultLifecycleObserver {
  @NonNull
  @Override
  public String getName() {
    return "AndroidAppState";
  }

  private static ReactApplicationContext reactContext;

  public AndroidAppState(@Nullable ReactApplicationContext reactContext) {
    super(reactContext);
    AndroidAppState.reactContext = reactContext;
  }

  @Override
  public void initialize() {
    super.initialize();
    new Handler(Looper.getMainLooper()).post(() -> ProcessLifecycleOwner.get().getLifecycle().addObserver(AndroidAppState.this));
  }

  @Override
  public void onCatalystInstanceDestroy() {
    super.onCatalystInstanceDestroy();
    new Handler(Looper.getMainLooper()).post(() -> ProcessLifecycleOwner.get().getLifecycle().removeObserver(AndroidAppState.this));
  }

  @Override
  public void onStart(@NonNull LifecycleOwner owner) {
    sendEvent("change", "active");
  }

  @Override
  public void onPause(@NonNull LifecycleOwner owner) {
    sendEvent("change", "inactive");
  }

  @Override
  public void onStop(@NonNull LifecycleOwner owner) {
    sendEvent("change", "background");
  }

  public void sendEvent(String eventName, String type) {
    if (reactContext == null) return;
    WritableArray array = Arguments.createArray();
    array.pushString(type);
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, array);
  }
}
