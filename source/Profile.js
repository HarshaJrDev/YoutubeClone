// ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({ name: '', email: '', image: '' });
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('profile');
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error('Failed to load profile', error);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    try {
      const updatedProfile = { ...profile, name: newName, email: newEmail };
      await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      setEditing(false);
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  const pickImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorCode);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfile((prevProfile) => ({ ...prevProfile, image: source.uri }));
        saveProfile();
      }
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('profile');
      navigation.navigate('Userlogin'); // Adjust the name of your login screen
    } catch (error) {
      console.error('Failed to logout', error);
      Alert.alert('Logout Error', 'There was an issue logging out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          {profile.image ? (
            <Image source={{ uri: profile.image }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.addImageText}>Add Image</Text>
            </View>
          )}
        </TouchableOpacity>

        {editing ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newEmail}
              onChangeText={setNewEmail}
            />
            <TouchableOpacity style={styles.button} onPress={saveProfile}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setEditing(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.profileName}>{profile.name || 'Your Name'}</Text>
            <Text style={styles.profileEmail}>{profile.email || 'Your Email'}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  addImageText: {
    color: '#666',
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#d9534f', // Red color for logout button
    marginTop: 20,
  },
});

export default ProfileScreen;
