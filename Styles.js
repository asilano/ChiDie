import { StyleSheet } from "react-native";
import Colours from "./Colours";

const fontSize = 20;

const Styles = StyleSheet.create({
  body_text: {
    color: Colours.foreground,
    textAlign: "center",
    fontSize: fontSize
  },
  link_text: {
    textDecorationLine: 'underline'
  },
})

export default Styles;
