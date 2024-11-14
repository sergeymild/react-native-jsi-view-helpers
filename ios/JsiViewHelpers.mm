#import "JsiViewHelpers.h"
#import <React/RCTBlobManager.h>
#import <React/RCTScrollView.h>
#import <React/RCTUIManager.h>
#import <React/RCTBridge+Private.h>
#import <jsi/jsi.h>
#import "RNTextSize.h"
#import "Scroller.h"
#import "Scroller.h"

@implementation JsiViewHelpers
@synthesize bridge = _bridge;
RCT_EXPORT_MODULE()

- (NSDictionary *)measureText:(JS::NativeJsiViewHelpers::SpecMeasureTextParams &)params {
  auto rawText = params.text();
  auto fontSize = params.fontSize();
  auto width = params.maxWidth();
  auto allowFontScaling = true;
  auto usePreciseWidth = false;
  
  if (params.allowFontScaling().has_value()) {
    allowFontScaling = params.allowFontScaling().value();
  }
  
  if (params.usePreciseWidth().has_value()) {
    usePreciseWidth = params.usePreciseWidth().value();
  }
  
  NSString *fontFamily = nil;
  if (params.fontFamily().length != 0) {
    fontFamily = params.fontFamily();
  }
  
  NSString *weight = nil;
  if (params.weight().length != 0) {
    weight = params.weight();
  }
  
  auto result = [[[RNTextSize alloc] init] measure:rawText
                                             width:[[NSNumber alloc] initWithDouble:width]
                                          fontSize:[[NSNumber alloc] initWithDouble:fontSize]
                                   usePreciseWidth:usePreciseWidth
                                  allowFontScaling:allowFontScaling
                                        fontFamily:fontFamily
                                            weight:weight];
  
  return result;
}

- (UIView *) viewForReactTag:(NSNumber *)reactTag {
  return [[self.bridge uiManager] viewForReactTag:reactTag];
}

- (UIView *) viewForNativeId:(NSString *)nativeId {
  return [Scroller findInParent:RCTPresentedViewController().view nativeID:nativeId];
}

