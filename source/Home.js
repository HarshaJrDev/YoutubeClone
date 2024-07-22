
import 'react-native-url-polyfill/auto';
import React, { useState, useEffect,useContext } from 'react';
 import {
   Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
   Button, Dimensions, FlatList,TextInput
 } from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import YoutubeIframe from 'react-native-youtube-iframe';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation ,useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoData } from '../source/videoSlice'; 

import { createClient } from '@supabase/supabase-js';
// Initialize Supabase client
const supabaseUrl = 'https://ljyipweointieptchztj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeWlwd2VvaW50aWVwdGNoenRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0ODEzMjAsImV4cCI6MjAzNzA1NzMyMH0.ND6c5Jhb3H79cBIvMknFup47-p07zb1DCRHfUO0rIog';
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const Home = () => {


  const dispatch = useDispatch();
  const navigation = useNavigation();
  const videoData = useSelector((state) => state.videos.videoData);
  const { height, width } = Dimensions.get('screen');

  useEffect(() => {
    const fetchKidsVideoData = async () => {
      try {
        let { data, error } = await supabase
          .from('YoutubeVideoData')
          .select('*');

        if (error) {
          console.error('Error fetching data:', error);
          return;
        }

        dispatch(setVideoData(data));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchKidsVideoData();
  }, [dispatch]);


  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign-out error:', error.message);
    } else {
      navigation.replace('Userlogin'); // Navigate to login screen after sign-out
    }
  };
  const getYouTubeId = (url) => {
    const urlParts = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return urlParts[2] !== undefined ? urlParts[2].split(/[^0-9a-z_\-]/i)[0] : url;
  };

  const getThumbnailUrl = (videoId) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handleThumbnailPress = (video) => {
    navigation.navigate('VideoPlayer', { video });
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

      <View style={styles.header}>
        <Image style={{ height: height * 0.04, width: width * 0.1 }} source={require('../Images/youtube.png')} />
        <TouchableOpacity onPress={handleSignOut}>
        <Text style={styles.headerText}>YouTube</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={{ marginLeft: 'auto' }}
          onPress={() => navigation.navigate('Search')}
        >
          <Feather name={'search'} size={27} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={videoData}
        renderItem={renderData}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  headerText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    fontWeight: 'bold',
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});

export default Home;
