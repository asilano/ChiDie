import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colours from "./Colours";
import ScreenCommon from "./ScreenCommon";
import Styles from "./Styles";

const DieMenu = () => {
  return (
    <ScreenCommon title='Choose die size'>
      <Text style={Styles.body_text}>Like it? <Text style={Styles.link_text}>Leave me a tip! Not that this works.</Text></Text>
    </ScreenCommon>
  )
}

export default DieMenu;
