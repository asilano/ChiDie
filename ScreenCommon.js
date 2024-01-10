import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colours from "./Colours";
import { AntDesign } from "@expo/vector-icons";

function maybeBackButton(backNavigator) {
  if (backNavigator) {
    return (
      <>
      <AntDesign
        name="arrowleft"
        size={fontSize}
        onPress={() => backNavigator.goBack()}>
      </AntDesign>
      &nbsp;&nbsp;
      </>)
  }
}

const ScreenCommon = props => {
  return (
    <View style={styles.container}>
      <View style={styles.top_bar}>
        <Text style={styles.top_bar_text}>
          {
            maybeBackButton(props.backNavigator)
          }
          {props.title}
        </Text>
      </View>
      <View style={styles.blank_space}>
        {props.children}
      </View>
      <View style={styles.button_area}>
        {props.buttons}
      </View>
    </View>
  )
}

const fontSize = 20;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: '#000'
  },
  blank_space: {
    background_color: Colours.background,
    flexGrow: 1,
    padding: 10,
    alignContent: 'center'
  },
  top_bar: {
    backgroundColor: Colours.top_bar,
    flexBasis: 'auto',
    padding: 15,
    paddingLeft: 20
  },
  top_bar_text: {
    color: Colours.top_bar_fg,
    fontSize: fontSize
  },
  button_area: {
    flexBasis: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default ScreenCommon;
