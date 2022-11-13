import { Message, validateMessage } from "./Message";
import { UserProfile } from "./UserProfile";

export type Conversation = {
  user_IDs:[string],
  lastUpdateTime?:number,
  lastMessage?:Message,
};

export type ConversationLocal = {
  myself:UserProfile,
  other:UserProfile,
  lastUpdateTime?:number,
  lastMessage?:Message,
};
