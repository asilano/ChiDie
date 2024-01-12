import React, { useCallback, useState } from "react";
import { Text, Linking, Alert, SafeAreaView, StatusBar } from "react-native";
import Colours from "./Colours";
import ScreenCommon from "./ScreenCommon";
import Styles from "./Styles";
import BottomButton from "./BottomButton";
import { useDieContext } from "./DieContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getStoredCount(dieSize, setPressedCount) {
  try {
    const stored = await AsyncStorage.getItem(dieSize);
    if (stored !== null) {
      setPressedCount(JSON.parse(stored));
    } else {
      setPressedCount(0);
    }
  } catch (e) {
    setPressedCount(0);
  }
}

async function setStoredCount(dieSize, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(dieSize, jsonValue);
  } catch (e) {
    // saving error
  }
}

const DieRollScreen = ({ navigation }) => {
  const dieContext = useDieContext();
  const [pressedCount, setPressedCount] = useState(0);
  getStoredCount(dieContext.dieSize, setPressedCount);

  const buttons = () => {
    // return dice.map((die, ix) => {
    //   return <BottomButton label={die} key={die} colour={Colours.buttons[ix]} perRow={4}/>
    // })
    return [
      <BottomButton label="Press Me" key="Press" colour={Colours.buttons[0]} perRow={4}
        action={() => {
          setStoredCount(dieContext.dieSize, pressedCount + 1);
          setPressedCount(pressedCount + 1);
        }}
      />
    ]
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.top_bar}/>
      <ScreenCommon title='This is the die-roll screen' backNavigator={navigation} buttons={buttons()}>
        <Text style={Styles.body_text}>Your die size is: {dieContext.dieSize}!</Text>
        <Text style={Styles.body_text}>You've pressed this button {pressedCount} time(s)!</Text>
      </ScreenCommon>
    </SafeAreaView>
  )
};

export default DieRollScreen;
