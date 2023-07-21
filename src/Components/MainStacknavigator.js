import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import { NavigationContainer } from "@react-navigation/native";
import Task from "../screens/Task";
import NewTask from "../screens/NewTask";
import { Image, Text, TouchableOpacity } from "react-native";
import ButtonAdd from "./ButtonAdd";

const Stack = createNativeStackNavigator();

const StackNavigator = ()=>{
    return (
            <Stack.Navigator>
                
                <Stack.Screen 
                    name="Home" 
                    component={Home}
                    options={{
                        headerTitleAlign:"center",
                        headerTitleStyle:{fontSize:16},
                        headerShadowVisible:false,
                        // headerLeft:()=><TouchableOpacity><Image source={require('../UI/menu.png')}/></TouchableOpacity>
                    }}
                    />
                <Stack.Screen name="ButtonAdd" component={ButtonAdd}/>
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
const Calendar = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Task" 
            component={Task}
            options={{
                headerTitleAlign:"center",
                headerTitleStyle:{fontSize:16},
                headerShadowVisible:false,
                // headerLeft:()=><TouchableOpacity><Image source={require('../UI/menu.png')}/></TouchableOpacity>

            }}
            />
        </Stack.Navigator>
    );
}
export {StackNavigator, Calendar};