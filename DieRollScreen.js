import React, { useCallback, useState } from "react";
import { Text, Linking, Alert, SafeAreaView, StatusBar } from "react-native";
import Colours from "./Colours";
import ScreenCommon from "./ScreenCommon";
import Styles from "./Styles";
import BottomButton from "./BottomButton";
import { useDieContext } from "./DieContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function readCounts(dieSize, setFaceCounts) {
  try {
    const stored = await AsyncStorage.getItem(dieSize);
    if (stored !== null) {
      setFaceCounts(JSON.parse(stored));
    } else {
      setFaceCounts(zeroedFaceCounts(dieSize));
    }
  } catch (e) {
    setFaceCounts(zeroedFaceCounts(dieSize));
  }
}

async function storeCounts(dieSize, faceCounts) {
  try {
    const jsonValue = JSON.stringify(faceCounts);
    await AsyncStorage.setItem(dieSize, jsonValue);
  } catch (e) {
    // saving error
  }
}

function zeroedFaceCounts(dieSize) {
  return buttonFaces[dieSize].faces.map(() => 0)
}

const buttonFaces = {
  'd4': {faces: ["1", "2", "3", "4"], perRow: 4},
  // 'd6',
  // 'd8',
  // 'd10',
  // 'd%',
  // 'd12',
  // 'd20'
}

const DieRollScreen = ({ navigation }) => {
  const dieContext = useDieContext();
  const dieSize = dieContext.dieSize;
  const [faceCounts, setFaceCounts] = useState(zeroedFaceCounts(dieSize));
  readCounts(dieSize, setFaceCounts);

  const buttons = () => {
    const perRow = buttonFaces[dieSize].perRow;
    return buttonFaces[dieSize].faces.map((face, ix) => {
      return (
        <BottomButton
          label={face}
          key={face}
          colour={Colours.buttons[ix]}
          perRow={perRow}
          action={() => {
                    faceCounts[ix]++;
                    storeCounts(dieSize, faceCounts).then(() => setFaceCounts(faceCounts));
                  }}
          />
      )
    })
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.top_bar}/>
      <ScreenCommon title='This is the die-roll screen' backNavigator={navigation} buttons={buttons()}>
        <Text style={Styles.body_text}>Your die size is: {dieSize}!</Text>
        <Text style={Styles.body_text}>You've rolled this die {JSON.stringify(faceCounts)} time(s)!</Text>
      </ScreenCommon>
    </SafeAreaView>
  )
};

export default DieRollScreen;
