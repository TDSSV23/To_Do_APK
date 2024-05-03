import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './Styles/temaContext';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Pages/home.js'; // Importe suas telas
import Config from './Pages/config.js'; // Importe suas telas
// import Msg from './Components/PushNotification.js'; // Importe suas telas
import Login from './Pages/login.js'
import Audio from './Components/audio.js'
import BluetoothButton from './Pages/bluethoot.js'


export default function App() {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="audio" component={Audio} />
          <Stack.Screen name="blue" component={BluetoothButton} />
          <Stack.Screen name="Configurações" component={Config} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}


{/* <Button
              title={isEditing ? 'Salvar' : 'Adicionar'}
              onPress={async () => {
                handleAddTask();
              }}
            /> */}