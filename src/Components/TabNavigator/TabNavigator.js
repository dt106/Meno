import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackNavigator,Calendar } from "../StackNavigator/MainStacknavigator";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabNavigator  = ()=>{
    return (
        <Tab.Navigator
        >
            <Tab.Screen 
                name="Main" 
                component={StackNavigator} 
                options={{headerShown:false,
                    tabBarIcon: () => <Image source={require('../../UI/home.png')}></Image>,
                    tabBarShowLabel:false 
                }}
                />
            <Tab.Screen 
                name="Calendar" 
                component={Calendar}
                options={{headerShown:false,
                    tabBarIcon: ()=><Image source={require('../../UI/calendar.png')}/>,
                    tabBarShowLabel:false
                }}
                />
     
        </Tab.Navigator>
    );
};

export default TabNavigator;