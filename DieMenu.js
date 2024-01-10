import React, { useCallback } from "react";
import { Text, Linking, Alert, SafeAreaView, StatusBar } from "react-native";
import Colours from "./Colours";
import ScreenCommon from "./ScreenCommon";
import Styles from "./Styles";
import BottomButton from "./BottomButton";
import { useDieContext } from "./DieContext";

function visitDieRollScreen(nav, dieSize, setDieSize) {
  setDieSize(dieSize);
  nav.navigate('DieRollScreen', { dieSize: dieSize });
}

const DieMenu = ({ navigation }) => {
  const dieContext = useDieContext();

  const tipLink = 'https://ko-fi.com/chowlett';
  const visitTipLink = useCallback(async () => {
    const supported = Linking.canOpenURL(tipLink);
    if (supported) {
      await Linking.openURL(tipLink);
    } else {
      Alert.alert("Sorry, we couldn't visit the tip page.");
    }
  }, [visitTipLink]);

  const buttons = () => {
    return dice.map((die, ix) => {
      return (
        <BottomButton
          label={die}
          key={die}
          colour={Colours.buttons[ix]}
          perRow={4}
          action={() => visitDieRollScreen(navigation, die, dieContext.setDieSize)}/>
      )
    })
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.top_bar}/>
      <ScreenCommon title='Choose die size' buttons={buttons()}>
        <Text style={Styles.body_text}>Like it?&nbsp;
          <Text style={Styles.link_text} onPress={visitTipLink}>Leave me a tip!</Text>
        </Text>
      </ScreenCommon>
    </SafeAreaView>
  )
};

const dice = ['d4', 'd6', 'd8', 'd10', 'd%', 'd12', 'd20'];

export default DieMenu;
