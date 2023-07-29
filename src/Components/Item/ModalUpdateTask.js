import React, { useState } from "react";
import { Modal } from "react-native";

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
const ModalUpdate = ({onClose})=>{
    const [isOpen, setOpen] = useState(false);
    const [Describe, setDescibe] = useState('');
    const [Type , setType] = useState('');
    const [Deadline, setDeadline] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [ShowPicker, setShowPicker] = useState(false);
    const [selecteditem, setselecteditem] = useState(false);
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

    const btnAdd = () =>{
        if (Describe !=='' && Type !=='' && Deadline !=='')
        {

            Task.Add(Describe,Type, Deadline);
            setDescibe('');
            setType('');
            setselecteditem(false);
            setDeadline('');
            setDate(new Date());
        }
        else{
            Alert.alert("Thiếu dữ liệu");
        }
    }
    const handleTypeChange = (Text) =>{
        setType(Text);
    }
    return(

        <Modal visible = {isOpen} onRequestClose={onClose}>
             <View style = {styles.container}>
                <Text style = {styles.title}>Add New Task</Text>
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
                            selected = selecteditem === item.id;
                            return(
                                <Item
                                    item={item}
                                    onPress={() => {
                                        setselecteditem(item.id),
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
                <TouchableOpacity style = {styles.buttonadd} onPress={btnAdd}>
                    <Text style = {styles.addTitle}>Add the task</Text>
                </TouchableOpacity>
            
            </View>
        </Modal>
    )

}