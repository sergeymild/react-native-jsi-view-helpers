#import "JsiViewHelpers.h"
#import <React/RCTBlobManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTBridge+Private.h>
#import <jsi/jsi.h>
#import "RNTextSize.h"

using namespace facebook;

@implementation JsiViewHelpers

jsi::String convertNSStringToJSIString(jsi::Runtime &runtime, NSString *value) {
  return jsi::String::createFromUtf8(runtime, [value UTF8String] ?: "");
}

jsi::Value convertNSNumberToJSINumber(jsi::Runtime &runtime, NSNumber *value) {
  return jsi::Value([value doubleValue]);
}

jsi::Value convertObjCObjectToJSIValue(jsi::Runtime &runtime, id value) {
  if (value == nil) {
    return jsi::Value::undefined();
  } else if ([value isKindOfClass:[NSString class]]) {
    return convertNSStringToJSIString(runtime, (NSString *)value);
  } else if ([value isKindOfClass:[NSNumber class]]) {
    return convertNSNumberToJSINumber(runtime, (NSNumber *)value);
  }
  return jsi::Value::undefined();
}

jsi::Object convertNSDictionaryToJSIObject(jsi::Runtime &runtime, NSDictionary *value) {
  jsi::Object result = jsi::Object(runtime);
  for (NSString *k in value) {
    result.setProperty(runtime, [k UTF8String], convertObjCObjectToJSIValue(runtime, value[k]));
  }
  return result;
}

RCT_EXPORT_MODULE()

RCTCxxBridge *_cxxBridge;
RCTBridge *_bridge;
jsi::Runtime *_runtime;

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install) {
    NSLog(@"Installing JsiViewHelpers polyfill Bindings...");
    
    _bridge = [RCTBridge currentBridge];
    _cxxBridge = (RCTCxxBridge*)_bridge;
    if (_cxxBridge == nil) return @false;
    _runtime = (jsi::Runtime*) _cxxBridge.runtime;
    if (_runtime == nil) return @false;
    auto& runtime = *_runtime;
    
    
    auto measureText = jsi::Function::createFromHostFunction(runtime,
                                                                     jsi::PropNameID::forUtf8(runtime, "measureText"),
                                                                     1,
                                                                     [](jsi::Runtime& runtime,
                                                                        const jsi::Value& thisArg,
                                                                        const jsi::Value* args,
                                                                        size_t count) -> jsi::Value {
            auto params = args[0].asObject(runtime);
            auto rawText = params.getProperty(runtime, "text").asString(runtime).utf8(runtime);
            auto fontSize = params.getProperty(runtime, "fontSize").asNumber();
            auto width = params.getProperty(runtime, "maxWidth").asNumber();
            auto allowFontScaling = true;
            auto usePreciseWidth = false;
            
            if (params.hasProperty(runtime, "allowFontScaling")) {
                allowFontScaling = params.getProperty(runtime, "allowFontScaling").getBool();
            }
            
            if (params.hasProperty(runtime, "usePreciseWidth")) {
                usePreciseWidth = params.getProperty(runtime, "usePreciseWidth").getBool();
            }
            
            NSString *fontFamily = nil;
            if (params.hasProperty(runtime, "fontFamily")) {
                auto rawFontFamily = params.getProperty(runtime, "fontFamily").asString(runtime).utf8(runtime);
                fontFamily = [NSString stringWithUTF8String:rawFontFamily.c_str()];
            }
            
            auto text = [NSString stringWithUTF8String:rawText.c_str()];

            auto result = [[[RNTextSize alloc] init] measure:text
                                         width:[[NSNumber alloc] initWithDouble:width]
                                      fontSize:[[NSNumber alloc] initWithDouble:fontSize]
                               usePreciseWidth:usePreciseWidth
                              allowFontScaling:allowFontScaling
                                    fontFamily:fontFamily];
            
            return convertNSDictionaryToJSIObject(runtime, result);
        });
        
        auto measureView = jsi::Function::createFromHostFunction(runtime,
                                                                     jsi::PropNameID::forUtf8(runtime, "measureView"),
                                                                     1,
                                                                     [self](jsi::Runtime& runtime,
                                                                        const jsi::Value& thisArg,
                                                                        const jsi::Value* args,
                                                                        size_t count) -> jsi::Value {
            
            auto viewId = args[0].asNumber();
            __block CGRect viewFrame = CGRectZero;
            __block CGRect globalBounds = CGRectZero;
            dispatch_sync(dispatch_get_main_queue(), ^{
                auto idNumber = [[NSNumber alloc] initWithDouble:viewId];
                auto view = [_bridge.uiManager viewForReactTag: idNumber];
                UIView *rootView = view;
                if (view != nil) {
                    viewFrame = view.frame;
                    while (rootView.superview && ![rootView isReactRootView]) {
                        rootView = rootView.superview;
                    }
                    if (rootView) {
                        globalBounds = [view convertRect:view.bounds toView:rootView];
                    }
                }
            });
            
            
            
            if (CGRectIsEmpty(globalBounds)) return jsi::Value::undefined();
            
            jsi::Object result = jsi::Object(runtime);
            result.setProperty(runtime, "width", jsi::Value(globalBounds.size.width));
            result.setProperty(runtime, "height", jsi::Value(globalBounds.size.height));
            result.setProperty(runtime, "x", jsi::Value(globalBounds.origin.x));
            result.setProperty(runtime, "y", jsi::Value(globalBounds.origin.y));
            
            return result;
        });
    
    jsi::Object viewHelpers = jsi::Object(runtime);
    viewHelpers.setProperty(runtime, "measureView", std::move(measureView));
    viewHelpers.setProperty(runtime, "measureText", std::move(measureText));
    runtime.global().setProperty(runtime, "__viewHelpers", std::move(viewHelpers));
    
    return @true;
}

@end
