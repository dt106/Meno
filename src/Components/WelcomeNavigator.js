import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const WelComeNavigator = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Onboarding" 
                component={Onboarding}
                options={{
                    headerShown:false,
                }}    
            />
            <Stack.Screen 
                name="LogIn"
                component={Login}
                options={{
                    headerShown:false,
                }}    
            />
            <Stack.Screen
                name="SignUp"
                component={Signup}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="GetHome"
                component={TabNavigator}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default WelComeNavigator;