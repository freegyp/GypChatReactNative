import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainTab from "./MainTab";
import AuthStack from "./auth/AuthStack";
import { useAuthRegContext, UserAuthState } from "../wrappers/AuthContext";

const WaitingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
      <Text>Loading...</Text>
    </View>
  );
};

const AuthStackScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
      <Text>Auth stack here...</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const AuthSwitchTabNavigator = () => {
  const { authState } = useAuthRegContext();

  const navigation = useNavigation();

  useEffect(() => {
    if (authState === UserAuthState.UNDECIDED){
      navigation.navigate("Waiting");
    }else if(authState === UserAuthState.NOT_AUTH){
      navigation.navigate("AuthStack");
    }else{
      navigation.navigate("MainTab");
    }
  }, [authState]);

  return (
    <Tab.Navigator tabBar={(props) => <View />} initialRouteName={"AuthStack"}>
      <Tab.Screen name="AuthStack" component={AuthStack} options={{
        headerShown: false
      }} />
      <Tab.Screen name="MainTab" component={MainTab} options={{
        headerShown: false
      }} />
      <Tab.Screen name="Waiting" component={WaitingScreen} options={{
        headerShown: false
      }} />
    </Tab.Navigator>
  );
};

export default AuthSwitchTabNavigator;
