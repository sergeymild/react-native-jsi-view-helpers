#import <React/RCTScrollView.h>
#import <React/RCTUIManager.h>

@interface Scroller : NSObject
+(void) scrollToView: (UIScrollView*)scrollView
                view:(UIView*)view
              offset:(CGFloat)offset
         scrollToEnd:(BOOL)scrollToEnd
            animated:(BOOL)animated;

+(UIView* _Nullable) findInParent:(UIView*)parent
                         nativeID:(NSString*)nativeID;
@end
