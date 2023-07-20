import React,{useState} from "react";
import { Text, TextInput, View ,Button, StyleSheet, Alert, Touchable, TouchableOpacity} from "react-native";

const Login  = ({navigation}) =>{
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    return(
            <View style = {styles.container}>
                <View style={styles.viewtitle}>
                    <Text style={styles.title}>Welcome Back!</Text>
                </View>
                <View style = {styles.inputView}>
                    <TextInput style  = {styles.inputText}  placeholder="Email"/>
                </View>
                <View style = {styles.inputView}>
                    <TextInput style  = {styles.inputText}  placeholder="Password"/>
                </View>
                <TouchableOpacity   style ={styles.login} >
                    <Text style ={styles.loginText} onPress={()=>navigation.navigate('GetHome')} >Log in</Text>
                </TouchableOpacity>
                <View style = {styles.register}> 
                        <Text>Not registered?</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
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