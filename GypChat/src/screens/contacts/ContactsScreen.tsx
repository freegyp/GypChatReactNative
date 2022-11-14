import * as React from 'react';
import {
  SafeAreaView,
  Platform,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
// import { getHeaderTitle } from '@react-navigation/elements';
import FastImage from 'react-native-fast-image';
import AppLoading from 'expo-app-loading';
import { useFonts } from "expo-font";
import { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';

import ContactsSearchModal from "../../ui/contact/ContactsSearchModal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactItem: {
    height: 48,
    borderBottomWidth: 0.5,
    borderBottomColor: "#cccccc",
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactProfilePic: {
    flexShrink: 1,
    minWidth: 32,
    height: 32,
    borderRadius: 16,
    borderColor: '#cccccc',
  },
  profileImage: {
    flexShrink: 1,
    minWidth: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: "#aaaaaa",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 18,
    paddingBottom: 8,
    height: Constants.statusBarHeight + 48,
    borderBottomWidth: 0.5,
    borderBottomColor: "#cccccc",
  },
  headerLeftText: {
    flexShrink: 1,
    color: "purple",
    fontFamily: "GreatVibes_400Regular",
    fontSize: 18,
  },
  headerRightIcon: {
    flexShrink: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

const profileImagePlaceholderURL = "https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-600w-1677509740.jpg";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: "Jamie",
    email: "jamie@gmail.com",
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: "Andrew",
    email: "andrewandrew@someemailservice.com",
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: "Sabastian",
    email: "sabastian@shutterstock.net",
  },
];

const ContactItem = ({name, onPress}) => (
  <TouchableOpacity
    style={styles.contactItem}
    activeOpacity={0.6}
    onPress={onPress}
  >
    <FastImage
      style={styles.contactProfilePic}
      source={{uri: profileImagePlaceholderURL}}
    />
    <View style={{flexShrink: 1, flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{fontSize:14, marginRight: 8,}}>{name}</Text>
      <Entypo name="chevron-right" color={"black"} size={16} />
    </View>
  </TouchableOpacity>
);

export const ContactsScreenHeader = ({rightAction}) => {
  let [fontsLoaded] = useFonts({
    GreatVibes_400Regular,
  });

  if (!fontsLoaded){
    return <AppLoading />;
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerLeftText}>GypChat</Text>
      <TouchableOpacity
        style={styles.headerRightIcon}
        activeOpacity={0.6}
        onPress={rightAction}
      >
        <MaterialIcons name="add-circle-outline" color="purple" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const ContactsScreen = ({showModal, hideAction}) => {
  const renderItem = ({ item }) => (
    <ContactItem
      name={item.name}
      onPress={()=>console.log(item.name)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <ContactsSearchModal
        showModal={showModal}
        hideAction={hideAction}
      />
    </SafeAreaView>
  );
};

export default ContactsScreen;
