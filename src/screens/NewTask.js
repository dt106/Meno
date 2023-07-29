import React, { useState } from "react";
import { StyleSheet,Text, View,TextInput , FlatList, TouchableOpacity, Image, Alert, ToastAndroid} from "react-native";
import { Dimensions } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import Tasks from "../Database/TaskDB";

const Task = new Tasks();

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
        title:'Important'
    },
    {
        id: 4,
        title:'Free'
    }

]

const Item = ({item, onPress,style})=>(
    <TouchableOpacity 
        onPress={onPress}
        style = {style}>
        <Text style = {styles.tasks}>{item.title}</Text>
    </TouchableOpacity>
)

const NewTask = ({route, navigation})=>{
    const {data} = route.params;
    const {IdRoute, DescriptionRoute, TypeRoute, DeadlineRoute, Status}  = data;

    const [Describe, setDescibe] = useState(DescriptionRoute);
    const [Type , setType] = useState(TypeRoute)
    const [Deadline, setDeadline] = useState(DeadlineRoute);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [ShowPicker, setShowPicker] = useState(false);
    const [selecteditem, setselecteditem] = useState(TypeRoute);
    
    const showDatePicker = () =>{
        setShowPicker(true);
    }
    const hideDatePicker = () =>{
        setShowPicker(false);
    } 
    const handleDeadlinechange = (Text) =>{
        setDeadline(Text);
    }
    const handleDateConfirm = (selected) =>{
        setDate(selected);
        const Year = selected.getFullYear();
        const Month = String(selected.getMonth() + 1).padStart(2, '0');
        const Day = String(selected.getDate()).padStart(2, '0');
        const Hour = String(selected.getHours()).padStart(2,'0');
        const Minute  = selected.getMinutes();
        const textFormat = `${Day}-${Month}-${Year} ${Hour}:${Minute}`;

        setDeadline(textFormat);
        hideDatePicker();
    }
    const onDescipChange  = (Text) =>{
        setDescibe(Text);
    }

    async function btnAdd(){
        if (Describe !=='' && Type !=='' && Deadline !=='')
        {
            const result =await Task.Add(Describe,Type, Deadline);
            try{

                if (result === 1)
                {
                    setDescibe('');
                    setType('');
                setselecteditem(false);
                setDeadline('');
                setDate(new Date());
                ToastAndroid.show('Add SuccessFull', ToastAndroid.SHORT);
                navigation.goBack();
            }
            else{
                Alert.alert("Thiếu dữ liệu");
            }
        }
        catch(e){
            console.log(e.message);
        }
        }
    }
    async function btnUpdate(){
        if (Describe !=='' && Type !=='' && Deadline !=='')
        {
            const result =  await Task.Update(IdRoute, Describe,Type,Deadline);
            if (result ===1){
                ToastAndroid.show('Update SuccessFull', ToastAndroid.SHORT);
                navigation.goBack();
            }
            else{
                ToastAndroid.show('Update Failed', ToastAndroid.SHORT);
            }
        }
        else{
            ToastAndroid.show('Vui lòng nhập đủ dữ liệu', ToastAndroid.SHORT);
        }
    }
    const handleTypeChange = (Text) =>{
        setType(Text);
    }
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>{Status===2?'Update Task': 'Add New Task'}</Text>
            <View style ={styles.descibe}>
                <Text>Describe the task</Text>
                <View style = {styles.inputView}>
                    <TextInput style= {styles.textinput} value={Describe} placeholder="Type here..." onChangeText={(value)=>onDescipChange(value)}></TextInput>
                </View>
            </View>
            <View style = {styles.type}>
                <Text>Type</Text>
                <FlatList
                    data={DATA}
                    keyExtractor={item=>item.id}
                    horizontal ={true}
                    renderItem={({item}) =>{
                        selected = selecteditem === item.title;
                        return(
                            <Item
                                item={item}
                                onPress={() => {
                                    setselecteditem(item.title),
                                    handleTypeChange(item.title);
                                }}
                                style={selected?styles.selectedbox :styles.boxitem}
                            />
                        )
                    }}
                />
            </View>
            <View style ={styles.descibe}>
                <Text>Deadline</Text>
                <View style = {styles.inputView}>
                    <TouchableOpacity  onPress={showDatePicker}>
                        <Image style = {styles.icon} source={require('../UI/calendar2.png')}/>
                    </TouchableOpacity>
                    <TextInput 
                        placeholder="Due Date" 
                        readOnly = {true} 
                        value={Deadline} 
                        onChangeText={(value) =>handleDeadlinechange(value)}
                        style ={StyleSheet.inputDate} 
                    />
                    
                    <DateTimePicker
                        isVisible = {ShowPicker}
                        mode="datetime"
                        onConfirm={handleDateConfirm}
                        onCancel={hideDatePicker}
                        date={date}
                    />
                </View>
            </View>
            <TouchableOpacity style = {styles.buttonadd} onPress={Status===1?btnAdd:btnUpdate}>
                <Text style = {styles.addTitle}>{Status===2?'Update Now':'Add the task'}</Text>
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
       flexDirection: 'row',
       alignItems:"center"
    },
    icon:{
        marginLeft: 14.5,
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
    selectedbox:{
        borderWidth: 0,
        backgroundColor: "#EEEFF0",
        width: 95,
        height:37,
        borderRadius: 8,
        justifyContent: "center",
        alignItems:"center",
        marginRight: 10,
        marginTop: 12
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
    },
    inputDate:{
        fontWeight: 800,
        fontSize: 30
    }

});

export default NewTask;