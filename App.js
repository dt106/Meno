import React from "react";
import Signup from "./src/screens/Signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabNavigator from "./src/Components/TabNavigator";
import WelComeNavigator from "./src/Components/WelcomeNavigator";
import DrawerNavigator from "./src/Components/DrawerNavigator";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      {/* <TabNavigator/> */}
      <WelComeNavigator/>
      {/* <DrawerNavigator/> */}
    </NavigationContainer>
  );
};

export default App;