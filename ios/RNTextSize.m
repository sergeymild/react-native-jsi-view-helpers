//
//  RNTextSize.m
//  JsiViewHelpers
//
//  Created by Sergei Golishnikov on 13/03/2022.
//

#import <Foundation/Foundation.h>

#import <CoreText/CoreText.h>
#import "RNTextSize.h"
#import "React/RCTConvert.h"   // Required when used as a Pod in a Swift project
#import "React/RCTFont.h"
#import "React/RCTUtils.h"

static NSString *const E_MISSING_TEXT = @"E_MISSING_TEXT";
static NSString *const E_INVALID_FONT_SPEC = @"E_INVALID_FONT_SPEC";
static NSString *const E_INVALID_TEXTSTYLE = @"E_INVALID_TEXTSTYLE";
static NSString *const E_INVALID_FONTFAMILY = @"E_INVALID_FONTFAMILY";

static inline BOOL isNull(id str) {
  return !str || str == (id) kCFNull;
}

static inline CGFloat CGFloatValueFrom(NSNumber * _Nullable num) {
#if CGFLOAT_IS_DOUBLE
  return num ? num.doubleValue : NAN;
#else
  return num ? num.floatValue : NAN;
#endif
}

#define A_SIZE(x) (sizeof (x)/sizeof (x)[0])

/*
 * 2018-08-14 by aMarCruz: First working version, tested in RN 0.56
 */
@implementation RNTextSize

/**
 * Gets the width, height, line count and last line width for the provided text
 * font specifications.
 * Based on `RCTTextShadowViewMeasure` of Libraries/Text/Text/RCTTextShadowView.m
 */

-(NSDictionary*) measure:(NSString*)text
                   width:(NSNumber*)width
                fontSize:(NSNumber*)fontSize
         usePreciseWidth:(BOOL)usePreciseWidth
        allowFontScaling:(BOOL)allowFontScaling
              fontFamily:(NSString*)fontFamily
{
    // RCTConvert will return nil if the `options` object was not received.
    if (isNull(text)) {
      return NULL;
    }

    // Allow empty text without generating error
    // ~~TODO~~: Return the same height as RN. @completed(v2.0.1)
    if (!text.length) {
      return @{
          @"width": @0,
          @"height": @14,
          @"lastLineWidth": @0,
          @"lineCount": @0,
      };
    }

    // We cann't use RCTConvert since it does not handle font scaling and RN
    // does not scale the font if a custom delegate has been defined to create.
    UIFont *const _Nullable font = [self scaledUIFontFromUserSpecs:allowFontScaling
                                                          fontSize:fontSize
                                                        fontFamily:fontFamily];
    if (!font) {
        return @{
            @"width": @0,
            @"height": @14,
            @"lastLineWidth": @0,
            @"lineCount": @0,
        };
    }

    // Allow the user to specify the width or height (both optionals).
    const CGFloat optWidth = CGFloatValueFrom(width);
    const CGFloat maxWidth = isnan(optWidth) || isinf(optWidth) ? CGFLOAT_MAX : optWidth;
    const CGSize maxSize = CGSizeMake(maxWidth, CGFLOAT_MAX);

    
    // Create attributes for the font and the optional letter spacing.
    const CGFloat letterSpacing = CGFLOAT_MIN; //CGFloatValueFrom(options[@"letterSpacing"]);
    NSDictionary<NSAttributedStringKey,id> *const attributes = letterSpacing == CGFLOAT_MIN
    ? @{NSFontAttributeName: font}
    : @{NSFontAttributeName: font, NSKernAttributeName: @(letterSpacing)};

    NSTextContainer *textContainer = [[NSTextContainer alloc] initWithSize:maxSize];
    textContainer.lineFragmentPadding = 0.0;
    textContainer.lineBreakMode = NSLineBreakByClipping; // no maxlines support

    NSLayoutManager *layoutManager = [NSLayoutManager new];
    [layoutManager addTextContainer:textContainer];
    layoutManager.allowsNonContiguousLayout = YES;      // 'cause lastLineWidth

    NSTextStorage *textStorage = [[NSTextStorage alloc] initWithString:text attributes:attributes];
    [textStorage addLayoutManager:layoutManager];

    [layoutManager ensureLayoutForTextContainer:textContainer];
    CGSize size = [layoutManager usedRectForTextContainer:textContainer].size;
    if (!isnan(letterSpacing) && letterSpacing < 0) {
      size.width -= letterSpacing;
    }

    const CGFloat epsilon = 0.001;
    const CGFloat height = MIN(RCTCeilPixelValue(size.height + epsilon), maxSize.height);
    const NSInteger lineCount = [self getLineCount:layoutManager];

    NSMutableDictionary *result = [[NSMutableDictionary alloc]
                                   initWithObjectsAndKeys:@(MIN(RCTCeilPixelValue(size.width + epsilon), maxSize.width)), @"width",
                                   @(height), @"height",
                                   @(lineCount), @"lineCount",
                                   nil];

    if (usePreciseWidth) {
      const CGFloat lastIndex = layoutManager.numberOfGlyphs - 1;
      const CGSize lastSize = [layoutManager lineFragmentUsedRectForGlyphAtIndex:lastIndex
                                                                  effectiveRange:nil].size;
      [result setValue:@(lastSize.width) forKey:@"lastLineWidth"];
    }

//    const CGFloat optLine = CGFloatValueFrom(options[@"lineInfoForLine"]);
//    if (!isnan(optLine) && optLine >= 0) {
//      const NSInteger line = MIN((NSInteger) optLine, lineCount);
//      NSDictionary *lineInfo = [self getLineInfo:layoutManager str:text lineNo:line];
//      if (lineInfo) {
//        [result setValue:lineInfo forKey:@"lineInfo"];
//      }
//    }

    return result;
    
}


