import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{
        headerShown: false
      }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
