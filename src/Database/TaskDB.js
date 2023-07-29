import { firebase } from "@react-native-firebase/firestore";
import React, { useState } from "react";
import { ToastAndroid } from "react-native";
import { Alert, } from "react-native";
import uuid from 'react-native-uuid';
import auth from '@react-native-firebase/auth'

const database = firebase.firestore();
const data = database.collection('Task');



class TaskDB{

    Task(Id,Type, Description, Deadline, Status){
        this.Id = Id,
        this.Type = Type,
        this.Description = Description,
        this.Deadline = Deadline,
        this.Status = Status
    }
    SelecAll(){
        data.get()
        .then((snapshort)=>{
            if(snapshort.empty)
            {
                Alert.alert('Không có dữ liệu')
            }
            else{
                snapshort.docs.map(doc=>{
                   doc.data();
                })
            }
        })
        .catch((error)=>Alert.alert(error.message))
    }
    
    SelectofType(Type){
        data.where('Type','==',Type).get()
        .then((snapshort)=>{
            if(snapshort.empty)
            {
                console.log('Không tồn tại Task');
            }
            else{
                snapshort.docs.forEach(doc=>{
                    doc.data;
                })
            }
        })
        .catch((error)=>console.log(error.message))
    }
    async Add (Description,Type, Deadline){
        try{

            await data.add({
                UserId: auth().currentUser.uid,
                Id: uuid.v1(),
                Description: Description,
                Type:Type,
                Deadline: Deadline,
                Status: 0,
            })
            console.log('Them thanh cong')
            return 1
        }   
        catch(e){
            console.log(e.message);
            return -99
        }
    }

    async Delete(Id){
        let result = 0;
        const snapshort = await data.where('Id', '==',Id).get();
        try{
            snapshort.docs[0]
            .ref.delete();
            result = 1 
        }
        catch(e)
        {
            console.log(e.message)
            result = -99
        }
        return result
    }
    async UpdateStatus(Id, checked){
        let result  =  0
        // 1 thanh cong , -1 null, -99 lỗi chưa xác định
        try{
            const snapshort = await data.where('Id','==',Id).get();
            if (snapshort.empty){
                console.log('Null')
                return -1
            }
            else{
                snapshort.forEach((doc)=>{
                                doc.ref.update({
                                    Status: (!checked)?1:0
                                })
                            })
                result = 1
            }
        }
        catch(e){
            console.log(e.message)
            return -99
        }
        return result;
    }
    async Update(Id, Description,Type, Deadline){
        let result = 0
        // 1 thanh cong , -99 lỗi chưa xác định 
        const snapshort = await data.where('Id', '==',Id).get();
        try{
            snapshort.docs[0]
            .ref.update({
                Description: Description,
                Type: Type,
                Deadline: Deadline,
            })
            result = 1 
        }
        catch(e)
        {
            console.log(e.message)
            result = -99
        }
        return result
    }
    async CountHighPrioriry(){
        let a = 0;
        const count = (await data.where('Type','==','Important').get()).size;
        a = count;
        return a;
    }
    DatetimetoSting(){
        const datetime = new Date();
        const Year = datetime.getFullYear();
        const Month = String(datetime.getMonth() + 1).padStart(2, '0');
        const Day = String(datetime.getDate()).padStart(2, '0');
        const Hour = String(datetime.getHours()).padStart(2,'0');
        const Minute  = datetime.getMinutes();
        return `${Day}-${Month}-${Year} ${Hour}:${Minute}`;
    }
    
}

// Sua du lieu
    
export default TaskDB;