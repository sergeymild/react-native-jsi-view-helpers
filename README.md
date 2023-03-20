# react-native-jsi-view-helpers

React Native Jsi view helpers

## Installation

```sh
package.json
"react-native-jsi-view-helpers": "sergeymild/react-native-jsi-view-helpers#0.71.2"
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
