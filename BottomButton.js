import React from "react";
import { StyleSheet, Text } from "react-native";
import Colours from "./Colours";

const BottomButton = (props) => {
  let btnWidth = 100 / props.perRow - 1;
  let btnStyles = [
    styles.button_style,
    {
      backgroundColor: props.colour,
      color: Colours.foreground,
      flexBasis: `${btnWidth}%`
    }
  ];
  if (props.small) {
    btnStyles.push({
      paddingBottom: 15,
      paddingTop: 15
    });
  }
  return (
    <Text style={btnStyles} onPress={props.action}>
      {props.label}
    </Text>
  )
}

const fontSize = 30;
const styles = StyleSheet.create({
  button_style: {
    flexGrow: 1,
    fontSize: fontSize,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  }
});

export default BottomButton;
