"use strict";

import { findNodeHandle } from 'react-native';
import JsiViewHelpers from "./NativeJsiViewHelpers.js";
export class viewHelpers {
  static measureText(params) {
    return JsiViewHelpers.measureText(params);
  }
  static measureView(ref) {
    const viewId = findNodeHandle(ref.current);
    if (!viewId) return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    };
    return JsiViewHelpers.measureView(viewId);
  }
  static measureViewByNativeId(nativeID) {
    return JsiViewHelpers.measureViewByNativeId(nativeID);
  }
  static scrollToChild(params) {
    return JsiViewHelpers.scrollToChild({
      scrollNativeID: 'scrollNativeID' in params ? params.scrollNativeID : undefined,
      scrollViewId: 'scrollViewRef' in params ? findNodeHandle(params.scrollViewRef.current) ?? undefined : undefined,
      childNativeID: params.childNativeID,
      offset: params.offset ?? 0,
      scrollToEnd: params.scrollToEnd ?? false
    });
  }
}
//# sourceMappingURL=index.js.map