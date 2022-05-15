//
//  RNTextSize.h
//  JsiViewHelpers
//
//  Created by Sergei Golishnikov on 13/03/2022.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTBridge+Private.h>
#import <React/RCTBridge.h>
#import <React/RCTAccessibilityManager.h>

@interface RNTextSize : NSObject
-(NSDictionary*) measure:(NSString*)text
                   width:(NSNumber*)width
                fontSize:(NSNumber*)fontSize
         usePreciseWidth:(BOOL)usePreciseWidth
        allowFontScaling:(BOOL)allowFontScaling
              fontFamily:(NSString*)fontFamily
                  weight:(NSString*)weight;
@end
