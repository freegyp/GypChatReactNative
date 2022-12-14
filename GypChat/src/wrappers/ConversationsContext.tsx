import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import AppLoading from 'expo-app-loading';

import ConversationsAPI from "../api/Conversations";
import { Conversation, Message } from "../models";
import { useAuthRegContext, UserAuthState } from "./AuthContext";

interface ConversationsContextType {
  conversations: Conversation[];
}

export const ConversationsContext = createContext<null | ConversationsContextType>(null);

export const ConversationsContextProvider = (props:{
  children: ReactNode
}) => {
  const { authState, userProfile } = useAuthRegContext();

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (userProfile){
      ConversationsAPI.getConversationsOnce(userProfile.uid)
        .then(res => setConversations(res));

      const subscriber = ConversationsAPI
          .subscribeToConversations(userProfile.uid, (res) => {
            setConversations(res);
          });
      return subscriber;
    }
  }, [userProfile]);

  const contextValue = useMemo(() => ({
    conversations: conversations,
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
