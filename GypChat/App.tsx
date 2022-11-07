import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './src/screens/MainTab';

export default function App() {
  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
}
