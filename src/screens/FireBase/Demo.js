/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View, Button} from 'react-native';
import TaskDB from '../../Database/TaskDB';
const Task = new TaskDB();

const MyComponent = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();

  const handleSubmission1 = () => {
    inputRef2.current.focus();
  };

  const handleSubmission2 = () => {
    inputRef3.current.focus();
  };

  const handleSubmission3 = () => {
    // handle final submission logic
  };
  useEffect(() => {
    async function Result() {
      setCount(await Task.CountHighPrioriry());
      setCount2(await Task.CountDueDeadline());
    }
    Result();
  }, []);
  return (
    <View>
      <View>
        <TextInput
          style={{backgroundColor: 'blue'}}
          ref={inputRef1}
          returnKeyType="next"
          onSubmitEditing={handleSubmission1}
          value={count.toString()}
        />
      </View>
      <View>
        <TextInput
          value={count2.toString()}
          style={{backgroundColor: 'red'}}
          ref={inputRef2}
          returnKeyType="next"
          onSubmitEditing={handleSubmission2}
        />
      </View>
      <TextInput
        style={{backgroundColor: 'green'}}
        ref={inputRef3}
        returnKeyType="done"
        onSubmitEditing={handleSubmission3}
      />
      <Button
        title="BTN"
        onPress={async () => {
          // firebase.firestore().collection('Task').get().then(
          //   (data)=>{
          //     data.docs.forEach(doc=>{
          //       console.log(doc.data())
          //     })
          //   }
          // )

          const b = new Date(1);
          console.log(b);
        }}
      />
    </View>
  );
};

export default MyComponent;
