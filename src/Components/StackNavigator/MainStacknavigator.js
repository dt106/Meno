import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../../screens/Home";
import Task from "../../screens/Task";
import NewTask from "../../screens/NewTask";
import { Image, TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import DrawerNavigator from "../DrawerNavigator/DrawerNavigator";
import LogNavigator from "./LogNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = ({navigation})=>{
    return (
            <Stack.Navigator>

                <Stack.Screen 
                    name="Home" 
                    component={Home}
                    options={{
                        headerTitleAlign:"center",
                        headerTitleStyle:{fontSize:16},
                        headerShadowVisible:false,
                        headerLeft:()=><TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}>
                                            <Image source={require('../../UI/menu.png')}/>
                                        </TouchableOpacity>
                    }}
                    />
                <Stack.Screen 
                    name="NewTask" 
                    component={NewTask}
                    options={{                        
                        headerTitleAlign: "center",
                        headerTitle:'',
                        headerTitleStyle:{
                            fontSize: 16,
                            
                        }
                    }}
                    
                />
                
            </Stack.Navigator>
    );
}
const Calendar = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Task" 
            component={Task}
            options={{
                headerTitleAlign:"center",
                headerTitleStyle:{fontSize:16},
                headerShadowVisible:false,
                headerLeft:()=><TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}>
                                    <Image source={require('../../UI/menu.png')}/>
                                </TouchableOpacity>

            }}
            />
            
        </Stack.Navigator>
    );
}

const MainNavigator = ({navigation})=>{
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <Stack.Screen
                name="Log"
                component={LogNavigator}

            />
            <Stack.Screen
                name="DrawNavigator"
                component={DrawerNavigator}
            />
            
        </Stack.Navigator>
    )
}

export {StackNavigator, Calendar,MainNavigator};