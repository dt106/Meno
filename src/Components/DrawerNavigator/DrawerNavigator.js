import React from "react";
import { Calendar } from "../StackNavigator/MainStacknavigator";
import TabNavigator from "../TabNavigator/TabNavigator";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Privacy from "../../screens/Privacy";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Term from "../../screens/Term";
import auth from '@react-native-firebase/auth'
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();



const DrawerNavigator = ()=> {
  const navigation = useNavigation();
  const HandleLogOut = () =>{
    auth()
    .signOut()
    .then(() =>{
      navigation.reset({
        index: 0,
        routes: [{name:'Main'}]
      });
      console.log('Logout SuccessFull')
    })
    .catch((error)=> console.log(error.message))

    
  }
  return(
    <Drawer.Navigator
    
    >
      
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
        component={Term}
        options={{
          headerTitleAlign:"center",
          headerTitleStyle:{fontSize: 15,
          },
          headerShadowVisible:false,
        }}
      />
      <Stack.Screen
        name="Log Out"
        component={HandleLogOut}
        options={{
          headerShown:false
        }}
      />

    </Drawer.Navigator>
  );

};

export default DrawerNavigator;