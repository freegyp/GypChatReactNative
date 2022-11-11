import React, { useEffect, useCallback, useState } from 'react';
import {
  Keyboard,
  Alert
} from 'react-native';

import { useAuthRegContext } from "../../wrappers/AuthContext";
import { validateEmail } from "../../models";
import { AuthForm, TextInputHinted, CustomButton, RedirectText } from "../../ui/auth/AuthForm";

const SignUpScreen = () => {
  const { signUp } = useAuthRegContext();

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [loading, setLoading] = useState(false);

  const submitAction = useCallback(() => {
    Keyboard.dismiss();
    setLoading(true);
    setEmailError("");
    setPasswordError("");
    setPasswordConfirmError("");
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
    if (password !== passwordConfirm){
      setPasswordConfirmError("Password confirm does not match!");
      setLoading(false);
      return;
    }

    signUp({email, password, passwordConfirm})
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
      <TextInputHinted
        inputType={"passwordConfirm"}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        valueError={passwordConfirmError}
      />
      <CustomButton
        onPress={submitAction}
        text={"Sign Up"}
      />
      <RedirectText
        hintText={"Already have an account?"}
        linkText={"Sign In"}
        linkDestination={"SignIn"}
      />
    </AuthForm>
  );
};

export default SignUpScreen;
