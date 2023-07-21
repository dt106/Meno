import React from "react";
import { View } from "react-native";
import Home from "../screens/Home";
import { Calendar, StackNavigator } from "./MainStacknavigator";
import TabNavigator from "./TabNavigator";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ()=> {
  return(
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Home"
        component={TabNavigator}
        options={{
          headerShadowVisible:false,
          headerLeftLabelVisible:false,
        }}
        />
      <Drawer.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerShadowVisible:false,
        }}
      />
    </Drawer.Navigator>
  );

};

export default DrawerNavigator;