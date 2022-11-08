import { Message, validateMessage } from "./Message";

export type Conversation = {
  user_IDs:[string],
  lastUpdateTime:number,
  lastMessage:Message,
};
