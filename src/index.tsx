import type React from 'react';
import { findNodeHandle, ScrollView } from 'react-native';

import JsiViewHelpers from './NativeJsiViewHelpers';

type FontWeight =
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export interface MeasureParams {
  text: string;
  fontSize: number;
  maxWidth: number;
  allowFontScaling?: boolean;
  usePreciseWidth?: boolean;
  fontFamily?: string;
  weight?: FontWeight;
}

export interface MeasureTextResult {
  height: number;
  width: number;
  lineCount: number;
  lastLineWidth: number;
}

export interface MeasureViewResult {
  height: number;
  width: number;
  x: number;
  y: number;
}

export class viewHelpers {
  static measureText(params: MeasureParams): MeasureTextResult {
    return JsiViewHelpers.measureText(params);
  }

  static measureView(ref: React.RefObject<any>): MeasureViewResult {
    const viewId = findNodeHandle(ref.current);
    if (!viewId) return { width: 0, height: 0, x: 0, y: 0 };
    return JsiViewHelpers.measureView(viewId);
  }

  static measureViewByNativeId(nativeID: string): MeasureViewResult {
    return JsiViewHelpers.measureViewByNativeId(nativeID);
  }

  static scrollToChild(
    params:
      | {
          scrollNativeID: string;
          childNativeID: string;
          offset?: number;
          scrollToEnd?: boolean;
        }
      | {
          scrollViewRef: React.RefObject<ScrollView | null>;
          childNativeID: string;
          offset?: number;
          scrollToEnd?: boolean;
        }
  ) {
    return JsiViewHelpers.scrollToChild({
      scrollNativeID:
        'scrollNativeID' in params ? params.scrollNativeID : undefined,
      scrollViewId:
        'scrollViewRef' in params
          ? (findNodeHandle(params.scrollViewRef?.current) ?? undefined)
          : undefined,
      childNativeID: params.childNativeID,
      offset: params.offset ?? 0,
      scrollToEnd: params.scrollToEnd ?? false,
    });
  }
}
