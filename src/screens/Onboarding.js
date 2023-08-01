/* eslint-disable prettier/prettier */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { View,Text } from 'react-native';
// const database = firebase.firestore();
// const data = database.collection('Task');
const Onboarding = ({navigation}) =>{

    return (
        <View style = {styles.container}>
            <View>
                <Image source={require('../UI/nui.jpeg')}/>
            </View>
            <View style = {styles.box}>
                <Text style ={styles.title1}>Best Task Management App</Text>
                <Text style = {styles.title2}>Get organized by sorting out all your tasks and boost your productivity.</Text>
                <View style = {styles.btn}>
                    <TouchableOpacity   style = {styles.btn1}
                                        onPress={async()=>{
                                            navigation.replace('Main', {screen:'Log'});
                                    }}>
                        <Text style = {styles.btnText}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity   style = {styles.btn2}
                                        onPress={()=>navigation.replace('Main', {screen:'Log', params:{screen:'SignUp'}})}>
                        <Text style = {styles.btnText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        width:'100%',
        position:'relative',
        fontFamily:'Roboto',
    },
    box: {
        position: 'absolute',
        backgroundColor:'white',
        width:'100%',
        left:0,
        top:350,
        right:0,
        bottom:0,
        borderRadius:30,
        flex:1,
        alignItems:'center',
    },
    title1:{
        marginTop:40,
        fontSize:18,
        fontWeight:'bold',
        color:'black',
    },
    title2:{
        marginHorizontal:65,
        textAlign:'center',
        marginVertical:20,
    },
    btn:{
        padding:20,
    },
    btn1:{
        width:250,
        height:35,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom: 15,
        backgroundColor:'#B0C4DE',
    },
    btn2:{
        backgroundColor:'black',
        width:250,
        height:35,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    btnText:{
        color:'white',
        fontWeight:'bold',
    },
});

export default Onboarding;
