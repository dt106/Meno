import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity,Text,Image } from "react-native";


const ButtonAdd = ({style})=>{
    const navigation = useNavigation();
    return(
        <TouchableOpacity style = {[style,styles.btnPlus]} onPress={()=>
                navigation.navigate('NewTask', {
                    data:{
                        IdRoute: '',
                        DescriptionRoute: '',
                        TypeRoute: '',
                        DeadlineRoute: '',
                        Status: 1,
                    }
                })} >
            <Image source={require("../../UI/Bg.png")}/>
            <Text style = {styles.plus}>+</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    btnPlus:{
        position: 'absolute',
        width: 48,
        height: 48,
        alignItems:'center',
        justifyContent:'center',
        bottom: 157,
        right: 28,
        zIndex:1,
    },
    plus:{
        position: 'absolute',
        fontSize:20,
        color: "white",
    },

})

export default ButtonAdd;