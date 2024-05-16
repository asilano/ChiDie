import DieMenu from './DieMenu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DieRollScreen from './DieRollScreen';
import DieContext from './DieContext';
import { useState } from 'react';
import 'react-native-url-polyfill/auto';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dieSize, setDieSize] = useState("d3");
  const dieContextValue = {
    dieSize: dieSize,
    setDieSize: setDieSize
  };
  return (
    <DieContext.Provider value={dieContextValue}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ animation: 'fade' }}>
          <Stack.Screen
            name="DieMenu"
            component={DieMenu}
            options={{ headerShown: false }}>
          </Stack.Screen>
          <Stack.Screen
            name="DieRollScreen"
            component={DieRollScreen}
            options={{ headerShown: false }}>
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </DieContext.Provider>
  );
}
