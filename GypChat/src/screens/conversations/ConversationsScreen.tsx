import * as React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
// import { getHeaderTitle } from '@react-navigation/elements';
import FastImage from 'react-native-fast-image';
import AppLoading from 'expo-app-loading';
import { useFonts } from "expo-font";
import { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 72,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginLeft: 8,
    marginRight: 8,
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
    borderWidth: 1,
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
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 12,
    height: 114,
    borderBottomWidth: 1,
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
  }
});

const profileImagePlaceholderURL = "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png";

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

export const ConversationsScreenHeader = () => {
  let [fontsLoaded] = useFonts({
    GreatVibes_400Regular,
  });

  if (!fontsLoaded){
    return <AppLoading />;
  }

  return (
    <View style={styles.header}>
      <FastImage
        style={styles.headerLeftImage}
        source={{uri: profileImagePlaceholderURL}}
      />
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

const ConversationsScreen = ({navigation}) => {
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
    </SafeAreaView>
  );
};

export default ConversationsScreen;
