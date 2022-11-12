import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Badge } from "react-native-elements";
import create from "zustand";

import ConversationsStack from "./conversations/ConversationsStack";

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: "space-around",
    height: 84,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderColor: "#E3E6E7",
    borderWidth: 0.5,
    backgroundColor: "white",
  },
  tabBarItem: {
    flexShrink: 1,
    flexBasis: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const useMainTabState = create((set) => ({
  visible: true,
  showMainTab: () => set({visible:true}),
  hideMainTab: () => set({visible:false})
}));

const ContactsStackScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
      <Text>Contacts!</Text>
    </View>
  );
};

const TabBar = ({ state, descriptors, navigation }:BottomTabBarProps) => {
  const visible = useMainTabState((state) => state.visible);

  if (!visible){
    return <View/>;
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const tabBarLabel:(string | undefined) = options.tabBarLabel as string;
        const label:string =
          tabBarLabel !== undefined
            ? tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconColor = state.index === index ? "purple" : "#999999";

        const showBadge = (index === 0);

        const TabBarIcon:React.FC<{
          color:string,size:number,focused:boolean}
        > = (options.tabBarIcon as React.FC<{
          color:string,size:number,focused:boolean}
        >) ?? (({color:string,size:number,focused:boolean}) => <View/>);

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
            key={route.key}
          >
            <View>
              {
                options.tabBarIcon ?
                <TabBarIcon color={iconColor} size={24} focused={true} />
                : <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                  {label}
                </Text>
              }

              {showBadge && <Badge
                badgeStyle={{
                  backgroundColor: "purple",
                }}
                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
              />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="ConversationStack" component={ConversationsStack} options={{
        headerShown: false,
        tabBarLabel: "Conversations",
        tabBarIcon: ({ color, size }) => (
          <Entypo name="chat" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Contacts" component={ContactsStackScreen} options={{
        headerShown: false,
        tabBarLabel: "Contacts",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="contacts" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
}
