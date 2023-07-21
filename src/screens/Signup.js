import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import CheckBox from "../Components/Checkbox";

const Signup = ({navigation,route}) =>{
    const [ischecked, setchecked] = useState(false);
    const handlecheck = () =>{
        setchecked(!ischecked);
    }
    return(
        <View style={styles.container}>
            <View style = {styles.viewtitle}>
                <Text style ={styles.title}>Join the hub!</Text>
            </View>
            <View style={styles.textView}>
                <TextInput style={styles.text} placeholder="First Name"/></View>
            <View style={styles.textView}>
                <TextInput style={styles.text} placeholder="Last Name"></TextInput>
                </View>
            <View style={styles.textView}>
                <TextInput style={styles.text} placeholder="Email"></TextInput>
                </View>
            <View style={styles.textView}>
                <TextInput style={styles.text} placeholder="Password"></TextInput>
                </View>
            <View style={styles.textView}>
                <TextInput style={styles.text} placeholder="Confirm Password"></TextInput>
            </View>
            <View style={styles.checkarea}>
                <CheckBox
                    value={ischecked}
                    onChange={handlecheck}
                />
                <Text style={styles.terms}>I agree to Terms and Conditions and Privacy Policy</Text>
            </View>
                <TouchableOpacity style = {styles.btn}>
                    <Text style = {styles.btnText}>Create account</Text>
                </TouchableOpacity>
            <View style = {styles.Signin}>
                <Text>
                    Already registered? 
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('LogIn')}>
                    <Text style={styles.SigninText}>Sign in!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
    },
    viewtitle:{
        marginVertical:30,
        width:"90%",
    },
    title:{
        fontSize:25,
        color:"black",
        fontWeight:"bold"
    },
    textView:{
        width:"90%",
        height:35,
        backgroundColor:"#DCDCDC",
        borderRadius:10,
        marginVertical:10,
    },
    text:{
        height:40,
        marginLeft:20,
    },
    checkarea:{
        flexDirection:'row',
        alignContent:"center",
        padding:10,
    },
    terms:{
        fontSize:10,
        marginLeft:10
    },
    btn:{
        backgroundColor:"#53868B",
        width:"90%",
        justifyContent:"center",
        alignItems:"center",
        height:40,
        borderRadius:10,
    },
    btnText:{
        color:"white",
        fontWeight:"bold"
    },
    Signin:{
        marginTop:30,
        flexDirection:'row',
    },
    SigninText:{
        fontWeight:"bold",
        color:"#000080"
    }
})

export default Signup;