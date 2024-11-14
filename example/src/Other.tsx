import * as React from 'react';
import { useRef } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { viewHelpers } from 'react-native-jsi-view-helpers';

const text =
  'The default is the same applied by React Native: Roboto in Android, San Francisco in iOS.\n' +
  'Note: Device manufacturer or custom ROM can change the default font';

export default function Other() {
  const viewRef = useRef<TouchableOpacity>(null);

  return (
    <View style={styles.container} accessibilityLabel={'baseContainer'}>
      <Text ref={viewRef} children={text} style={{}} />

      <TouchableOpacity
        ref={viewRef}
        style={{ width: 100, height: 200, backgroundColor: 'yellow' }}
        onPress={() => {
          console.log('[App.measure]', viewHelpers.measureView(viewRef));
        }}
      >
        <Text>Measure</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={'withNativeId'}
        nativeID={'someAwesomeId'}
        ref={viewRef}
        style={{ width: 100, height: 200, backgroundColor: 'yellow' }}
        onPress={(event) => {
          console.log(
            '[App.measure]',
            viewHelpers.measureViewByNativeId('textWithNativeId')
          );
        }}
      >
        <Text
          nativeID={'textWithNativeId'}
          accessibilityLabel={'textWithNativeLabel'}
        >
          Measure by native id
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        ref={viewRef}
        style={{ width: 100, height: 200, backgroundColor: 'yellow' }}
        onPress={() => {
          const fs = 14;
          const w = 53;
          const h = viewHelpers.measureText({
            text,
            fontSize: fs,
            maxWidth: w,
          });
          console.log('[App.measure]', h);
        }}
      >
        <Text>Measure Text</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginStart: 10,
    marginTop: 0,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
