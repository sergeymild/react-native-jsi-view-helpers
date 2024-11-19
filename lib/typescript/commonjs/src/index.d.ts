import type React from 'react';
import { ScrollView } from 'react-native';
type FontWeight = 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
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
export declare class viewHelpers {
    static measureText(params: MeasureParams): MeasureTextResult;
    static measureView(ref: React.RefObject<any>): MeasureViewResult;
    static measureViewByNativeId(nativeID: string): MeasureViewResult;
    static scrollToChild(params: {
        scrollNativeID: string;
        childNativeID: string;
        offset?: number;
        scrollToEnd?: boolean;
    } | {
        scrollViewRef: React.RefObject<ScrollView>;
        childNativeID: string;
        offset?: number;
        scrollToEnd?: boolean;
    }): void;
}
export {};
//# sourceMappingURL=index.d.ts.map