import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { v4 as uuidv4 } from 'uuid';

const ContactsAPI = {
  list_reference: (uid) => {
    const ref = firestore().collection("Contacts").doc(uid);

    return ref;
  },
  getFriendlistOnce: async (uid) => {
    const ref = this.list_reference(uid);

    await res = ref.get();

    if (res.exists){
      const data = res.data();

      return data.friendIDs ?? [];
    }

    return [];
  },
  subscribeToFriendlist: (uid, handler) => {
    const ref = this.list_reference(uid);

    const subscriber = ref.onSnapshot(snapshot => {
      const data = snapshot.data();

      handler(data?.friendIDs ?? []);
    });

    return subscriber;
  },
  removeContact: async (uid, friend_uid) => {
    const ref = this.list_reference(uid);

    const oldList = await this.getFriendlistOnce(uid);

    if (oldList.includes(friend_uid)){
      const newList = oldList.filter(_id => _id !== friend_uid);

      ref.set({friendIDs: newList, uid: uid});
    }
  },
  addContact: async (uid, friend_uid) => {
    const ref = this.list_reference(uid);

    const oldList = await this.getFriendlistOnce(uid);

    if (!oldList.includes(friend_uid)){
      let newList = oldList;

      newList.push(friend_uid);

      ref.set({friendIDs: newList, uid: uid});
    }
  },
  searchUser: async (email) => {
    const res = await functions().httpsCallable('findUser')({user_email:email});

    return res.data();
  },
  fetchProfiles: async (uid, friendlist) => {
    const res = await functions().httpsCallable('getProfiles')({uid:uid, friendIDs:friendlist});

    const data = res.data();

    return data.found ?? [];
  },
};

export default ContactsAPI;
