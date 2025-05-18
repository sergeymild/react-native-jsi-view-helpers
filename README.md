# react-native-jsi-view-helpers

React Native Jsi view helpers

## Installation

```sh
package.json
"react-native-jsi-view-helpers": "sergeymild/react-native-jsi-view-helpers#4.0.1"
yarn
npx pod-install
```

## Usage

```typescript
import { viewHelpers } from "react-native-jsi-view-helpers";

export interface MeasureParams {
  text: string;
  fontSize: number;
  maxWidth: number;
  allowFontScaling?: boolean;
  usePreciseWidth?: boolean;
  fontFamily?: string;
  weight?: TextProps['fontWeight']
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
  static measureText(params: MeasureParams): MeasureTextResult;
  static measureView(ref: React.RefObject<any>): MeasureViewResult;
  
  // scroll to any child in ScrollView
  static scrollToChild(
    params:
      | {
          // nativeID of scroll view
          scrollNativeID: string;
          // nativeID of child in scroll view (can be nested in another views)
          childNativeID: string;
          // offset
          offset?: number;
          // scroll to child end view (by default scroll to top)
          scrollToEnd?: boolean;
        }
      | {
          // ref of scroll view
          scrollViewRef: React.RefObject<ScrollView>;
          childNativeID: string;
          offset?: number;
          scrollToEnd?: boolean;
        }
  )
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
