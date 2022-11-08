import { validateUrl } from "./shared";

export type Message = {
  msg_id:string,
  sender_id:string,
  receiver_id:string,
  date:number,
  text:string,
  imageURL?:string,
};

export const validateMessage:((message:Message)=>void) = (message:Message) => {
  if (message.msg_id.length === 0){
    throw "Empty message id!";
  }

  if (message.sender_id.length === 0){
    throw "Empty sender user id!";
  }

  if (message.receiver_id.length === 0){
    throw "Empty receiver user id!";
  }

  if (message.date <= 0){
    throw "Invalid date!";
  }

  if (message.text.length === 0){
    throw "Message text cannot be empty!";
  }

  if (message.imageURL && !validateUrl(message.imageURL!)){
    throw "Invalid image URL!";
  }
}
