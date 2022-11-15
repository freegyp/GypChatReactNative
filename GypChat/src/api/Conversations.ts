import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { v4 as uuidv4 } from 'uuid';

const ConversationsAPI = {
  list_reference: (uid) => {
    const collectionRef = firestore().collection("Conversations");

    const ref = collectionRef
                  .orderBy("lastUpdateTime", "desc")
                  .where("user_IDs", "array-contains", uid)
                  .limit(20);

    return ref;
  },
  getConversationsOnce: async (uid) => {
    const ref = this.list_reference(uid);

    const res = await ref.get();

    const conversations = res.docs().map(snapshot => {
      return snapshot.data();
    });

    return conversations;
  },
  subscribeToConversations: (uid, handler) => {
    const ref = this.list_reference(uid);

    const subscriber = ref.onSnapshot(resSnapshot => {
      const conversations = resSnapshot.docs().map(snapshot => {
        return snapshot.data();
      });
      handler(conversations);
    });

    return subscriber;
  },
  conversationMessagesRef: (convPath) => {
    const collectionRef = firestore().collection("Conversations").doc(convPath).collection("Messages");

    const ref = collectionRef.orderBy("date", "desc").limit(20);

    return ref;
  },
  getMessagesOnce: async (convPath) => {
    const ref = this.conversationMessagesRef(convPath);

    const res = await ref.get();

    const messages = res.docs().map(snapshot => {
      return snapshot.data();
    }).reverse();

    return messages;
  },
  subscribeToMessages: (convPath, handler) => {
    const ref = this.conversationMessagesRef(convPath);

    const subscriber = ref.onSnapshot(resSnapshot => {
      const messages = res.docs().map(snapshot => {
        return snapshot.data();
      }).reverse();
      handler(messages);
    });

    return subscriber;
  },
  sendMessage: async (sender_id, receiver_id, messageText) => {
    const msg = {
      msg_id: uuidv4(),
      sender_id: sender_id,
      receiver_id: receiver_id,
      data: new Date(),
      text: messageText,
    };

    await functions().httpsCallable('sendMessage')(msg);
  },
  fetchUserById: async (uid) => {
    const res = await functions().httpsCallable('findUserWithID')({user_id:uid});

    return res.data();
  },
};

export default ConversationsAPI;
