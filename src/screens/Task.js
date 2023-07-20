import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import CheckBox from "../Components/Checkbox";
import ButtonAdd from "../Components/ButtonAdd";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const DATA = [

    {
        id : 1 ,
        title : 'Quick Task',
    },
    {
        id  : 2,
        title: 'Urgent',
        backgroundColor:"#EEEFF0",
        
    },
    {
        id : 3,
        title:'Important'
    },
    {
        id: 4,
        title:'No Activity'
    }

]

const Item = ({item})=>(
    <View style = {[
        styles.boxitem,
        {
            backgroundColor:item.backgroundColor,
            borderWidth:item.id===2?0:1
        }
        ]}>
        <Text style = {styles.tasks}>{item.title}</Text>
    </View>
)
const dataCheckbox =  [
    {
        id :1,
        title:'Follow Oluwafisayomi.dev on Twitter.'
    },
    {
        id :2,
        title:'Learn Figma by 4pm.'
    },
    {
        id :3,
        title:'Coding at 9am.'
    },
    {
        id :4,
        title:'Watch Mr Beasts Videos.'
    },
    {
        id :5,
        title:'Define my morning routine'
    },
]
const CheckBoxItem = ({item})=>(
    <View style = {styles.checkView}>
        <CheckBox
        />
        <Text style = {styles.textContent}>{item.title}</Text>
    </View>
) 
const Task = ({navigation})=>{
    // const [ischecked, setchecked] = useState(false);
    // const handlecheck = () =>{
    //     setchecked(!ischecked);
    // }
    return (
        <View style = {styles.container}>
            <View style= {styles.titleView}>
                <Text style={styles.title}>To do Tasks</Text>
            </View>
            <View style = {styles.listbox}>
                <FlatList
                    data={DATA}
                    horizontal={true}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=>{
                        return(
                            <Item
                                item={item}     
                            />
                        )
                    }}
                />
            </View>
            <View style = {styles.listcheck}>
                <FlatList
                    data={dataCheckbox}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=>{
                        return(
                            <CheckBoxItem
                                item={item}
                            />
                        )
                    }}
                />  
            </View>
            <ButtonAdd/>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor:"white"
    },
    titleView:{
        marginTop:32,
        marginLeft:32,
    },
    title:{
        color:"#403572",
        fontSize: 24,
        fontWeight: '300',
    },
    listbox:{
        marginLeft: 32,
        marginTop: 66,
    },
    boxitem:{
        width: 95,
        height: 37,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"#4681A3",
        opacity: 0.6,
        marginRight: 10,
        borderRadius: 8,
        justifyContent:"center",
        alignItems: "center",
    },
    tasks:{
        fontSize: 12,
        fontFamily:'Inter',
        color:"#4681A3",
        fontWeight:'800'
    },
    listcheck:{
        marginTop: 30,  
    },
    checkView:{
        marginLeft: 32,
        flexDirection:'row',
        marginBottom: 15,
        alignItems:"center",
    },
    textContent:{
        fontSize: 13,
        marginLeft: 13,
        fontWeight:'500',
        // textDecorationLine:'line-through'
    },
})


export default Task;