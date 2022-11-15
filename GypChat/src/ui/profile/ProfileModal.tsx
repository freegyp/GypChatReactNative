import * as React from 'react';
import {
  SafeAreaView,
  Platform,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
// import { getHeaderTitle } from '@react-navigation/elements';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';
import { useAuthRegContext } from "../../wrappers/AuthContext";

const styles = StyleSheet.create({
  modalContainer: {
    flexShrink: 1,
    flexDirection: "column",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: "90%",
    minHeight: 120,
    borderRadius: 12,
    backgroundColor: "white",
    paddingBottom: 12,
  },
  modalProfileHeader: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderColor: "#aaaaaa",
    paddingHorizontal: 18,
    minHeight: 104,
    width: "100%",
  },
  modalProfileImage: {
    flexShrink: 1,
    minWidth: 80,
    height: 80,
    borderRadius:40,
    borderWidth: 1,
    borderColor: "#aaaaaa",
  },
  modalProfileTexts: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 8,
  },
  modalProfileName: {
    flexShrink: 1,
    minHeight: 32,
    fontSize: 24,
    fontWeight: '400',
    color: "black",
  },
  modalProfileEmail: {
    flexShrink: 1,
    minHeight: 20,
    fontSize: 12,
    fontWeight: '400',
    color: "black",
  },
  modalProfileHint: {
    flexShrink: 1,
    minHeight: 20,
    fontSize: 12,
    fontWeight:'200',
    fontColor:"#bbbbbb",
  },
  modalSectionHeaderText:{
    flexShrink:1,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginVertical:18,
    fontSize:16,
    fontWeight:"500",
    color:"black",
  },
  modalItemLink: {
    flexShrink: 1,
    minHeight: 49,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#aaaaaa",
    marginHorizontal: 12,
  },
  logoutButton: {
    flexShrink: 1,
    width: 271,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 14,
    marginTop: 32,
  },
  editFieldTopBar: {
    flexShrink: 1,
    width: "100%",
    minHeight: 42,
    borderBottomWidth: 0.5,
    borderBottomColor: "#aaaaaa",
    paddingBottom: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

const profileImagePlaceholderURL = "https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-600w-1677509740.jpg";

const MenuButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.modalItemLink}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <Text style={{fontSize:14}}>{title}</Text>
      <Entypo name="chevron-right" color={"black"} size={12} />
    </TouchableOpacity>
  );
};

