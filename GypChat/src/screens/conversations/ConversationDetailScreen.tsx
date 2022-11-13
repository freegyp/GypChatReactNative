import * as React from 'react';
import {
  SafeAreaView,
  Platform,
  Keyboard,
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

import { useMainTabState } from "../MainTab";


const profileImagePlaceholderURL = "https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-600w-1677509740.jpg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  dialog: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "column",
  },
  inputFooter: {
    flexShrink: 1,
    minHeight: 64,
    width: "100%",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#aaaaaa",
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    flexGrow: 1,
    height: 36,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#aaaaaa",
  },
  roundButton: {
    flexShrink: 1,
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 8,
    marginRight: 8,
  },
  dialogMessageInbounding: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  dialogMessageOutgoing: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  profIcon: {
    flexShrink: 1,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    marginLeft: 12,
    marginRight: 12,
  },
  dialogMessageBoxInbounding: {
    flex: 1,
    maxWidth: 260,
    minHeight: 32,
    padding: 8,
    borderRadius: 5,
    backgroundColor: "rgba(128, 0, 128, 0.05)",
  },
  dialogMessageBoxOutgoing: {
    flexShrink: 1,
    maxWidth: 260,
    minHeight: 32,
    padding: 12,
    borderRadius: 5,
    backgroundColor: "#efefef",
  },
});

const DATA = [
  {
    id: "edsfferiofn",
    type:"outgoing",
    message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "hiuwelsdfhwernfx",
    type:"inbounding",
    message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "kendfnewilfsd",
    type:"inbounding",
    message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
    culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: "wiekrhuwifse",
    type:"outgoing",
    message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
];

const DialogMessageItem = ({type, message}) => {
  const styleMessage = type === "inbounding" ? styles.dialogMessageInbounding : styles.dialogMessageOutgoing;
  const styleTextBox = type === "inbounding" ? styles.dialogMessageBoxInbounding : styles.dialogMessageBoxOutgoing;

  return (
    <View style={styleMessage}>
      <FastImage
        style={styles.profIcon}
        source={{uri: profileImagePlaceholderURL}}
      />
      <View style={styleTextBox}>
        <Text>
          {message}
        </Text>
      </View>
    </View>
  );
};

const ConversationDetailScreen = ({navigation, route}) => {
  const {showMainTab, hideMainTab} = useMainTabState()
  useFocusEffect(
    React.useCallback(() => {
      hideMainTab()
      return showMainTab;
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <DialogMessageItem
        type={item.type}
        message={item.message}
      />
    </TouchableWithoutFeedback>
  );

  const [textDraft, setTextDraft] = React.useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{flex:1}}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.dialog}
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
        <View style={styles.inputFooter}>
          <TouchableOpacity
            style={styles.roundButton}
            activeOpacity={0.6}
            onPress={()=>console.log("Button press!")}
          >
            <MaterialIcons name="add-circle" color="purple" size={36} />
          </TouchableOpacity>
          <TextInput
            style={styles.inputField}
            onChangeText={setTextDraft}
            value={textDraft}
            placeholder="Type a message"
          />
          <TouchableOpacity
            style={styles.roundButton}
            activeOpacity={0.6}
            onPress={()=>console.log("Button press!")}
          >
            <MaterialIcons name="send" color="purple" size={36} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ConversationDetailScreen;
