import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LogUser } from "./MainStacknavigator";
import Login from "../../screens/Login";
import Signup from "../../screens/Signup";

const Stack = createNativeStackNavigator();

const LogNavigator  = ({navigation}) => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <Stack.Screen
                name="LogIn"
                component={Login}
            />
            <Stack.Screen
                name="SignUp"
                component={Signup}
            />
            
        </Stack.Navigator>
    )
}

export default LogNavigator;