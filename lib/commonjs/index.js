"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewHelpers = void 0;
var _reactNative = require("react-native");
var _NativeJsiViewHelpers = _interopRequireDefault(require("./NativeJsiViewHelpers.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class viewHelpers {
  static measureText(params) {
    return _NativeJsiViewHelpers.default.measureText(params);
  }
  static measureView(ref) {
    const viewId = (0, _reactNative.findNodeHandle)(ref.current);
    if (!viewId) return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    };
    return _NativeJsiViewHelpers.default.measureView(viewId);
  }
  static measureViewByNativeId(nativeID) {
    return _NativeJsiViewHelpers.default.measureViewByNativeId(nativeID);
  }
  static scrollToChild(params) {
    return _NativeJsiViewHelpers.default.scrollToChild({
      scrollNativeID: 'scrollNativeID' in params ? params.scrollNativeID : undefined,
      scrollViewId: 'scrollViewRef' in params ? (0, _reactNative.findNodeHandle)(params.scrollViewRef.current) ?? undefined : undefined,
      childNativeID: params.childNativeID,
      offset: params.offset ?? 0,
      scrollToEnd: params.scrollToEnd ?? false
    });
  }
}
exports.viewHelpers = viewHelpers;
//# sourceMappingURL=index.js.map