import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react"
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { UserProfile } from "../models/UserProfile";
import UserAuthAPI from "../api/UserAuth";

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
  updateName: (name:string) => Promise<unknown>;
  updateEmail: (email:string) => Promise<unknown>;
  updatePassword: (password:string) => Promise<unknown>;
  updateProfilePic: (localURI:string) => Promise<unknown>;
}

export const AuthContext = createContext<null | AuthContextType>(null);

export const AuthContextProvider = (props:{
  children: ReactNode
}) => {

  const [authState, setAuthState] = useState<UserAuthState>(UserAuthState.UNDECIDED);

  const [userProfile, setUserProfile] = useState<UserProfile | undefined>();

  const logOut = useCallback(async () => {
    await UserAuthAPI.signOut()
  }, []);

  const logIn = useCallback(async (props:LoginProps) => {
    const { email, password } = props;

    await UserAuthAPI.signIn(email, password);
  }, [logOut]);

  const signUp = useCallback(async (props:SignUpProps) => {
    const { email, password, passwordConfirm } = props;

    if (password !== passwordConfirm){
      throw "Password confirm does not match!";
    }

    await UserAuthAPI.signUp(email, password);
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

  const updateName = useCallback(async (name:string) => {
    if (userProfile){
      await UserAuthAPI.updateName(name);
      setUserProfile(prev => {
        return {
          ...prev,
          displayName: name,
        };
      });
    }
  }, [userProfile]);

  const updateEmail = useCallback(async (email:string) => {
    if (userProfile){
      await UserAuthAPI.updateEmail(email);
      setUserProfile(prev => {
        return {
          ...prev,
          email: email,
        };
      });
    }
  }, [userProfile]);

  const updatePassword = useCallback(async (password:string) => {
    if (userProfile){
      await UserAuthAPI.updatePassword(password);
    }
  }, [userProfile]);

  const updateProfilePic = useCallback(async (localURI:string) => {
    if (userProfile){
      const remoteUrl = await UserAuthAPI.updateProfilePic(localURI, userProfile.uid);
      setUserProfile(prev => {
        return {
          ...prev,
          photoURL: remoteUrl,
        };
      });
    }
  }, [userProfile]);

  useEffect(() => {
    return UserAuthAPI.onAuthStateChanged(onAuthStateChanged);
  }, [logOut]);

  const contextValue = useMemo(() => ({
    authState,
    userProfile,
    logIn,
    logOut,
    signUp,
    updateName,
    updateEmail,
    updatePassword,
    updateProfilePic
  }), [authState, userProfile, logOut, logIn, signUp, updateName, updateEmail, updatePassword, updateProfilePic]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthRegContext = () => {
  const ctx = useContext(AuthContext)
  if ( ctx === null ) {
    throw new Error(`You're not supposed to access auth context without an ancetor provider for it`)
  }
  return ctx
};
