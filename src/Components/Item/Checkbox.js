import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";


const CheckBox = ({value, onPress, style}) =>{
    return (
        <TouchableOpacity style = {[style,styles.checkbox,{borderColor:value?"#000080":"black"}]} 
        onPress={onPress} 
        >
            <View style = {value?styles.checkboxchecked:styles.checkboxunchecked}>
            </View>
        </TouchableOpacity>
    )

}
const styles = StyleSheet.create({
    
    checkbox:{
        backgroundColor:"white",
        borderWidth:1.5,
        width: 15,
        height:15,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:3,
    },
    checkboxchecked:{
        width:9,
        height:9,
        backgroundColor:"#000080",
        borderRadius:2,
    },
    checkboxunchecked:{
    }
});
export default CheckBox; 