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
