import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colours from "./Colours";

const ScreenCommon = props => {
  return (
    <View style={styles.container}>
      <View style={styles.top_bar}>
        <Text style={styles.top_bar_text}>{props.title}</Text>
      </View>
      <View style={styles.blank_space}>
        {props.children}
      </View>
      <View style={styles.button_area}>
        <Text style={styles.button_text}>Buttons will go here.</Text>
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
    padding: 10,
    paddingLeft: 20
  },
  top_bar_text: {
    color: Colours.top_bar_fg,
    fontSize: fontSize
  },
  button_area: {
    flexBasis: 'auto',
    backgroundColor: Colours._button_area_bg
  },
  button_text: {
    color: Colours._button_area_fg
  }
})

export default ScreenCommon;
