import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
// Initialize Supabase
const supabaseUrl = 'https://ljyipweointieptchztj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeWlwd2VvaW50aWVwdGNoenRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0ODEzMjAsImV4cCI6MjAzNzA1NzMyMH0.ND6c5Jhb3H79cBIvMknFup47-p07zb1DCRHfUO0rIog';
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {

    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const SearchScreen = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let { data, error } = await supabase
          .from('YoutubeVideoData') // Replace with your actual table name
          .select('*');

        if (error) {
          console.error('Error fetching data:', error);
          return;
        }

        setVideos(data);
        setFilteredVideos(data); // Initialize filteredVideos with the fetched data
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const getYouTubeId = (url) => {
    const urlParts = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return urlParts[2] !== undefined ? urlParts[2].split(/[^0-9a-z_\-]/i)[0] : url;
  };

  const getThumbnailUrl = (videoId) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handleSearch = () => {
    if (searchQuery === '') {
      setFilteredVideos(videos);
    } else {
      const filteredData = videos.filter((video) => {
        const title = video.tittle || ''; // Default to an empty string if title is undefined
        return title.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredVideos(filteredData);
    }
  };

  const handleThumbnailPress = (video) => {
    navigation.navigate('VideoPlayer', { video, }); // Navigate to the VideoPlayer screen with video data
  };

  const renderData = ({ item }) => {
    const videoId = getYouTubeId(item.data_url);
    const thumbnailUrl = getThumbnailUrl(videoId);

    return (
      <TouchableOpacity onPress={() => handleThumbnailPress(item)}>
        <View style={styles.itemContainer}>
          <FastImage
            style={styles.thumbnail}
            source={{ uri: thumbnailUrl }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.title}>{item.tittle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{
        display: "flex",

      }}>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.goBack('Home')} />
        </TouchableOpacity>
        <View style={{
          display: "flex", flexDirection: "row", height: 40,
          borderColor: '#ddd',
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginBottom: 20,
          gap: 10
        }}>
          <TextInput

            placeholder="Search videos..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

      </View>


      <FlatList
        data={filteredVideos}
        renderItem={renderData}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SearchScreen;