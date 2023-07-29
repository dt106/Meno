import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Onboarding from "../../screens/Onboarding";
import { MainNavigator } from "./MainStacknavigator";
import LogNavigator from "./LogNavigator";

const Stack = createNativeStackNavigator();


const WelComeNavigator = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Onboarding" 
                component={Onboarding}
                options={{
                    headerShown:false
                }}    
            />
            <Stack.Screen
                name="Login"
                component={LogNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Main"
                component={MainNavigator}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default WelComeNavigator;