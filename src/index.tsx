import type React from 'react';
import { findNodeHandle, NativeModules, Platform, TextStyle } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-jsi-view-helpers' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const JsiViewHelpers = NativeModules.JsiViewHelpers
  ? NativeModules.JsiViewHelpers
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

JsiViewHelpers.install();

export interface MeasureParams {
  text: string;
  fontSize: number;
  maxWidth: number;
  allowFontScaling?: boolean;
  usePreciseWidth?: boolean;
  fontFamily?: string;
  weight?: TextStyle['fontWeight']
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
    // @ts-ignore
    return global.__viewHelpers.measureText(params);
  }

  static measureView(ref: React.RefObject<any>): MeasureViewResult {
    const viewId = findNodeHandle(ref.current);
    if (!viewId) return { width: 0, height: 0, x: 0, y: 0 };
    // @ts-ignore
    return global.__viewHelpers.measureView(viewId);
  }
}
