// MainNavigation.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from "../source/Home";
import Userlogin from "../Auth/Userlogin";
import Userregister from "../Auth/Userregister";
import Profile from "../source/Profile";
import Search from "../source/Search";
import VideoPlayerScreen from '../source/VideoPlayerScreen';
import VideoPlayer from '../source/VideoPlayer';

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack for Home and other screens
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        </Stack.Navigator>
    );
}

// Tab Navigator for authenticated users
function TabStack() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'HomeStack') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'account' : 'account-outline';
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

// Stack Navigator for authentication screens
function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Userlogin">
            <Stack.Screen name="Userlogin" component={Userlogin} options={{ headerShown: false }} />
            <Stack.Screen name="Userregister" component={Userregister} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

// Main Navigation
export default function MainNavigation() {
    const [authToken, setAuthToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthToken = async () => {
            const token = await AsyncStorage.getItem('authToken');
            setAuthToken(token);
            setIsLoading(false);
        };

        checkAuthToken();
    }, []);

    if (isLoading) {
        return null; // Optionally render a loading spinner
    }

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {authToken ? (
                    // If authenticated, show TabStack
                    <Stack.Screen name="TabStack" component={TabStack} />
                ) : (
                    // If not authenticated, show AuthStack
                    <Stack.Screen name="AuthStack" component={AuthStack} />
                )}
            </Stack.Navigator>
        </>
    );
}
