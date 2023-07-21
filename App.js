import React from "react";
import Signup from "./src/screens/Signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelComeNavigator from "./src/Components/WelcomeNavigator";
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const App = () => {
  return (
    <NavigationContainer>
      <WelComeNavigator/>
   </NavigationContainer>
  );
};

export default App;