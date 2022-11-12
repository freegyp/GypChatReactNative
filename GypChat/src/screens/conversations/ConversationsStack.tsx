import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ConversationsScreen, { ConversationsScreenHeader } from "./ConversationsScreen";
import ConversationDetailScreen from "./ConversationDetailScreen";

const Stack = createStackNavigator();

const ConversationsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Conversations">
      <Stack.Screen name="Conversations" component={ConversationsScreen} options={{
        header: (props) => {
          return (
            <ConversationsScreenHeader />
          );
        },
      }} />
      <Stack.Screen name="ConversationDetail" component={ConversationDetailScreen} options={({route}) => ({
        title: `${route.params.name ?? ""}`,
        headerBackTitleVisible: false,
      })} />
    </Stack.Navigator>
  );
};

export default ConversationsStack;
