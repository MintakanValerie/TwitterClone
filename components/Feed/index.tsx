import React, {useEffect, useState} from "react";
import { View, FlatList } from "react-native";
import tweets from "../../data/tweet";
import Tweet from "../Tweet";
import {API, graphqlOperation} from "aws-amplify";
import {listTweets} from "../../Users/miaoyuli/TwitterClone/graphql/queries";

const Feed = () => {

  const [tweets, setTweet] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTweets = async () => {
    setLoading(true);
    // get tweets from backend, and set them to state
    try {
      const tweetData = await API.graphql(graphqlOperation(listTweets));
      setTweet(tweetData.data.listTweets.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTweets();
  }, [])

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        data={tweets}
        renderItem={({item}) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchTweets}
      />
    </View>
  );

};

export default Feed;