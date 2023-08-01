/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';


export default class Storage {
    Storage(email, password){
        this.email = email;
        this.password = password;
    }
    SaveInfo = async (email, password) =>{
        console.log(email, password);
        try {
            const info = await AsyncStorage.getItem('loginInfo');
            if (info !== null){
                const account  = JSON.parse(info);

                const exists = account.findIndex(item => item.email === email);
                console.log(exists);
                if (exists !== -1 ) {
                    if ( account[exists].password !== password)
                    {
                        account[exists].password = password;
                        console.log('Thay đổi pass word');
                    }
                }
                else {
                    const data = {
                        email: email,
                        password: password,
                    };
                    account.push(data);
                    await AsyncStorage.setItem('loginInfo', JSON.stringify(account)); 
                    console.log('Dữ liệu này chưa có');
                }
            }
            else {
                const data = [{
                    email: email,
                    password: password,
                }];
                await AsyncStorage.setItem('loginInfo', JSON.stringify(data));
            }
        }
        catch (e) {
            console.log(e.message);
        }
    };
    GetInfo = async () =>{
        const account = await AsyncStorage.getItem('loginInfo');
        const lst = JSON.parse(account);
        console.log(lst);
        return lst;
    };
    ClearInfo = async () =>{
        await AsyncStorage.clear();
        console.log('Clear')
    };

}