- (NSDictionary *)measureView:(double)viewId {
  __block CGRect viewFrame = CGRectZero;
  __block CGRect globalBounds = CGRectZero;
  dispatch_sync(dispatch_get_main_queue(), ^{
    auto idNumber = [[NSNumber alloc] initWithDouble:viewId];
    auto view = [self viewForReactTag:idNumber];
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
  
  
  
  if (CGRectIsEmpty(globalBounds)) return nil;
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:4];
  [dict setValue: [[NSNumber alloc] initWithDouble:globalBounds.size.width] forKey:@"width"];
  [dict setValue: [[NSNumber alloc] initWithDouble:globalBounds.size.height] forKey:@"height"];
  [dict setValue: [[NSNumber alloc] initWithDouble:globalBounds.origin.x] forKey:@"x"];
  [dict setValue: [[NSNumber alloc] initWithDouble:globalBounds.origin.y] forKey:@"y"];
  
  return dict;
}

- (NSDictionary *)measureViewByNativeId:(NSString *)nativeID {
  __block CGRect viewFrame = CGRectZero;
  __block CGRect globalBounds = CGRectZero;
  dispatch_sync(dispatch_get_main_queue(), ^{
    
    auto view = [self viewForNativeId:nativeID];
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
  
  
  
  if (CGRectIsEmpty(globalBounds)) return nil;
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:4];
  [dict setValue: [[NSNumber alloc] initWithDouble:globalBounds.size.width] forKey:@"width"];
  [dict setValue: [[NSNumber alloc] initWithDouble:globalBounds.size.height] forKey:@"height"];
  [dict setValue: [[NSNumber alloc] initWithDouble:globalBounds.origin.x] forKey:@"x"];
  [dict setValue: [[NSNumber alloc] initWithDouble:globalBounds.origin.y] forKey:@"y"];
  
  return dict;
}

- (void)scrollToChild:(JS::NativeJsiViewHelpers::SpecScrollToChildParams &)params {
  auto nativeChildId = params.childNativeID();
  auto offset = params.offset();
  auto scrollToEnd = params.scrollToEnd();

  auto scrollId = params.scrollViewId();
  auto scrollNativeId = params.scrollNativeID();
  NSNumber* refScrollId;
  NSString* nativeScrollId;

  if (scrollId.has_value()) {
    refScrollId = [[NSNumber alloc] initWithDouble:scrollId.value()];
  } else if (scrollNativeId) {
    nativeScrollId = scrollNativeId;
  }

  dispatch_async(dispatch_get_main_queue(), ^{
    RCTScrollView *foundScrollView;
    if (refScrollId != NULL) {
      UIView* view = [self viewForReactTag:refScrollId];
      foundScrollView = (RCTScrollView*)view;
    } else if (nativeScrollId != NULL) {
      UIView* view = [self viewForNativeId:nativeScrollId];
      foundScrollView = (RCTScrollView*)view;
    }
    
    if (foundScrollView == NULL) return;
    UIView* childView = [Scroller findInParent:foundScrollView nativeID:nativeChildId];
    [Scroller scrollToView:foundScrollView.scrollView
                      view:childView
                    offset:CGFloat(offset)
               scrollToEnd:scrollToEnd
                  animated:true];
  });
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeJsiViewHelpersSpecJSI>(params);
}

@end

//using namespace facebook;
//
//@interface JsiViewHelpers()
//
//jsi::String convertNSStringToJSIString(jsi::Runtime &runtime, NSString *value);
//jsi::Value convertNSNumberToJSINumber(jsi::Runtime &runtime, NSNumber *value);
//jsi::Value convertObjCObjectToJSIValue(jsi::Runtime &runtime, id value);
//jsi::Object convertNSDictionaryToJSIObject(jsi::Runtime &runtime, NSDictionary *value);
//
//@end
//
//@implementation JsiViewHelpers
//
//jsi::String convertNSStringToJSIString(jsi::Runtime &runtime, NSString *value) {
//  return jsi::String::createFromUtf8(runtime, [value UTF8String] ?: "");
//}
//
//jsi::Value convertNSNumberToJSINumber(jsi::Runtime &runtime, NSNumber *value) {
//  return jsi::Value([value doubleValue]);
//}
//
//jsi::Value convertObjCObjectToJSIValue(jsi::Runtime &runtime, id value) {
//  if (value == nil) {
//    return jsi::Value::undefined();
//  } else if ([value isKindOfClass:[NSString class]]) {
//    return convertNSStringToJSIString(runtime, (NSString *)value);
//  } else if ([value isKindOfClass:[NSNumber class]]) {
//    return convertNSNumberToJSINumber(runtime, (NSNumber *)value);
//  }
//  return jsi::Value::undefined();
//}
//
//jsi::Object convertNSDictionaryToJSIObject(jsi::Runtime &runtime, NSDictionary *value) {
//  jsi::Object result = jsi::Object(runtime);
//  for (NSString *k in value) {
//    result.setProperty(runtime, [k UTF8String], convertObjCObjectToJSIValue(runtime, value[k]));
//  }
//  return result;
//}
//
//RCT_EXPORT_MODULE()
//
//RCTCxxBridge *_cxxBridge;
//RCTBridge *_bridge;
//jsi::Runtime *_runtime;
//
//RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install) {
//    NSLog(@"Installing JsiViewHelpers polyfill Bindings...");
//
//    _bridge = [RCTBridge currentBridge];
//    _cxxBridge = (RCTCxxBridge*)_bridge;
//    if (_cxxBridge == nil) return @false;
//    _runtime = (jsi::Runtime*) _cxxBridge.runtime;
//    if (_runtime == nil) return @false;
//    auto& runtime = *_runtime;
//
//
//    auto measureText = jsi::Function::createFromHostFunction(runtime,
//                                                                     jsi::PropNameID::forUtf8(runtime, "measureText"),
//                                                                     1,
//                                                                     [](jsi::Runtime& runtime,
//                                                                        const jsi::Value& thisArg,
//                                                                        const jsi::Value* args,
//                                                                        size_t count) -> jsi::Value {
//            auto params = args[0].asObject(runtime);
//            auto rawText = params.getProperty(runtime, "text").asString(runtime).utf8(runtime);
//            auto fontSize = params.getProperty(runtime, "fontSize").asNumber();
//            auto width = params.getProperty(runtime, "maxWidth").asNumber();
//            auto allowFontScaling = true;
//            auto usePreciseWidth = false;
//
//            if (params.hasProperty(runtime, "allowFontScaling")) {
//                allowFontScaling = params.getProperty(runtime, "allowFontScaling").getBool();
//            }
//
//            if (params.hasProperty(runtime, "usePreciseWidth")) {
//                usePreciseWidth = params.getProperty(runtime, "usePreciseWidth").getBool();
//            }
//
//            NSString *fontFamily = nil;
//            if (params.hasProperty(runtime, "fontFamily")) {
//                auto rawFontFamily = params.getProperty(runtime, "fontFamily").asString(runtime).utf8(runtime);
//                fontFamily = [NSString stringWithUTF8String:rawFontFamily.c_str()];
//            }
//
//            NSString *weight = nil;
//            if (params.hasProperty(runtime, "weight")) {
//                auto rawWeight = params.getProperty(runtime, "weight").asString(runtime).utf8(runtime);
//                weight = [NSString stringWithUTF8String:rawWeight.c_str()];
//            }
//
//            auto text = [NSString stringWithUTF8String:rawText.c_str()];
//
//            auto result = [[[RNTextSize alloc] init] measure:text
//                                         width:[[NSNumber alloc] initWithDouble:width]
//                                      fontSize:[[NSNumber alloc] initWithDouble:fontSize]
//                               usePreciseWidth:usePreciseWidth
//                              allowFontScaling:allowFontScaling
//                                    fontFamily:fontFamily
//                                        weight:weight];
//
//            return convertNSDictionaryToJSIObject(runtime, result);
//        });
//
//        auto measureView = jsi::Function::createFromHostFunction(runtime,
//                                                                     jsi::PropNameID::forUtf8(runtime, "measureView"),
//                                                                     1,
//                                                                     [self](jsi::Runtime& runtime,
//                                                                        const jsi::Value& thisArg,
//                                                                        const jsi::Value* args,
//                                                                        size_t count) -> jsi::Value {
//
//            auto viewId = args[0].asNumber();
//            __block CGRect viewFrame = CGRectZero;
//            __block CGRect globalBounds = CGRectZero;
//            dispatch_sync(dispatch_get_main_queue(), ^{
//                auto idNumber = [[NSNumber alloc] initWithDouble:viewId];
//                auto view = [_bridge.uiManager viewForReactTag: idNumber];
//                UIView *rootView = view;
//                if (view != nil) {
//                    viewFrame = view.frame;
//                    while (rootView.superview && ![rootView isReactRootView]) {
//                        rootView = rootView.superview;
//                    }
//                    if (rootView) {
//                        globalBounds = [view convertRect:view.bounds toView:rootView];
//                    }
//                }
//            });
//
//
//
//            if (CGRectIsEmpty(globalBounds)) return jsi::Value::undefined();
//
//            jsi::Object result = jsi::Object(runtime);
//            result.setProperty(runtime, "width", jsi::Value(globalBounds.size.width));
//            result.setProperty(runtime, "height", jsi::Value(globalBounds.size.height));
//            result.setProperty(runtime, "x", jsi::Value(globalBounds.origin.x));
//            result.setProperty(runtime, "y", jsi::Value(globalBounds.origin.y));
//
//            return result;
//        });
//
//    auto scrollToChild = jsi::Function::createFromHostFunction(runtime,
//                                                               jsi::PropNameID::forUtf8(runtime, "scrollToChild"),
//                                                               1,
//                                                               [](jsi::Runtime& runtime,
//                                                                  const jsi::Value& thisArg,
//                                                                  const jsi::Value* args,
//                                                                  size_t count) -> jsi::Value {
//
//
//        auto params = args[0].asObject(runtime);
//        auto childId = params.getProperty(runtime, "childNativeID").asString(runtime).utf8(runtime);
//        auto offset = params.getProperty(runtime, "offset").asNumber();
//        auto scrollToEnd = params.getProperty(runtime, "scrollToEnd").getBool();
//
//        auto scrollId = params.getProperty(runtime, "scrollViewId");
//        auto scrollNativeId = params.getProperty(runtime, "scrollNativeID");
//        NSNumber* refScrollId;
//        NSString* nativeScrollId;
//        NSString* nativeChildId = [[NSString alloc] initWithCString:childId.c_str() encoding:NSUTF8StringEncoding];
//
//        if (!scrollId.isNull() && !scrollId.isUndefined()) {
//            refScrollId = [[NSNumber alloc] initWithDouble:scrollId.asNumber()];
//        } else if (!scrollNativeId.isNull() && !scrollNativeId.isUndefined()) {
//            nativeScrollId = [[NSString alloc] initWithCString:scrollNativeId.asString(runtime).utf8(runtime).c_str() encoding:NSUTF8StringEncoding];
//        }
//
//        dispatch_async(dispatch_get_main_queue(), ^{
//            RCTScrollView *foundScrollView;
//            if (refScrollId != NULL) {
//                UIView* view = [_bridge.uiManager viewForReactTag:refScrollId];
//                foundScrollView = (RCTScrollView*)view;
//            } else if (nativeScrollId != NULL) {
//                UIView* parent = UIApplication.sharedApplication.keyWindow.rootViewController.view;
//                UIView* view = [Scroller findInParent:parent nativeID:nativeScrollId];
//                foundScrollView = (RCTScrollView*)view;
//            }
//
//            if (foundScrollView == NULL) return;
//            UIView* childView = [Scroller findInParent:foundScrollView nativeID:nativeChildId];
//            [Scroller scrollToView:foundScrollView.scrollView
//                              view:childView
//                            offset:CGFloat(offset)
//                       scrollToEnd:scrollToEnd
//                          animated:true];
//        });
//
//        return jsi::Value::undefined();
//    });
//
//    jsi::Object viewHelpers = jsi::Object(runtime);
//    viewHelpers.setProperty(runtime, "measureView", std::move(measureView));
//    viewHelpers.setProperty(runtime, "measureText", std::move(measureText));
//    viewHelpers.setProperty(runtime, "scrollToChild", std::move(scrollToChild));
//    runtime.global().setProperty(runtime, "__viewHelpers", std::move(viewHelpers));
//
//    return @true;
//}
//
//@end
