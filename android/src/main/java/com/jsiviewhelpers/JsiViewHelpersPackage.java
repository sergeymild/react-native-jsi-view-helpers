package com.jsiviewhelpers;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.HashMap;
import java.util.Map;

public class JsiViewHelpersPackage extends TurboReactPackage {

  @Nullable
  @Override
  public NativeModule getModule(@NonNull String name, @NonNull ReactApplicationContext context) {
    if (JsiViewHelpersModule.NAME.equals(name)) {
      return new JsiViewHelpersModule(context);
    }
    return null;
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return () -> {
      Map<String, ReactModuleInfo> moduleInfoMap = new HashMap<>();
      moduleInfoMap.put(
        JsiViewHelpersModule.NAME,
        new ReactModuleInfo(
          JsiViewHelpersModule.NAME,
          JsiViewHelpersModule.NAME,
          false, // canOverrideExistingModule
          false, // needsEagerInit
          false, // isCxxModule
          true   // isTurboModule
        )
      );
      return moduleInfoMap;
    };
  }
}
