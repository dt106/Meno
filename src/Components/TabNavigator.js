import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Task from "../screens/Task";
import { StackNavigator,Calendar } from "./MainStacknavigator";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator  = ()=>{
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Main" 
                component={StackNavigator} 
                options={{headerShown:false,
                    tabBarIcon: () => <Image source={require('../UI/home.png')}></Image>
                }}
                />
            <Tab.Screen 
                name="Calendar" 
                component={Calendar}
                options={{headerShown:false,
                    tabBarIcon: ()=><Image source={require('../UI/calendar.png')}/>
                }}
                />
        </Tab.Navigator>
    );


};

export default TabNavigator;