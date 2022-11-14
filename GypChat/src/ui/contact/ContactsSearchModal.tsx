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
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
// import { getHeaderTitle } from '@react-navigation/elements';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";

const styles = StyleSheet.create({
  modalContainer: {
    flexShrink: 1,
    flexDirection: "column",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: "90%",
    minHeight: 120,
    maxHeight: 512,
    borderRadius: 12,
    backgroundColor: "white",
    paddingBottom: 12,
  },
  modalSearchHeader: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
    borderColor: "#aaaaaa",
    paddingHorizontal: 12,
    minHeight: 56,
    width: "100%",
  },
  modalSearchField: {
    flexGrow: 1,
    height: 36,
    marginHorizontal: 6,
    borderWidth: 0.5,
    borderColor: "#aaaaaa",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContactItem: {
    flexDirection: 'row',
    flexShrink: 1,
    minHeight: 72,
    borderBottomWidth: 0.5,
    borderBottomColor: "#cccccc",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  searchContactItemPic: {
    flexShrink: 1,
    minWidth: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: "#aaaaaa",
  },
  searchContactItemText: {
    flexGrow:1,
    flexShrink:1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 12,
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

const SearchContactItem = ({id, name, email}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View
      style={styles.searchContactItem}
    >
      <FastImage
        style={styles.searchContactItemPic}
        source={{uri: profileImagePlaceholderURL}}
      />
      <View style={styles.searchContactItemText}>
        <Text numberOfLines={1}>Name: {name}</Text>
        <Text numberOfLines={1}>Email: {email}</Text>
        <Text numberOfLines={1}>ID: {id}</Text>
      </View>

      <TouchableOpacity
        style={{flexShrink:1, minWidth:24, height:24}}
        activeOpacity={0.6}
        onPress={()=>console.log("Add contact touched!!!")}
      >
        <MaterialIcons name="add-circle-outline" color="purple" size={24} />
      </TouchableOpacity>
    </View>
  </TouchableWithoutFeedback>
);

const ContactsSearchModal = ({showModal,hideAction}) => {
  const [searchText, setSearchText] = React.useState("");

  const renderItem = ({ item }) => (
    <SearchContactItem
      id={item.id} name={item.name} email={item.email}
    />
  );

  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => {
        hideAction();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalSearchHeader}>
          <TextInput
            style={styles.modalSearchField}
            value={searchText}
            onChangeText={setSearchText}
          />
          <Button
            title="Search"
            onPress={()=>console.log("Search button pressed!")}
          />
        </View>

        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 12,
          }}
          style={{
            width:"100%",
          }}
        />
      </View>
    </Modal>
  )
};

export default ContactsSearchModal;
