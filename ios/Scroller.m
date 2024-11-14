
#include "Scroller.h"

@interface UIView (FindParent)
-(UIView* _Nullable) findBy:(NSString*)nativeID;
@end

@implementation UIView (FindParent)

- (UIView *)findBy:(NSString *)nativeID {
  NSString *nId;
  
  @try {
    nId = (NSString*) [self valueForKey:@"nativeId"];
  } @catch (NSException *exception) {
    
  }
  
  if ((nId != nil && [nativeID isEqualToString:nId]) || [self.accessibilityLabel isEqualToString:nativeID]) {
    return self;
  }
  
  for (UIView* subview in self.subviews) {
    UIView *v = [subview findBy:nativeID];
    if (v) {
      return v;
    }
  }
  return nil;
}

@end

@implementation Scroller

+(void)scrollToView:(UIScrollView *)scrollView
               view:(UIView *)view
             offset:(CGFloat)offset
        scrollToEnd:(BOOL)scrollToEnd
           animated:(BOOL)animated {
  
  UIView* origin = view.superview;
  if (origin) {
    CGPoint childStartPoint = [origin convertPoint:view.frame.origin toCoordinateSpace:scrollView];
    BOOL isHorizontal = scrollView.contentSize.width > scrollView.frame.size.width;
    CGFloat x = childStartPoint.x - offset;
    CGFloat y = childStartPoint.y - offset;
    if (scrollToEnd) y += view.frame.size.height;
    if (scrollToEnd) x += view.frame.size.width;
    [scrollView scrollRectToVisible:CGRectMake(
                                               isHorizontal ? x : 0,
                                               !isHorizontal ? y : 0,
                                               isHorizontal ? scrollView.frame.size.width : 1,
                                               !isHorizontal ? scrollView.frame.size.height : 1)
                           animated:animated];
  }
  
  
}

+ (UIView *)findInParent:(UIView *)parent nativeID:(NSString *)nativeID {
  return [parent findBy:nativeID];
}

@end
