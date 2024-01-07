import React, { Component, useCallback } from "react";
import { View, Text, StyleSheet, Linking, Alert } from "react-native";
import Colours from "./Colours";
import ScreenCommon from "./ScreenCommon";
import Styles from "./Styles";
import BottomButton from "./BottomButton";

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

  const buttons = () => {
    return dice.map(die => {
      let colours = diceColours[die];
      return <BottomButton label={die} colours={colours} perRow={4}/>
    })
  };

  return (
    <ScreenCommon title='Choose die size' buttons={buttons()}>
      <Text style={Styles.body_text}>Like it?&nbsp;
        <Text style={Styles.link_text} onPress={visitTipLink}>Leave me a tip!</Text>
      </Text>
    </ScreenCommon>
  )
};

const dice = ['d4', 'd6', 'd8', 'd10', 'd%', 'd12', 'd20'];
const diceColours = {
  d4: { bg: '#ff0000', fg: Colours.foreground },
  d6: { bg: '#dd6600', fg: Colours.foreground },
  d8: { bg: '#aa00aa', fg: Colours.foreground },
  d10: { bg: '#6600aa', fg: Colours.foreground },
  'd%': { bg: '#00aa00', fg: Colours.foreground },
  d12: { bg: '#0070bb', fg: Colours.foreground },
  d20: { bg: '#006600', fg: Colours.foreground },
}

export default DieMenu;
