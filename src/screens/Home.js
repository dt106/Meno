import React from 'react';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { Image, TouchableOpacity } from 'react-native';
import {View, StyleSheet, Text} from 'react-native';
import CheckBox from '../Components/Checkbox';
import ButtonAdd from '../Components/ButtonAdd';

const DATA = [
  {
    id: 1, 
    title: "High priority",
    quantity: 3,
  } , 
  {
    id : 2 , 
    title :"Due Deadline",
    quantity: 3,
  },
  {
    id :3,
    title : "Quick Win", 
    quantity:2
  }
];
const Item = ({item,backgroundColor, color})=>(
    <View style = {
        [styles.boxitem,
        {
            backgroundColor:backgroundColor,
            marginHorizontal:(item.id===2)?11:0
        }]}>
        <Text style = {[styles.title, {color : color}]}>{item.title}</Text>
        <Text style = {[styles.quantity,{color:color}]}>{item.quantity}</Text>
    </View>
);

const Home = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <View style = {styles.box}>
                <Text style  = {styles.textDaily}>Daily Tasks:</Text>
                <FlatList 
                    data={DATA}
                    horizontal = {true}
                    keyExtractor={item=> item.id}     
                    renderItem={
                        ({item})=>{
                            const backgroundColor = (item.id === 2 )?"#FFF4F4":"#EEEFF0"
                            const color  = (item.id === 2 )? "red": "#4681A3"
                            return(
                                <Item 
                                item = {item}
                                backgroundColor = {backgroundColor}
                                color={color}
                                title = {item.title}
                                quantity = {item.quantity}
                                />
                                )
                            }
                        }
                    />
                </View>
            <View style = {styles.content}>
                <Text style = {styles.titleContent}>Check all my tasks</Text>
                <Text style = {styles.textContent}>See all tasks and filter them categories you have selected when creating them</Text>
            </View>
            <ButtonAdd></ButtonAdd>
        </View>
        
    );
}
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    navhead:{
        width:"100%",
        height:40,
        backgroundColor:"pink"
    },
    container:{
        width: WIDTH,
        height: HEIGHT,
       backgroundColor:"white"
    },
    box:{
        top:50,
        left: 32,
        marginBottom: 72,
    },
    boxitem: {
        width: 98,
        height: 90,
        borderRadius: 15,
        backgroundColor:"pink",
    },
    textDaily:{
        fontSize:24,
        marginBottom:15,
        color: "#403572",
        fontWeight:'300',
    },
    task:{
        marginLeft:32,
        marginTop: 81,
    },
    title:{
        margin: 12, 
        fontSize: 10,
        color:"red",
    },
    quantity:{
        fontSize: 28,
        marginLeft: 12,
        color: "red"
    },

    content:{
        width: 315,
        height: 105,
        marginTop:30,
        left: 32,
        padding: 22,
        borderRadius: 20,
        backgroundColor:"#EEEFF0"
    },
    titleContent:{
        color: "#483572",
        fontSize: 16,
        fontWeight: '400',
    },
    textContent:{
        color: "#483572",
        fontFamily:'Roboto',
        fontSize: 12,
        fontStyle:'normal',
        fontWeight:'400',
        marginTop: 12,
        opacity: 0.5,
    },
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
    navbar:{
        position:'absolute',
        justifyContent:'space-around',
        alignItems:'center',
        width: WIDTH,
        height: 60,
        flexDirection:'row',
        marginBottom:0,
        elevation: 1,
        bottom: 0
    }
});

export default Home;
