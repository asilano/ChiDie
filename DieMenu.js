import React, { Component, useCallback } from "react";
import { View, Text, StyleSheet, Linking, Alert } from "react-native";
import Colours from "./Colours";
import ScreenCommon from "./ScreenCommon";
import Styles from "./Styles";

const DieMenu = () => {
  const tipLink = 'https://ko-fi.com/chowlett';
  const visitTipLink = useCallback(async () => {
    const supported = Linking.canOpenURL(tipLink);
    if (supported) {
      await Linking.openURL(tipLink);
    } else {
      Alert.alert("Sorry, we couldn't visit the tip page.");
    }
  }, [visitTipLink]);

  return (
    <ScreenCommon title='Choose die size'>
      <Text style={Styles.body_text}>Like it?&nbsp;
        <Text style={Styles.link_text} onPress={visitTipLink}>Leave me a tip!</Text>
      </Text>
    </ScreenCommon>
  )
}

export default DieMenu;
