import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react"
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { UserProfile } from "../models/UserProfile";

export const enum UserAuthState {
  UNDECIDED = 'UNDECIDED',
  NOT_AUTH = 'NOT_AUTH',
  AUTH = 'AUTH',
}

type LoginProps = {
  email:string,
  password:string
};

type SignUpProps = {
  email:string,
  password:string,
  passwordConfirm:string
};

interface AuthContextType {
  authState: UserAuthState;
  userProfile?: UserProfile;
  logIn: (props:LoginProps) => Promise<unknown>;
  logOut: () => Promise<unknown>;
  signUp: (props:SignUpProps) => Promise<unknown>;
  updateEmail: (email:string) => Promise<unknown>;
  updatePassword: (password:string) => Promise<unknown>;
}

export const AuthContext = createContext<null | AuthContextType>(null);

export const AuthContextProvider = (props:{
  children: ReactNode
}) => {
  const [authState, setAuthState] = useState<UserAuthState>(UserAuthState.UNDECIDED);

  const [userProfile, setUserProfile] = useState<UserProfile | undefined>();

  const logOut = useCallback(async () => {
    await auth().signOut();
  }, []);

  const logIn = useCallback(async (props:LoginProps) => {
    const { email, password } = props;

    try{
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      throw err.message;
    }
  }, [logOut]);

  const signUp = useCallback(async (props:SignUpProps) => {
    const { email, password, passwordConfirm } = props;

    if (password !== passwordConfirm){
      throw "Password confirm does not match!";
    }

    try{
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      throw err.message;
    }
  }, []);

  const onAuthStateChanged = useCallback((user:FirebaseAuthTypes.User | null) => {
    if (user){
      setUserProfile({
        uid: user?.uid ?? "",
        email: user?.email ?? undefined,
        displayName: user?.displayName ?? undefined,
        photoURL: user?.photoURL ?? undefined
      });
      setAuthState(UserAuthState.AUTH);
    }else{
      setUserProfile(undefined);
      setAuthState(UserAuthState.NOT_AUTH);
    }
  }, []);

  const updateEmail = useCallback(async (email:string) => {
    try{
      if (userProfile){
        await auth().currentUser?.updateEmail(email);
      }
    } catch (err) {
      throw err.message;
    }
  }, [userProfile]);

  const updatePassword = useCallback(async (password:string) => {
    try{
      if (userProfile){
        await auth().currentUser?.updatePassword(password);
      }
    } catch (err) {
      throw err.message;
    }
  }, [userProfile])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [logOut]);

  const contextValue = useMemo(() => ({
    authState,
    userProfile,
    logIn,
    logOut,
    signUp,
    updateEmail,
    updatePassword
  }), [authState, userProfile, logOut, logIn, signUp, updateEmail, updatePassword]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
};

export const useAuthRegContext = () => {
  const ctx = useContext(AuthContext)
  if ( ctx === null ) {
    throw new Error(`You're not supposed to access auth context without an ancetor provider for it`)
  }
  return ctx
};
