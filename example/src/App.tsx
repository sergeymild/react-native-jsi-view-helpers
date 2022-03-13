import * as React from 'react';
import { useEffect, useRef } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { viewHelpers } from 'react-native-jsi-view-helpers';

const text =
  'The default is the same applied by React Native: Roboto in Android, San Francisco in iOS.\n' +
  'Note: Device manufacturer or custom ROM can change the default font';

export default function App() {
  const viewRef = useRef<View>(null);
  const fs = 14;
  const w = 53;
  const h = viewHelpers.measureText({ text, fontSize: fs, maxWidth: w });
  console.log(
    '[App.measure]',
    viewHelpers.measureText({ text, fontSize: fs, maxWidth: w })
  );

  useEffect(() => {
    setTimeout(() => {
      console.log('[App.]', viewHelpers.measureView(viewRef));
    }, 1000);
  }, []);

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
