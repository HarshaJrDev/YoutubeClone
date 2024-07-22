import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const Userlogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-in and sign-up

    const handleAuth = async () => {
        if (isSignUp) {
            // Handle Sign Up
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                Alert.alert('Sign Up Error', error.message);
            } else {
                Alert.alert('Sign Up Successful', 'Please verify your email to complete the registration.');
                setIsSignUp(false); // Switch to sign-in mode after successful sign-up
            }
        } else {
            // Handle Sign In
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                Alert.alert('Login Error', error.message);
            } else {
                const token = data.session.access_token; // Use access_token if available
                await AsyncStorage.setItem('authToken', token);
                navigation.replace('Home',{email}); // Redirect to Home after login
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleAuth}
            >
                <Text style={styles.buttonText}>
                    {isSignUp ? 'Sign Up' : 'Login'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsSignUp(!isSignUp)}
            >
                <Text style={styles.switchButtonText}>
                    {isSignUp ? 'Already have an account? Log in' : 'Need an account? Sign up'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007bff', // Example color, change as needed
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    switchButton: {
        alignItems: 'center',
        marginVertical: 10,
    },
    switchButtonText: {
        color: '#007bff',
        fontSize: 16,
    },
});

export default Userlogin;
