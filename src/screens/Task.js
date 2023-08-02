/* eslint-disable prettier/prettier */
import React, { memo, useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CheckBox from '../Components/Item/Checkbox';
import ButtonAdd from '../Components/Item/ButtonAdd';
import TaskDB from '../Database/TaskDB';
import {  firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



const Taskdb = new TaskDB();

const DATA = [

    {
        id : 1 ,
        title : 'Quick Task',
    },
    {
        id  : 2,
        title: 'Urgent',
    },
    {
        id : 3,
        title:'Important',
    },
    {
        id: 4,
        title:'No Activity',
    },
];

const Item = ({item, onPress, style})=>(
    <TouchableOpacity onPress={onPress} style = {style}>
        <Text style = {styles.tasks}>{item.title}</Text>
    </TouchableOpacity>
);

const CheckBoxItem =  ({item, value, onPress, ShowUpdate, Delete})=>{
        const datetime = new Date(item.Deadline);
        const Year = datetime.getFullYear();
        const Month = String(datetime.getMonth() + 1).padStart(2, '0');
        const Day = String(datetime.getDate()).padStart(2, '0');
        const Hour = String(datetime.getHours()).padStart(2, '0');
        const Minute = String(datetime.getMinutes()).padStart(2, '0');
        const textFormat = `${Day}-${Month}-${Year} ${Hour}:${Minute}`;
    return(
    <View style = {styles.checkView}>
        <CheckBox
            value={value}
            onPress={onPress}
            style={styles.checkbox}
        />
        <View style = {styles.checkcontent}>
            <TouchableOpacity onPress={ShowUpdate}>
                <Text style = {[styles.textContent, {textDecorationLine:value ? 'line-through' : 'none'}]}>{item.Description}</Text>
            </TouchableOpacity>
            <Text style= {styles.date}>{textFormat}</Text>
        </View>
        <TouchableOpacity onPress={()=>Alert.alert('Xác nhận',
  'Bạn có chắc chắn muốn thực hiện hành động này?',
  [
    {
      text: 'Hủy',
      style: 'cancel',
    },
    {
      text: 'Xác nhận',
      onPress: 
        Delete
    
    },
  ],)} >
            <Image style = {styles.iconremove} source={require('../UI/remove.png')}/>
        </TouchableOpacity>
    </View>
)};

const Task = ({navigation})=>{
    const [option, setoption] = useState(1);
    const [TypeText, setTypeText] = useState('Quick Task');
    const [Types,setType] = useState([]);

    function handleShowUpdate({Id, Description, Type, Deadline}){

        navigation.navigate('NewTask', {
           data:{

               IdRoute: Id,
               DescriptionRoute: Description,
               TypeRoute: Type,
               DeadlineRoute: Deadline,
               Status: 2,
            },

           } );
    }

    async function handleDelete(Id){
        const result = await Taskdb.Delete(Id);
        if (result === 1)
        {
            ToastAndroid.show('Delete SuccessFull', ToastAndroid.SHORT);
        }
        else {
            ToastAndroid.show('Delete Failed', ToastAndroid.SHORT);
        }
    }

    const handleTypeChange = (value)=>
    {
        setTypeText(value);
    };
    const handlecheck = (itemId) =>{
        const newData = Types.map((item)=>{
            if (item.Id === itemId){
                return {
                    ...item,
                };
            }
            return item;
        });
        setType(newData);

    };

    const handleOption = (item) =>{
        setoption(item.id);
    };
    async function handleUpdate (Id, Status) {
        const data = await Taskdb.UpdateStatus(Id,Status);
        if (data === 1){
            ToastAndroid.show('Update SuccessFull', ToastAndroid.SHORT);
        }
        else {
            ToastAndroid.show('Update Failed', ToastAndroid.SHORT);
        }
    }

    useEffect(()=>{
        firebase.firestore().collection('Task')
                            .where('Email','==',auth().currentUser.email)
                            .where('Type','==',TypeText)
                            .onSnapshot(
                                snapshort=> {
                                    const Types = [];
                                    snapshort.docs.map(doc=>{
                                        Types.push({
                                            ...doc.data(),
                                        });
                                    });
                                    setType(Types);

                                });
    }, [TypeText]);
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
                        const selected = option === item.id;
                        return (
                            <Item
                                item={item}
                                onPress={()=>{
                                    handleOption(item);
                                    handleTypeChange(item.title);

                                    firebase.firestore().collection('Task')
                                    .where('Email','==',auth().currentUser.email)
                                    .where('Type','==', item.title)
                                    .onSnapshot(
                                        snapshort=> {
                                            const Types = [];
                                            snapshort.docs.map(doc=>{
                                                Types.push({
                                                    ...doc.data(),
                                                });
                                            });
                                            setType(Types);

                                        });
                                }}
                                style={selected ? styles.selectedbox : styles.boxitem}
                            />
                        );
                    }}
                />
            </View>
            <View style = {styles.listcheck}>
                {TypeText && (
                    <FlatList
                    data={Types}
                    alwaysBounceVertical = {true}
                    renderItem={({item})=>{
                        return (
                            <CheckBoxItem
                            item = {item}
                            value = {item.Status}
                            onPress = {() => {
                                handlecheck(item.Id);
                                handleUpdate(item.Id, item.Status);

                            }}
                            ShowUpdate={()=>{
                                if (item.Status === 0)
                                {
                                    handleShowUpdate({
                                        Id: item.Id,
                                        Description: item.Description,
                                        Type: item.Type,
                                        Deadline: item.Deadline,
                                    });
                                }
                                else {
                                    ToastAndroid.show('Đã hoàn thành không thể cập nhật', ToastAndroid.SHORT);
                                }
                            }}
                            Delete={()=>handleDelete(item.Id)}
                            />
                        );
                        }}
                        />
                )}
            </View>
            <ButtonAdd style={styles.ButtonAdd}/>
        </View>
    );
};
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({

    container:{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor:'white',
        flex: 1,
    },
    titleView:{
        marginTop:32,
        marginLeft:32,
    },
    title:{
        color:'#403572',
        fontSize: 24,
        fontWeight: '300',
    },
    listbox:{
        marginLeft: 32,
        marginTop: 66,
        width: WIDTH/1.15,
    },
    boxitem:{
        width: 95,
        height: 37,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#4681A3',
        opacity: 0.6,
        marginRight: 10,
        borderRadius: 8,
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 12,
    },
    selectedbox:{
        borderWidth: 0,
        backgroundColor: '#EEEFF0',
        width: 95,
        height:37,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems:'center',
        marginRight: 10,
        marginTop: 12,
    },
    tasks:{
        fontSize: 12,
        fontFamily:'Inter',
        color:'#4681A3',
        fontWeight:'800',
    },
    listcheck:{
        marginTop: 30,
        marginLeft: 15,
        flex: 1,
    },
    checkView:{
        marginLeft: 32,
        flexDirection:'row',
        marginBottom: 15,
        // alignItems:"center",
    },
    textContent:{
        color:'black',
        fontSize: 13,
        marginLeft: 13,
        fontWeight:'500',
        // textDecorationLine:'line-through'
    },
    date:{
        fontSize: 11,
        marginLeft: 13,
        fontWeight:'500',

    },
    checkcontent:{
       width: WIDTH / 1.5,
       paddingLeft: 10,
    },
    checkbox:{
        marginTop: 3,
    },
    iconremove:{
        margin: 3,
        width: 15,
        height: 15,
    },
    ButtonAdd:{
        top: HEIGHT / 1.5 ,
        left: WIDTH / 1.25,
    },
});


export default Task;
