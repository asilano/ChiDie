import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colours from "./Colours";

class DieMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top_bar}>
          <Text style={styles.top_bar_text}>Choose die size</Text>
        </View>
        <View style={styles.blank_space}>
          <Text style={styles.body_text}>Like it? <Text style={styles.link_text}>Leave me a tip! Not that this works.</Text></Text>
        </View>
      </View>
    )
  }
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
  body_text: {
    color: Colours.foreground,
    textAlign: "center",
    fontSize: fontSize
  },
  link_text: {
    textDecorationLine: 'underline'
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
})

export default DieMenu;
