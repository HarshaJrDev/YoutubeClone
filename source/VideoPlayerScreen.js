// screens/VideoPlayerScreen.js
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

const VideoPlayerScreen = ({ route }) => {
  const { videoId, description } = route.params; // Extract videoId and description from route.params

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <YoutubePlayer
        height={width * 0.5625} // 16:9 aspect ratio
        play={true}
        videoId={videoId} // Use the videoId
      />
      <Text style={{ marginTop: 20, paddingHorizontal: 20, textAlign: 'center' }}>
        {description} // Display the description
      </Text>
    </View>
  );
};

export default VideoPlayerScreen;
