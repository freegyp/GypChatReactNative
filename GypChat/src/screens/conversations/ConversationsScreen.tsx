import * as React from 'react';
import {
  SafeAreaView,
  Platform,
  View,
  Text,
  Button,
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
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";

import ProfileModal from "../../ui/profile/ProfileModal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 72,
    borderBottomWidth: 0.5,
    borderBottomColor: "#cccccc",
    marginHorizontal: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileImage: {
    flexShrink: 1,
    minWidth: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: "#aaaaaa",
  },
  msgText: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 12,
    marginRight: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 18,
    paddingBottom: 12,
    height: Platform.OS === "ios" ? 114 : 64,
    borderBottomWidth: 0.5,
    borderBottomColor: "#cccccc",
  },
  headerLeftImage: {
    flexShrink: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerRightText: {
    flexShrink: 1,
    color: "purple",
    fontFamily: "GreatVibes_400Regular",
    fontSize: 18,
  },
});

const profileImagePlaceholderURL = "https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-600w-1677509740.jpg";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: "Jamie",
    lastMsg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: "Andrew",
    lastMsg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: "Sabastian",
    lastMsg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
];

export const ConversationsScreenHeader = ({leftAction}) => {
  let [fontsLoaded] = useFonts({
    GreatVibes_400Regular,
  });

  if (!fontsLoaded){
    return <AppLoading />;
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerLeftImage}
        activeOpacity={0.6}
        onPress={leftAction}
      >
        <FastImage
          style={styles.headerLeftImage}
          source={{uri: profileImagePlaceholderURL}}
        />
      </TouchableOpacity>
      <Text style={styles.headerRightText}>GypChat</Text>
    </View>
  );
};

const ConversationItem = ({ name, lastMsg, onPress }) => (
  <TouchableOpacity
    style={styles.item}
    activeOpacity={0.6}
    onPress={onPress}
  >
    <FastImage
      style={styles.profileImage}
      source={{uri: profileImagePlaceholderURL}}
    />
    <View style={styles.msgText}>
      <View style={{flexDirection: 'row',alignItems: "flex-start", marginBottom: 4}}>
        <Text
          numberOfLines={1}
          style={{flex:1, fontSize:18, fontWeight:'400'}}
        >{name}</Text>
      </View>
      <View style={{flexDirection: 'row',alignItems: "flex-start",height:18}}>
        <Text
          numberOfLines={1}
          style={{flex:1, fontSize:12, fontWeight:'200', fontColor:"#bbbbbb"}}
        >{lastMsg ?? ""}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ConversationsScreen = ({navigation, showModal, hideAction}) => {
  const goToDetail = React.useCallback((id, name) => {
    navigation.push("ConversationDetail", {id:id, name:name});
  }, []);

  const renderItem = ({ item }) => (
    <ConversationItem
      name={item.name}
      lastMsg={item.lastMsg}
      onPress={()=>goToDetail(item.id, item.name)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      <ProfileModal
        showModal={showModal}
        hideAction={hideAction}
      />
    </SafeAreaView>
  );
};

export default ConversationsScreen;
