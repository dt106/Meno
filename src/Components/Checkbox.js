import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";


const CheckBox = ({value, onChange}) =>{
    // const [ischecked, setchecked] = useState(false);
    const handlecheck = () =>{
        onChange(!value);
    }
    return (
        <TouchableOpacity style = {[styles.checkbox,{borderColor:value?"#000080":"black"}]} onPress={handlecheck}>
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
        width:10,
        height:10,
        backgroundColor:"#000080",
        borderRadius:2,
    },
    checkboxunchecked:{
    }
});
export default CheckBox;