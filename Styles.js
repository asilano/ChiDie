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
  reset_button: {
    backgroundColor: Colours.reset,
    fontSize: 15,
    padding: 10,
    borderRadius: 2,
    position: "absolute",
    top: 5,
    right: 5
  },
  undo_button: {
    backgroundColor: Colours.undo,
    fontSize: 15,
    padding: 10,
    borderRadius: 2,
    position: "absolute",
    top: 5,
    left: 5
  }
})

export default Styles;
