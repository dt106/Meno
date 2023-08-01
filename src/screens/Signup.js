/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CheckBox from '../Components/Item/Checkbox';
import auth from '@react-native-firebase/auth';
import UserDB from '../Database/UserDB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import Storage from '../services/AsyncStorage/store';


//Database
const User = new UserDB();
const Info = new Storage();
//

const Sign = async(firstName, lastName, email, password,repass, ischecked)=>{
    console.log(firstName, lastName, email, password, repass, ischecked);
    let result = 0;
    if (firstName === '' || lastName === '' || email === '' || password === '')
    {
        ToastAndroid.show('Thiếu dữ liệu', ToastAndroid.SHORT);

    }
    else {
        if (ischecked === true)
        {
            if (repass !== password){
                ToastAndroid.show('Mật khẩu xác thực không đúng', ToastAndroid.SHORT);
            }
            else {
                try {
                   await auth()
                    .createUserWithEmailAndPassword(email, password);
                    result = 2;
                }
                catch (e){
                    result = -99;
                }
                if (result === 2){
                    result = await User.Add(firstName,lastName,email, password);
                    if (result === 1){
                        ToastAndroid.show(`Add user for ${firstName} scuccessfull`, ToastAndroid.SHORT);
                    }
                }
                else {
                    ToastAndroid.show(`Add user for ${firstName} failed`, ToastAndroid.SHORT);
                }
            }
        }
        else {
            ToastAndroid.show('Đồng ý điều khoản', ToastAndroid.SHORT);
        }
    }
    return result;
};


const Signup = ({navigation,route}) =>{
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [repass, setRepass] = useState('');
    const [ischecked, setchecked] = useState(false);
    //useRef
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const repassRef = useRef();

    const handlecheck = () =>{
        setchecked(!ischecked);
    };

    const handlefirstName = (value) =>{
        setfirstName(value);
    };
    const handlelastName = (value) =>{
        setlastName(value);
    };
    const handleEmail = (value)=>{
        SetEmail(value);
    };
    const handlePassword = (value)=>{
        SetPassword(value);
    };
    const handleRepass = (value) =>{
        setRepass(value);
    };
    const handlenextlastName = () =>{
        lastNameRef.current.focus();
    };
    const handlenextemail = () =>{
        emailRef.current.focus();
    };
    const handlenextpw = () => {
        passwordRef.current.focus();
    };
    const handlenextrepass = () =>{
        repassRef.current.focus();
    };
    // const saveLoginInfo = async(email, password) => {
    //     try {
    //         await AsyncStorage.setItem('email', email);
    //         await AsyncStorage.setItem('password', password);
    //         console.log('Thông tin đã được lưu.');
    //     }
    //     catch (e) {
    //         console.log(e.message);
    //     }
    // };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'?'padding':'height'}
            style = {{flex: 1}}
        >

        <View style={styles.container}>
            <View style = {styles.viewtitle}>
                <Text style ={styles.title}>Join the hub!</Text>
            </View>
            <View style={styles.textView}>
                <TextInput ref={firstNameRef} returnKeyType="next" onSubmitEditing={handlenextlastName} style={styles.text} value={firstName} onChangeText={(value)=>{handlefirstName(value);}} placeholder="First Name"/></View>
            <View style={styles.textView}>
                <TextInput ref={lastNameRef} returnKeyType='next' onSubmitEditing={handlenextemail} style={styles.text} value={lastName} onChangeText={(value)=>{handlelastName(value);}} placeholder="Last Name" />
                </View>
            <View style={styles.textView}>
                <TextInput ref={emailRef} returnKeyType='next' onSubmitEditing={handlenextpw} style={styles.text} value={email} onChangeText={(value) =>{handleEmail(value);}} placeholder="Email" />
                </View>
            <View style={styles.textView}>
                <TextInput ref={passwordRef} returnKeyType='next' onSubmitEditing={handlenextrepass} style={styles.text} value={password} onChangeText={(value) =>{handlePassword(value);}} placeholder="Password" />
                </View>
            <View style={styles.textView}>
                <TextInput ref={repassRef} style={styles.text} value={repass} onChangeText={(value)=>{handleRepass(value);}} placeholder="Confirm Password" />
            </View>
            <View style={styles.checkarea}>
                <CheckBox
                    value={ischecked}
                    onPress={handlecheck}
                />
                <Text style={styles.terms}>I agree to <Text style = {{fontWeight:'800'}} >Terms</Text> and <Text style = {{fontWeight:'800'}}>Conditions and Privacy Policy</Text></Text>
            </View>
                <TouchableOpacity style = {styles.btn} onPress={async()=>{
                    const result = await Sign(firstName, lastName, email, password,repass, ischecked);
                    if (result === 1){
                        Info.SaveInfo(email, password);
                        setfirstName('');
                        setlastName('');
                        SetEmail('');
                        SetPassword('');
                        setRepass('');
                        setchecked(false);
                    }
                }}>
                    <Text style = {styles.btnText} >Create account</Text>
                </TouchableOpacity>
            <View style = {styles.Signin}>
                <Text>
                    Already registered?
                </Text>
                <TouchableOpacity onPress={()=>navigation.replace('LogIn')}>
                    <Text style={styles.SigninText}>Sign in!</Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingView>
    );
};



const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems:'center',
        flex:1,
    },
    viewtitle:{
        marginVertical:30,
        width:'90%',
    },
    title:{
        fontSize:25,
        color:'black',
        fontWeight:'bold',
    },
    textView:{
        width:'90%',
        height:35,
        backgroundColor:'#DCDCDC',
        borderRadius:10,
        marginVertical:10,
    },
    text:{
        height:40,
        marginLeft:20,
    },
    checkarea:{
        flexDirection:'row',
        alignContent:'center',
        padding:10,
    },
    terms:{
        fontSize:10,
        marginLeft:10,
    },
    btn:{
        backgroundColor:'#53868B',
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        borderRadius:10,
    },
    btnText:{
        color:'white',
        fontWeight:'bold',
    },
    Signin:{
        marginTop:30,
        flexDirection:'row',
    },
    SigninText:{
        fontWeight:'bold',
        color:'#000080',
    },
});

export default Signup;
