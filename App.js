import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

export default function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const allPosts = await res.json();

    setPosts(allPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const SinglePost = ({data: {id, title, body}}) => {
    const [showBodyText, setShowBodyText] = useState(false);

    const toggleBodyText = () => {
      setShowBodyText(prevState => !prevState);
    };

    return (
      <View style={styles.postCard} testID={`postID-${id}`}>
        <Text
          style={styles.postTitle}
          onPress={toggleBodyText}
          testID={`postTitle-${id}`}>
          {title}
        </Text>
        {showBodyText && (
          <Text style={styles.postBody} testID={`postBodyText-${id}`}>
            {body}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="blogTitle">
        My Blog Posts
      </Text>
      <FlatList
        style={styles.postList}
        contentContainerStyle={styles.postListContainer}
        data={posts}
        renderItem={({item}) => <SinglePost data={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  postCard: {
    marginBottom: 15,
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, .3)',
    padding: 5,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    textTransform: 'capitalize',
    color: '#333',
    marginBottom: 7,
    lineHeight: 28,
  },
  postBody: {
    fontSize: 18,
    lineHeight: 22,
  },
  postList: {
    flex: 1,
  },
  postListContainer: {
    paddingHorizontal: 12,
  },
});
