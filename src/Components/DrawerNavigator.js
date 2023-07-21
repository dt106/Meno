import React from "react";
import { Image, View } from "react-native";
import Home from "../screens/Home";
import { Calendar, StackNavigator } from "./MainStacknavigator";
import TabNavigator from "./TabNavigator";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from "../screens/Login";
import WelComeNavigator from "./WelcomeNavigator";
import Privacy from "../screens/Privacy";
import Term from "../screens/Term";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../screens/Signup";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const DrawerNavigator = ()=> {
  return(
    <Drawer.Navigator>
      
      <Drawer.Screen 
        name="Home"
        component={TabNavigator}
        options={{
          headerShadowVisible:false,
          headerShown:false,
        }}
        />
      <Drawer.Screen
        name="Tasks"
        component={Calendar}
        options={{
          headerShadowVisible:false,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={Privacy}
        options={{
          headerTitleAlign:"center",
          headerTitleStyle:{fontSize: 15,
          },
          headerShadowVisible:false,
        }}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={Terms}
        options={{
          headerTitleAlign:"center",
          headerTitleStyle:{fontSize: 15,
          },
          headerShadowVisible:false,
        }}
      />
      <Drawer.Screen
        name="Log Out"
        component={WelComeNavigator}
        options={{
          headerShown:false
        }}
      />

    </Drawer.Navigator>
  );

};

export default DrawerNavigator;