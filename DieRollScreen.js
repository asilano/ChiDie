import React, { useCallback, useState } from "react";
import { Text, Linking, Alert, SafeAreaView, StatusBar, Dimensions, View } from "react-native";
import Colours from "./Colours";
import ScreenCommon from "./ScreenCommon";
import Styles from "./Styles";
import BottomButton from "./BottomButton";
import { useDieContext } from "./DieContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import ChartTheme from "./ChartTheme";

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
  'd4': { faces: ["1", "2", "3", "4"], perRow: 4},
  'd6': { faces: ["1", "2", "3", "4", "5", "6"], perRow: 3},
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
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

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
        <View style={{ flexGrow: 1, borderWidth: 2 }}>
          <Text style={[Styles.body_text, { fontSize: 50, flexGrow: 1 }]}>{JSON.stringify(faceCounts)}</Text>
          <VictoryChart style={{ flexGrow: 2 }} theme={ChartTheme}>
              <VictoryAxis
                tickValues={buttonFaces[dieSize].faces.map((_, ix) => ix)}
                tickFormat={buttonFaces[dieSize].faces}
              />
              <VictoryBar
                data={faceCounts}
                labels={faceCounts}
              />
          </VictoryChart>
          <View style={{ flexGrow: 1 }} />
        </View>
      </ScreenCommon>
    </SafeAreaView>
  )
};

export default DieRollScreen;
