import React, { useEffect, useCallback, useState } from 'react';
import {
  Keyboard,
  Alert
} from 'react-native';

import { useAuthRegContext } from "../../wrappers/AuthContext";
import { validateEmail } from "../../models";
import { AuthForm, TextInputHinted, CustomButton, RedirectText } from "../../ui/auth/AuthForm";

const SignInScreen = () => {
  const { logIn } = useAuthRegContext();

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const submitAction = useCallback(() => {
    Keyboard.dismiss();
    setLoading(true);
    setEmailError("");
    setPasswordError("");
    if (!validateEmail(email)){
      setEmailError("Invalid Email!");
      setLoading(false);
      return;
    }
    if (password.length < 6){
      setPasswordError("A password must contain at least 6 characters!");
      setLoading(false);
      return;
    }

    logIn({email, password})
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        const errStr = String(err);
        Alert.alert(
          "Error",
          errStr,
          [
            {text: "OK", onPress: () => {}},
          ]
        );
      });
  }, [email, password]);

  return (
    <AuthForm loading={loading}>
      <TextInputHinted
        inputType={"email"}
        value={email}
        onChangeText={setEmail}
        valueError={emailError}
      />
      <TextInputHinted
        inputType={"password"}
        value={password}
        onChangeText={setPassword}
        valueError={passwordError}
      />
      <CustomButton
        onPress={submitAction}
        text={"Sign In"}
      />
      <RedirectText
        hintText={"Don't have an account?"}
        linkText={"Sign Up"}
        linkDestination={"SignUp"}
      />
    </AuthForm>
  );
};

export default SignInScreen;
