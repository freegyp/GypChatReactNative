import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthSwitchTabNavigator from './src/screens/AuthSwitchTab';
import { AuthContextProvider } from "./src/wrappers/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <AuthSwitchTabNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
