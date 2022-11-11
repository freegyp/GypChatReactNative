import * as React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthSwitchTabNavigator from './src/screens/AuthSwitchTab';
import MainTabNavigator from "./src/screens/MainTab";
import { AuthContextProvider } from "./src/wrappers/AuthContext";

const MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
  },
};

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer theme={MyTheme}>
        <AuthSwitchTabNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
