import * as React from 'react';
import { useRef } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { viewHelpers } from 'react-native-jsi-view-helpers';

const text =
  'The default is the same applied by React Native: Roboto in Android, San Francisco in iOS.\n' +
  'Note: Device manufacturer or custom ROM can change the default font';

export default function Other() {
  const viewRef = useRef<TouchableOpacity>(null);
  const fs = 14;
  const w = 53;
  const h = viewHelpers.measureText({ text, fontSize: fs, maxWidth: w });
  console.log(
    '[App.measure]',
    viewHelpers.measureText({ text, fontSize: fs, maxWidth: w })
  );

  return (
    <View style={styles.container}>
      <Text
        ref={viewRef}
        children={text}
        style={{
          fontSize: fs,
          height: h.height,
          width: h.width,
          backgroundColor: 'red',
        }}
      />

      <TouchableOpacity
        ref={viewRef}
        style={{ width: 100, height: 200, backgroundColor: 'yellow' }}
        onPress={() => {
          console.log('[App.measure]', viewHelpers.measureView(viewRef))
        }}
      >
        <Text>Measure</Text>
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
