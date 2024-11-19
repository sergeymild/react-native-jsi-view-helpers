import type { TurboModule } from 'react-native';
export interface Spec extends TurboModule {
    measureText(params: {
        text: string;
        fontSize: number;
        maxWidth: number;
        allowFontScaling?: boolean;
        usePreciseWidth?: boolean;
        fontFamily?: string;
        weight?: string;
    }): {
        height: number;
        width: number;
        lineCount: number;
        lastLineWidth: number;
    };
    measureView(viewId: number): {
        height: number;
        width: number;
        x: number;
        y: number;
    };
    measureViewByNativeId(nativeID: string): {
        height: number;
        width: number;
        x: number;
        y: number;
    };
    scrollToChild(params: {
        scrollNativeID?: string;
        scrollViewId?: number;
        childNativeID: string;
        offset: number;
        scrollToEnd: boolean;
    }): void;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeJsiViewHelpers.d.ts.map