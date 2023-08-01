import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NewTask from './src/screens/NewTask';
import Task from './src/screens/Task';
import WelComeNavigator from './src/Components/StackNavigator/WelcomeNavigator';
import ConnectionStatus from './src/screens/FireBase/Demo';
import MyComponent from './src/screens/FireBase/Demo';
import Home from './src/screens/Home';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        {/* <MyComponent/> */}
        <WelComeNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
