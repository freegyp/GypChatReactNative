import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { UserProfile } from "../models/UserProfile";

const UserAuthAPI = {
  signUp: async (email, password) => {
    try{
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      throw err.message;
    }
  },
  signIn: async (email, password) => {
    try{
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      throw err.message;
    }
  },
  signOut: async () => {
    await auth().signOut();
  },
  onAuthStateChanged: (changeHandler) => {
    const subscriber = auth().onAuthStateChanged(changeHandler);
    return subscriber;
  },
  updateName: async (name) => {
    try{
      await auth().currentUser?.updateProfile({displayName: name});
    } catch (err){
      throw err.message;
    }
  },
  updateEmail: async (email) => {
    try{
      await auth().currentUser?.updateEmail(email);
    } catch (err) {
      throw err.message;
    }
  },
  updatePassword: async (newPassword) => {
    try{
      await auth().currentUser?.updatePassword(newPassword);
    } catch (err) {
      throw err.message;
    }
  },
  updateProfilePic: async (localURIStr, uid) => {
    try{
      const components = localURIStr.split('/');
      const filename = components[components.length - 1];
      const refPath = `/ProfilePics/${uid}/${filename}`;
      const ref = storage().ref(refPath);
      await ref.putFile(localURIStr);
      const remoteUrl = await ref.getDownloadURL();
      await auth().currentUser?.updateProfile({photoURL: remoteUrl});
      return remoteUrl;
    } catch (err){
      throw err.message;
    }
  },
};

export default UserAuthAPI;
