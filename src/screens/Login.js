/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  Keyboard,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../services/AsyncStorage/store';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from 'react-native';

const Store = new Storage();

const Log = (email, password, navigation) => {
  let mess = 'loi';
  if (email === '' || password === '') {
    ToastAndroid.show('Vui lòng nhập đủ thông tin', ToastAndroid.SHORT)
  } else {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('DrawNavigator');
        ToastAndroid.show(
          'Đăng nhập thành công ' + auth().currentUser.email,
          ToastAndroid.SHORT,
        );
        Store.SaveInfo(email, password);
      })
      .catch(error => {
        mess = error.message;
        ToastAndroid.show(mess, ToastAndroid.SHORT)
    });
  }
};
const Login = ({navigation}) => {
  //formlogin
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState('');
  //localStorage
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpen, setModalOen] = useState(true);
  const [lstAccount, setlstAccount] = useState([]);
  const handleEmail = value => {
    if (value != '' || value == '') {
      SetEmail(value);
    }
  };
  const handlePassword = value => {
    if (value != '' || value == '') {
      SetPassword(value);
    }
  };

  const handlNextPassWord = () => {
    passwordRef.current.focus();
  };
  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleHideModal = () =>{
    setModalVisible(false);
    setModalOen(false);
  };
  useEffect(() => {
    async function GetInfo(){
      setlstAccount(await Store.GetInfo());
    }
    GetInfo();
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style = {{flex: 1}}
    >
    <View style={styles.container}>
      <View style={styles.viewtitle}>
        <Text style={styles.title}>Welcome Back!</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={[styles.inputText]}
          value={email}
          ref={emailRef}
          returnKeyType="next"
          onChangeText={value => {
            handleEmail(value);
          }}
          onSubmitEditing={handlNextPassWord}
          placeholder="Email"
          onPressIn={handleOpenModal
          }
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={password}
          ref={passwordRef}
          returnKeyType="done"
          onChangeText={value => {
            handlePassword(value);
          }}
          onSubmitEditing={() => passwordRef.current.blur()}
          placeholder="Password"
        />
      </View>
      <TouchableOpacity
        style={styles.login}
        onPress={() => Log(email, password, navigation)}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.register}>
        <Text>Not registered?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signup}>Sign up!</Text>
        </TouchableOpacity>
      </View>
    </View>
    {modalOpen ? (
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleOpenModal;
      }}>
      <TouchableWithoutFeedback onPress={
                 handleHideModal
      }>

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Đây có phải là bạn?</Text>
            <FlatList
              data={lstAccount}
              alwaysBounceVertical = {true}
              renderItem={({ item }) => (
                <TouchableOpacity style = {styles.modalitem} onPress={()=>{
                  SetEmail(item.email);
                  SetPassword(item.password);
                  setModalVisible(false);
                  setModalOen(false)
                  }}>
                  <Text style = {styles.modalTextitem}>{item.email}</Text>
                </TouchableOpacity>
              )}
            />
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
    ) : null}
</KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  viewtitle: {
    width: '90%',
    marginVertical: 30,
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  inputView: {
    width: '90%',
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    marginTop: 20,
  },
  inputText: {
    height: 40,
    marginLeft: 20,
  },
  register: {
    marginTop: 20,
    flexDirection: 'row',
  },
  login: {
    marginTop: 30,
    width: '90%',
    backgroundColor: '#000066',
    borderRadius: 10,
    height: 35,
    justifyContent: 'center',

    alignItems: 'center',
  },
  loginText: {
    fontSize: 12,
    color: 'white',
  },
  signup: {
    fontWeight: 'bold',
    color: '#000080',
  },

  //Modal
  centeredView: {
    height: 300,
    marginTop: 22,
    justifyContent:'center',
    alignItems:'center',

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalitem:{
    height: 25,
    backgroundColor:'#DDDDDD',
    marginTop: 10,
    borderRadius: 8,
    width: 200,
    justifyContent:'center'
  },
  modalTextitem:{
    marginLeft: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Login;
