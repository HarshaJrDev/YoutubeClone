import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

// Function to extract YouTube video ID from URL
const getYouTubeId = (url) => {
  const urlParts = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return urlParts[2] !== undefined ? urlParts[2].split(/[^0-9a-z_\-]/i)[0] : url;
};

const VideoPlayer = ({ route }) => {
  const { video } = route.params; // Get video data from route params
  const videoId = getYouTubeId(video.data_url); // Extract video ID from URL

  // Get screen dimensions
  const { height, width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{video.title}</Text>
      <YoutubeIframe
        videoId={videoId}
        height={height} // Set height to the full screen height
        width={width}  // Set width to the full screen width
        play={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background for better video viewing experience
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});

export default VideoPlayer;
