import React,{useEffect, useRef, useState} from "react";
import { Text, TextInput, View , StyleSheet, Alert, TouchableOpacity, ToastAndroid} from "react-native";
import auth from '@react-native-firebase/auth'

const Log = (email,password, navigation) =>{
    let mess = 'loi';
    if (email === ''|| password === '')
    {
        return(
            console.log("rong")
        )
    }
    else{
        auth()
        .signInWithEmailAndPassword(email,password)
        .then(()=>{navigation.navigate('DrawNavigator')
            ToastAndroid.show("Đăng nhập thành công "+ auth().currentUser.email, ToastAndroid.SHORT);
        })
        .catch((error)=>{
            mess = error.message;
            return console.log(mess);
        }
        )
    }
}
const Login  = ({navigation}) =>{
    useEffect(()=>{
        
    },[navigation]);
    const emailRef = useRef();
    const passwordRef = useRef();
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");

    const handleEmail = (value) =>{
        if (value != '' || value == '')
        {
            SetEmail(value);
        }
    };
    const handlePassword = (value)=>{
        if (value != '' || value == ''){
            SetPassword(value);
        }
    }

    const handlNextPassWord = ()=>{
        passwordRef.current.focus();
    }
    return(
            <View style = {styles.container}>
                <View style={styles.viewtitle}>
                    <Text style={styles.title}>Welcome Back!</Text>
                </View>
                <View style = {styles.inputView}>
                    <TextInput 
                        style  = {styles.inputText} 
                        value={email} 
                        ref={emailRef}
                        returnKeyType="next" 
                        onChangeText={(value)=>{
                            handleEmail(value)
                        }} 
                        onSubmitEditing={handlNextPassWord}
                        placeholder="Email"/>
                </View>
                <View style = {styles.inputView}>
                    <TextInput 
                        style  = {styles.inputText} 
                        value={password} 
                        ref={passwordRef}
                        returnKeyType="done"
                        onChangeText={(value)=>{
                            handlePassword(value)
                        }}  
                        onSubmitEditing={()=>passwordRef.current.blur()}
                        placeholder="Password"/>
                </View>
                <TouchableOpacity   style ={styles.login} onPress={()=>Log(email, password, navigation)} >
                    <Text style ={styles.loginText}  >Log in</Text>
                </TouchableOpacity>
                <View style = {styles.register}> 
                        <Text>Not registered?</Text>
                        <TouchableOpacity onPress={()=>navigation.replace('SignUp')}>
                            <Text style ={styles.signup}>Sign up!</Text>
                        </TouchableOpacity>
                </View>
            </View>
    );
};
const styles = StyleSheet.create({
    viewtitle:{
        width: "90%",
        marginVertical:30
    },
    title:{
        fontSize:25,
        color:"black",
        fontWeight:"bold",
    },
    container:{
        marginTop:50,
        width: "100%",
        justifyContent:"center",
        alignItems:"center"
    },
    inputView:{
        width:"90%",
        backgroundColor:"#DCDCDC",
        borderRadius:10,
        // justifyContent:"center",
        // alignItems:"center",
        marginTop:20
    },
    inputText:{
        height: 40,
        marginLeft: 20
    },
    register:{
        marginTop: 20,
        flexDirection:'row'
    },
    login:{
        marginTop: 30,
        width:"90%",
        backgroundColor:"#000066",
        borderRadius:10,
        height:35,
        justifyContent:"center",
        
        alignItems:"center"
    },
    loginText:{
        fontSize:12,
        color:"white"
    },
    signup:{
        fontWeight: "bold",
        color:"#000080"
    }

});
function Loginaction() {
    Alert.alert("Đăng nhập thành công!");    
}
export default Login;