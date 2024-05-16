import React, { useEffect, useReducer, useRef, useState } from "react";
import { Text, SafeAreaView, StatusBar, View, Animated } from "react-native";
import Colours from "./Colours";
import ScreenCommon from "./ScreenCommon";
import Styles from "./Styles";
import BottomButton from "./BottomButton";
import { useDieContext } from "./DieContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory-native";
import ChartTheme from "./ChartTheme";
import BalanceCheck from "./BalanceCheck";

async function readCounts(dieSize, faceCounts) {
  try {
    const stored = await AsyncStorage.getItem(dieSize);

    if (stored !== null) {
      JSON.parse(stored).forEach((count, ix) => {
        faceCounts[ix][1](count);
      })
    } else {
      faceCounts.forEach((pair) => pair[1](0))
    }
  } catch (e) {
    faceCounts.forEach((pair) => pair[1](0))
  }
}

async function storeCounts(dieSize, faceCounts) {
  try {
    const jsonValue = JSON.stringify(faceCounts.map(pair => pair[0]));
    await AsyncStorage.setItem(dieSize, jsonValue);
  } catch (e) {
    // saving error
  }
}

const buttonFaces = {
  'd4': { faces: [1, 2, 3, 4], perRow: 4},
  'd6': { faces: [1, 2, 3, 4, 5, 6], perRow: 3},
  'd8': { faces: [1, 2, 3, 4, 5, 6, 7, 8], perRow: 4 },
  'd10': { faces: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], perRow: 5 },
  'd%':  { faces: ["10", "20", "30", "40", "50", "60", "70", "80", "90", "00"], perRow: 5 },
  'd12': { faces: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], perRow: 4 },
  'd20': { faces: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], perRow: 5 }
}

const DieRollScreen = ({ navigation }) => {
  const dieContext = useDieContext();
  const dieSize = dieContext.dieSize;

  faceCounts = buttonFaces[dieSize].faces.map(() => {
    return useState(0);
  });

  const [facePressed, setFacePressed] = useState(undefined);
  const [faceWasPressed, setFaceWasPressed] = useState(false);
  const [ready, setReady] = useState(false);
  const fadeOut = useRef(new Animated.Value(1));
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    fadeOut.current.setValue(1);

    Animated.timing(fadeOut.current, {
      toValue: 0,
      delay: 500,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, [faceWasPressed]);

  const buttons = () => {
    const perRow = buttonFaces[dieSize].perRow;
    return buttonFaces[dieSize].faces.map((face, ix) => {
      return (
        <BottomButton
          label={face}
          key={face}
          colour={Colours.buttons[ix % Colours.buttons.length]}
          perRow={perRow}
          small
          action={() => {
                    faceCounts[ix][0] += 1;
                    storeCounts(dieSize, faceCounts).then(() => {
                      setFacePressed(ix);
                      setFaceWasPressed(b => !b);
                    });
                  }}
        />
      )
    })
  };

  const resetRolls = () => {
    const zeros = buttonFaces[dieSize].faces.map(() => [0, null]);
    storeCounts(dieSize, zeros);
    forceUpdate();
  }

  const undoLast = () => {
    faceCounts[facePressed][0] -= 1;
    storeCounts(dieSize, faceCounts);
    forceUpdate();
  }

  readCounts(dieSize, faceCounts).then(() => setReady(true));

  const chartArea = () => {
    if (ready) {
      return (
        <VictoryChart style={{ flexGrow: 2 }} theme={ChartTheme}>
          <VictoryAxis
            tickValues={buttonFaces[dieSize].faces.map((_, ix) => ix)}
            tickFormat={buttonFaces[dieSize].faces}
          />
          <VictoryBar
            data={faceCounts.map(pair => pair[0])}
            labels={faceCounts.map(pair => pair[0])}
          />
        </VictoryChart>
      )
    }
  };

  const balanceArea = () => {
    if (ready) {
      return (
        <View style={{ flexGrow: 1 }}>
          <BalanceCheck dieSize={dieSize} rolls={faceCounts.map(pair => pair[0])} />
        </View>
      )
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.top_bar}/>
      <ScreenCommon title='Roll your die' backNavigator={navigation} buttons={buttons()}>
        <View style={{ flexGrow: 1 }}>
          <View style={{ flexBasis: 50, flexGrow: 1 }}>
            <Animated.Text
              style={[Styles.body_text, { fontSize: 60, fontWeight: "bold", opacity: fadeOut.current }]}
            >
              {buttonFaces[dieSize].faces[facePressed]}
            </Animated.Text>
            <Text style={[Styles.body_text, Styles.reset_button]} onPress={resetRolls}>RESET</Text>
            <Text style={[Styles.body_text, Styles.undo_button]} onPress={undoLast}>UNDO</Text>
          </View>
          { chartArea() }
          { balanceArea() }
        </View>
      </ScreenCommon>
    </SafeAreaView>
  )
};

export default DieRollScreen;
