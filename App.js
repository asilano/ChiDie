import { View, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import DieMenu from './DieMenu';
import Colours from './Colours';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.top_bar}/>
      <View style={[styles.container, styles.content, { width: '100%' }]}>
        <DieMenu></DieMenu>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
  },
  text: {
    color: '#f0f0ff'
  }
});
