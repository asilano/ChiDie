import React, { useCallback } from "react";
import { Text, Linking, Alert, SafeAreaView, StatusBar } from "react-native";
import Colours from "./Colours";
import ScreenCommon from "./ScreenCommon";
import Styles from "./Styles";
import BottomButton from "./BottomButton";
import { useDieContext } from "./DieContext";

const DieRollScreen = ({ navigation }) => {
  const dieContext = useDieContext();

  const buttons = () => {
    return dice.map((die, ix) => {
      return <BottomButton label={die} key={die} colour={Colours.buttons[ix]} perRow={4}/>
    })
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.top_bar}/>
      <ScreenCommon title='This is the die-roll screen' buttons={[]}>
        <Text style={Styles.body_text}>Your die size is: {dieContext.dieSize}!</Text>
      </ScreenCommon>
    </SafeAreaView>
  )
};

export default DieRollScreen;
