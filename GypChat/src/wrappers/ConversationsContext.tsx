import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import AppLoading from 'expo-app-loading';

import { Conversation, ConversationLocal, Message } from "../models";
import { useAuthRegContext, UserAuthState } from "./AuthContext";

interface ConversationsContextType {
  conversations: ConversationLocal[];
}

export const ConversationsContext = createContext<null | ConversationsContextType>(null);

export const ConversationsContextProvider = (props:{
  children: ReactNode
}) => {
  const { authState } = useAuthRegContext();

  const contextValue = useMemo(() => ({
    conversations: [],
  }), []);

  return (
    <ConversationsContext.Provider value={contextValue}>
      {props.children}
    </ConversationsContext.Provider>
  )
};

export const useConversationsContext = () => {
  const ctx = useContext(ConversationsContext);
  if ( ctx === null ) {
    throw new Error(`You're not supposed to access auth context without an ancetor provider for it`);
  }
  return ctx;
};
