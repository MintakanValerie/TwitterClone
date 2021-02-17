import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
  },
  tweetHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tweetHeaderNames: {
    flexDirection: 'row',
  },
  name: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  username: {
    marginRight: 10,
    color: 'grey'
  },
  createdAt: {
    marginRight: 10,
    color: 'grey'
  },
  content: {
    marginTop: 5,
    lineHeight: 18,

  },
  image: {
    marginVertical: 10,
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
    overflow: 'hidden'
  },
})

export default styles;