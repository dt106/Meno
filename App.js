import React from "react";
import Signup from "./src/screens/Signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from "./src/Components/TabNavigator";
import WelComeNavigator from "./src/Components/WelcomeNavigator";
import DrawerNavigator from "./src/Components/DrawerNavigator";
import { View,Text } from "react-native";
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Feed() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed Screen</Text>
      </View>
    );
  }
  
  function Notifications() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications Screen</Text>
      </View>
    );
  }
  
  function Profile() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
  
  const Drawer = createDrawerNavigator();
  
  function MyDrawer() {
    return (
      <Drawer.Navigator  initialRouteName="Feed">
        <Drawer.Screen
          name="Feed"
          component={Feed}
          options={{ drawerLabel: 'Home' }}
        />
        <Drawer.Screen
          name="Notifications"
          component={Notifications}
          options={{ drawerLabel: 'Updates' }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ drawerLabel: 'Profile' }}
        />
      </Drawer.Navigator>
    );
  }


const App = () => {
  return (
    <NavigationContainer>
        <DrawerNavigator/>
   </NavigationContainer>
  );
};

export default App;