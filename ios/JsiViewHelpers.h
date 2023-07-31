
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNJsiViewHelpersSpec.h"

@interface JsiViewHelpers : NSObject <NativeJsiViewHelpersSpec>
#else
#import <React/RCTBridgeModule.h>

@interface JsiViewHelpers : NSObject <RCTBridgeModule>
#endif

@end
