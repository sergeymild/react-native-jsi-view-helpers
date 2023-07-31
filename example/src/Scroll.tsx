import * as React from 'react';
import { useRef } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { viewHelpers } from 'react-native-jsi-view-helpers';

export default function Scroll() {
  const scrollRef = useRef<ScrollView>(null);
  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ marginBottom: 10, marginEnd: 10 }}
            onPress={() => {
              viewHelpers.scrollToChild({
                scrollViewRef: scrollRef,
                childNativeID: 'scroll-to',
                offset: 1,
              });
            }}
          >
            <Text>Scroll to 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => {
              viewHelpers.scrollToChild({
                scrollNativeID: 'scroll-view',
                childNativeID: 'scroll-to2',
                offset: 0,
                scrollToEnd: true,
              });
            }}
          >
            <Text>Scroll to 2</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', height: 300 }}>
          <ScrollView nativeID={'scroll-view'} ref={scrollRef}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderTopColor: 'red',
                marginTop: 100,
              }}
            >
              <Text nativeID={'scroll-to'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                deleniti dolorem, maiores nemo similique vero. Ab accusamus
                aperiam architecto cupiditate, enim inventore magni nobis optio,
                sapiente sequi, similique vel voluptatem.
              </Text>
            </View>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text nativeID={'scroll-to2'} style={{ color: 'green' }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. At deleniti dolorem, maiores
              nemo similique vero. Ab accusamus aperiam architecto cupiditate,
              enim inventore magni nobis optio, sapiente sequi, similique vel
              voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. At deleniti dolorem, maiores nemo similique vero. Ab
              accusamus aperiam architecto cupiditate, enim inventore magni
              nobis optio, sapiente sequi, similique vel voluptatem.Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. At deleniti dolorem,
              maiores nemo similique vero. Ab accusamus aperiam architecto
              cupiditate, enim inventore magni nobis optio, sapiente sequi,
              similique vel voluptatem.Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. At deleniti dolorem, maiores nemo similique
              vero. Ab accusamus aperiam architecto cupiditate, enim inventore
              magni nobis optio, sapiente sequi, similique vel voluptatem.Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. At deleniti
              dolorem, maiores nemo similique vero. Ab accusamus aperiam
              architecto cupiditate, enim inventore magni nobis optio, sapiente
              sequi, similique vel voluptatem.Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. At deleniti dolorem, maiores nemo
              similique vero. Ab accusamus aperiam architecto cupiditate, enim
              inventore magni nobis optio, sapiente sequi, similique vel
              voluptatem.Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. At deleniti dolorem, maiores nemo similique vero. Ab
              accusamus aperiam architecto cupiditate, enim inventore magni
              nobis optio, sapiente sequi, similique vel voluptatem.Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. At deleniti dolorem,
              maiores nemo similique vero. Ab accusamus aperiam architecto
              cupiditate, enim inventore magni nobis optio, sapiente sequi,
              similique vel voluptatem.Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. At deleniti dolorem, maiores nemo similique
              vero. Ab accusamus aperiam architecto cupiditate, enim inventore
              magni nobis optio, sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              deleniti dolorem, maiores nemo similique vero. Ab accusamus
              aperiam architecto cupiditate, enim inventore magni nobis optio,
              sapiente sequi, similique vel voluptatem.
            </Text>
          </ScrollView>
        </View>

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => {
            viewHelpers.scrollToChild({
              scrollNativeID: 'scroll-view-2',
              childNativeID: 'yellow-view',
              offset: 0,
              scrollToEnd: true,
            });
          }}
        >
          <Text>Scroll 2</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, width: '100%', height: 100 }}>
          <ScrollView
            nativeID={'scroll-view-2'}
            horizontal
            style={{ height: '100%', width: '100%' }}
          >
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              nativeID={'yellow-view'}
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'yellow',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
            <View
              style={{
                width: 100,
                height: '100%',
                marginEnd: 20,
                backgroundColor: 'red',
              }}
            />
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
