import React, { useEffect, useCallback, useState } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import TextLink from 'react-native-text-link';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';
import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading';

const styles = StyleSheet.create({
  authForm: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  formIconHeader: {
    flexShrink: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 55,
  },
  formHeaderText: {
    flexShrink: 1,
    color: "purple",
    fontFamily: "GreatVibes_400Regular",
    fontSize: 48,
    marginLeft: 12,
  },
  formFields:{
    width:"100%",
    maxWidth: 400,
  },
  inputGroup: {
    marginBottom: 8,
  },
  input: {
    flexShrink:1,
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  submitButton: {
    flexShrink:1,
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "purple",
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  redirectText: {
    marginTop: 20,
    marginLeft: 12,
    marginRight: 12,
    padding: 10,
    color: "black",
    textAlign: "left"
  },
  redirectLinkText: {
    color: "black",
    textDecorationLine: "underline"
  }
});

export const RedirectText = ({
  hintText,
  linkText,
  linkDestination
}) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.push(linkDestination);
  }, [linkDestination]);

  return (
    <TextLink links={[
      {
        text:linkText,
        onPress: onPress,
      }
    ]}
    textStyle={styles.redirectText}
    textLinkStyle={styles.redirectLinkText}
    >
      {hintText + " " + linkText}
    </TextLink>
  );
};

export const TextInputHinted = ({
  inputType,
  value,
  onChangeText,
  valueError
}) => {
  const placeholder = (inputType === "email") ? "Email" : (inputType === "passwordConfirm" ? "Confirm Password" : "Password");
  const keyboardType = inputType === "email" ? "email-address" : "default";
  const secureTextEntry = (inputType === "password" || inputType === "passwordConfirm");
  return (
    <View style={styles.inputGroup}>
      <TextInput
        style={styles.input}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
      { valueError.length > 0 && <Text style={{color:"red", marginLeft: 16}}>*{valueError}</Text>}
    </View>
  );
};

export const CustomButton = ({onPress, text}) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={{color:"white", fontSize: 18}}>{text}</Text>
    </TouchableOpacity>
  )
};

export const AuthForm = ({children, loading}) => {
  let [fontsLoaded] = useFonts({
    GreatVibes_400Regular,
  });

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  if (!fontsLoaded){
    return <AppLoading />;
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.authForm}>
        <View style={styles.formIconHeader}>
          <Entypo name="chat" color={"purple"} size={72} style={{flexShrink:1}} />
          <Text style={styles.formHeaderText}>GypChat</Text>
        </View>

        <SafeAreaView style={styles.formFields}>
          {children}
        </SafeAreaView>

        {loading &&
          <View style={styles.loading}>
            <ActivityIndicator/>
          </View>
        }
      </View>
    </TouchableWithoutFeedback>
  )
};
