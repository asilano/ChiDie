import React from "react";
import { StyleSheet, Text } from "react-native";

const BottomButton = (props) => {
  let btnWidth = 100 / props.perRow - 1;
  let btnStyles = [
    styles.button_style,
    {
      backgroundColor: props.colours.bg,
      color: props.colours.fg,
      flexBasis: `${btnWidth}%`
    }
  ];
  return (
    <Text style={btnStyles}>
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