const ProfileMainView = ({setModalState}) => {
  const { updateProfilePic, userProfile, logOut } = useAuthRegContext();

  const pickImage = async () => {
    const permissionRes = await ImagePicker.getCameraPermissionsAsync();

    if (!permissionRes.granted){
      const reqPermRes = await ImagePicker.requestCameraPermissionsAsync();
      if(!reqPermRes.granted){
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if ((result.assets?.length ?? 0) >= 1){
      const localURI = result.assets[0].uri;
      await updateProfilePic(localURI);
    }
  }

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.modalProfileHeader}
        activeOpacity={0.6}
        onPress={pickImage}
      >
        <FastImage
          style={styles.modalProfileImage}
          source={{uri: userProfile?.photoURL ?? profileImagePlaceholderURL}}
        />
        <View style={styles.modalProfileTexts}>
          <Text style={styles.modalProfileName}>
            { userProfile?.displayName ?? "Unknown name" }
          </Text>
          <Text style={styles.modalProfileEmail} numberOfLines={1}>
            { userProfile?.email ?? "anonymous@unknown.cc" }
          </Text>
          <Text style={styles.modalProfileHint}>
            Tap to change profile photo.
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.modalSectionHeaderText}>
        Account Settings
      </Text>

      <MenuButton title={"Change Name"} onPress={()=>setModalState("change_name")} />
      <MenuButton title={"Change Email"} onPress={()=>setModalState("change_email")} />
      <MenuButton title={"Change Password"} onPress={()=>setModalState("change_password")} />

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.6}
        onPress={logOut}
      >
        <Text style={{fontSize:14, fontWeight:"500"}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const EditTopBar = ({title, setModalState, onSubmit}) => {
  return (
    <View style={styles.editFieldTopBar}>
      <TouchableOpacity
        style={{flexShrink:1, minWidth:16, height: 16}}
        activeOpacity={0.6}
        onPress={()=>setModalState("main")}
      >
        <Entypo name="chevron-left" color={"black"} size={16} />
      </TouchableOpacity>
      <Text style={{flex:1, textAlign:"center",fontSize:16, fontWeight:"500",}}>{title}</Text>
      <TouchableOpacity
        style={{flexShrink:1, minWidth:16, height: 16}}
        activeOpacity={0.6}
        onPress={onSubmit}
      >
        <Text style={{fontSize:12, fontWeight:"300",}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const ChangeNameView = ({setModalState}) => {
  const { updateName } = useAuthRegContext();
  const [ editName, setEditName ] = React.useState("");
  const onSubmit = React.useCallback(async () => {
    await updateName(editName);
    setModalState("main");
  }, [editName, updateName]);

  return (
    <View style={styles.modalContainer}>
      <EditTopBar
        title="Change Name"
        setModalState={setModalState}
        onSubmit={onSubmit}
      />

      <TextInput
        style={{
          alignSelf: 'stretch',
          marginHorizontal: 18,
          marginVertical: 36,
          borderBottomWidth: 1,
          borderBottomColor: "#555555",
          fontSize: 16,
        }}
        onChangeText={setEditName}
        value={editName}
        placeholder="New Name"
      />
    </View>
  );
};

const ChangeEmailView = ({setModalState}) => {
  const { updateEmail } = useAuthRegContext();
  const [ editEmail, setEditEmail ] = React.useState("");
  const onSubmit = React.useCallback(async () => {
    await updateEmail(editEmail);
    setModalState("main");
  }, [editEmail, updateEmail]);

  return (
    <View style={styles.modalContainer}>
      <EditTopBar
        title="Change Email"
        setModalState={setModalState}
        onSubmit={onSubmit}
      />

      <TextInput
        style={{
          alignSelf: 'stretch',
          marginHorizontal: 18,
          marginVertical: 36,
          borderBottomWidth: 1,
          borderBottomColor: "#555555",
          fontSize: 16,
        }}
        onChangeText={setEditEmail}
        value={editEmail}
        placeholder="New Email"
        keyboardType="email-address"
      />
    </View>
  );
};

const ChangePasswordView = ({setModalState}) => {
  const { updatePassword } = useAuthRegContext();
  const [ editPassword, setEditPassword ] = React.useState("");
  const [ editPasswordConfirm, setEditPasswordConfirm ] = React.useState("");
  const onSubmit = React.useCallback(async () => {
    if (editPassword === editPasswordConfirm){
      await updatePassword(editPassword);
      setModalState("main");
    }
  }, [editPassword, updatePassword]);

  return (
    <View style={styles.modalContainer}>
      <EditTopBar title="Change Email" setModalState={setModalState} />

      <TextInput
        style={{
          alignSelf: 'stretch',
          marginHorizontal: 18,
          marginTop: 36,
          borderBottomWidth: 1,
          borderBottomColor: "#555555",
          fontSize: 16,
        }}
        onChangeText={setEditPassword}
        value={editPassword}
        placeholder="Password"
        secureTextEntry
        autoCorrect={false}
      />

      <TextInput
        style={{
          alignSelf: 'stretch',
          marginHorizontal: 18,
          marginTop: 24,
          marginBottom: 36,
          borderBottomWidth: 1,
          borderBottomColor: "#555555",
          fontSize: 16,
        }}
        onChangeText={setEditPasswordConfirm}
        value={editPasswordConfirm}
        placeholder="Confirm Password"
        secureTextEntry
        autoCorrect={false}
      />
    </View>
  );
};

const ProfileModal = ({showModal,hideAction}) => {
  const [modalState, setModalState] = React.useState("main");

  const bodyView = () => {
    if (modalState === "main"){
      return <ProfileMainView setModalState={setModalState} />;
    }else if(modalState === "change_name"){
      return <ChangeNameView setModalState={setModalState} />;
    }else if(modalState === "change_email"){
      return <ChangeEmailView setModalState={setModalState} />
    }else if(modalState === "change_password"){
      return <ChangePasswordView setModalState={setModalState} />;
    }else{
      return <View/>;
    }
  };

  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => {
        setModalState("main");
        hideAction();
      }}
    >
      {bodyView()}
    </Modal>
  )
};

export default ProfileModal;
