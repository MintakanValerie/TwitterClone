import * as React from 'react';
import {StyleSheet, TouchableOpacity, SafeAreaView, Platform, TextInput} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Tweet from "../components/Tweet";
import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";
import { AntDesign } from "@expo/vector-icons";

import tweets from "../data/tweet";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import {useState} from "react";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {createTweet} from "../Users/miaoyuli/TwitterClone/graphql/mutations";
import {useNavigation} from "@react-navigation/native";

export default function NewTweetScreen() {

  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigation = useNavigation();

  const onPostTweet = async () => {
    try {

      const currentUser = await Auth.currentAuthenticatedUser({bypassCache: true});

      const newTweet = {
        content: tweet,
        image: imageUrl,
        userID: currentUser.attributes.sub
      }
      await API.graphql(graphqlOperation(createTweet, { input: newTweet }))
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name={"close"} size={30} color={Colors.light.tint} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPostTweet}>
            <Text style={styles.buttonText}>Tweet</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newTweetContainer}>
          <ProfilePicture image={'https://pbs.twimg.com/media/EuTok_hU4AAzixG?format=jpg&name=large'}/>
          <View style={styles.inputsContainer}>
            <TextInput
              value={tweet}
              onChangeText={(value) => setTweet(value)}
              multiline={true}
              numberOfLines={3}
              style={styles.tweetInput}
              placeholder={"What is happening?"}
            />
            <TextInput
              value={imageUrl}
              onChangeText={(value) => setImageUrl(value)}
              style={styles.imageInput}
              placeholder={"Image url (optional)"}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 10 : 0
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  newTweetContainer: {
    flexDirection: 'row',
    padding: 15
  },
  inputsContainer: {
    marginLeft: 10,
  },
  tweetInput: {
    maxHeight: 100,
    height: 200,
    textAlignVertical: "top", //Android
    fontSize: 20
  },
  imageInput: {

  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
