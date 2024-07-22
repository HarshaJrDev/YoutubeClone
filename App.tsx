// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Navigation/StackNavigation';


const App = () => {
  return (
    <>

      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>



    </>
  );
};

export default App;

const styles = StyleSheet.create({});