//
// ============================================================================
//  Non-exposed instance & static methods
// ============================================================================
//

/**
 * Get extended info for a given line number.
 * @since v2.1.0
 */
- (NSInteger)getLineCount:(NSLayoutManager *)layoutManager {
  NSRange lineRange;
  NSUInteger glyphCount = layoutManager.numberOfGlyphs;
  NSInteger lineCount = 0;

  for (NSUInteger index = 0; index < glyphCount; lineCount++) {
    [layoutManager
     lineFragmentUsedRectForGlyphAtIndex:index effectiveRange:&lineRange withoutAdditionalLayout:YES];
    index = NSMaxRange(lineRange);
  }

  return lineCount;
}

/**
 * Get extended info for a given line number.
 * @since v2.1.0
 */
- (NSDictionary *)getLineInfo:(NSLayoutManager *)layoutManager str:(NSString *)str lineNo:(NSInteger)line {
  CGRect lineRect = CGRectZero;
  NSRange lineRange;
  NSUInteger glyphCount = layoutManager.numberOfGlyphs;
  NSInteger lineCount = 0;

  for (NSUInteger index = 0; index < glyphCount; lineCount++) {
    lineRect = [layoutManager
                lineFragmentUsedRectForGlyphAtIndex:index
                effectiveRange:&lineRange
                withoutAdditionalLayout:YES];
    index = NSMaxRange(lineRange);

    if (line == lineCount) {
      NSCharacterSet *ws = NSCharacterSet.whitespaceAndNewlineCharacterSet;
      NSRange charRange = [layoutManager characterRangeForGlyphRange:lineRange actualGlyphRange:nil];
      NSUInteger start = charRange.location;
      index = NSMaxRange(charRange);
      /*
        Get the trimmed range of chars for the glyph range, to be consistent
        w/android, but the width here will include the trailing whitespace.
      */
      while (index > start && [ws characterIsMember:[str characterAtIndex:index - 1]]) {
        index--;
      }
      return @{
               @"line": @(line),
               @"start": @(start),
               @"end": @(index),
               @"bottom": @(lineRect.origin.y + lineRect.size.height),
               @"width": @(lineRect.size.width)
               };
    }
  }

  return nil;
}

/**
 * Create a scaled font based on the given specs.
 *
 * TODO:
 * This method is used instead of [RCTConvert UIFont] to support the omission
 * of scaling when a custom delegate has been defined for font's creation.
 */
- (UIFont * _Nullable)scaledUIFontFromUserSpecs:(BOOL)allowFontScaling
                                       fontSize:(NSNumber*)fontSize
                                     fontFamily:(NSString*)fontFamily
{
    
    RCTBridge* bridge = [RCTBridge currentBridge];
    
    const CGFloat scaleMultiplier =
    allowFontScaling && bridge ? bridge.accessibilityManager.multiplier : 1.0;
    return [self UIFontFromUserSpecs:fontSize
                          fontFamily:fontFamily
                           withScale:scaleMultiplier
    ];
}

/**
 * Create a font based on the given specs.
 */
- (UIFont * _Nullable)UIFontFromUserSpecs:(NSNumber*)fontSize
                               fontFamily:(NSString*)fontFamily
                                withScale:(CGFloat)scaleMultiplier
{
  return [RCTFont updateFont:nil
                  withFamily:fontFamily
                        size:fontSize
                      weight:nil
                       style:nil
                     variant:nil
             scaleMultiplier:scaleMultiplier];
}

@end
