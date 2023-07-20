import React from "react";
import { StyleSheet,Text, View,TextInput , FlatList, TouchableOpacity} from "react-native";
import { Dimensions } from 'react-native';
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

const NewTask = ()=>{
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Add New Task</Text>
            <View style ={styles.descibe}>
                <Text>Describe the task</Text>
                <View style = {styles.inputView}>
                    <TextInput style= {styles.textinput} placeholder="Type here..."></TextInput>
                </View>
            </View>
            <View style = {styles.type}>
                <Text>Type</Text>
                <FlatList
                    data={DATA}
                    keyExtractor={item=>item.id}
                    horizontal ={true}
                    renderItem={({item}) =>{
                        return(
                            <Item
                                item={item}
                            />
                        )
                    }}
                />
            </View>
            <View style ={styles.descibe}>
                <Text>Deadline</Text>
                <View style = {styles.inputView}>
                
                </View>
            </View>
            <TouchableOpacity style = {styles.buttonadd}>
                <Text style = {styles.addTitle}>Add the task</Text>
            </TouchableOpacity>
        </View>


    );
}

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container:{
        width: "auto",
        height:HEIGHT,
        backgroundColor:"white"
    },
    title:{
        marginLeft: 30,
        fontSize: 24,
        color:"#403572",
        marginTop: 32,
    },
    descibe:{
        marginLeft: 30,
        marginTop: 32,
    },
    inputView:{
       width: 316,
       height: 49,
       borderColor:"#173147",
       borderWidth: 1,
       borderRadius: 8,
       opacity: 0.7,
       marginTop: 12,
    },
    textinput:{
        marginLeft: 14.5,
        fontSize: 12,
        fontWeight: '400',
    },
    type:{
        marginLeft: 30,
        marginTop: 24,
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
        marginTop: 12,
    },
    tasks:{
        fontSize: 12,
        fontFamily:'Inter',
        color:"#4681A3",
        fontWeight:'800'
    },
    buttonadd:{
        marginLeft: 30,
        marginTop: 30,
        width: 317,
        height: 46,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#4681A3",
        borderRadius: 10,
    },
    addTitle:{
        fontSize: 15,
        fontWeight:'700',
        color:"white",
    }
});

export default NewTask;