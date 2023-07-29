import React, { useRef } from 'react';
import { TextInput, View, Button } from 'react-native';
import TaskDB from '../../Database/TaskDB';



const MyComponent = () => {
  
  const Task = new TaskDB();
  Task.UpdateStatus('4234');
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

  return (
    <View>
        <View>

        <TextInput
                style = {{backgroundColor:'blue'}}
                ref={inputRef1}
                returnKeyType="next"
                onSubmitEditing={handleSubmission1}
                />
        </View>
        <View>
          <TextInput
            style = {{backgroundColor:'red'}}
            ref={inputRef2}
            returnKeyType="next"
            onSubmitEditing={handleSubmission2}
            />
        </View>
        <TextInput
          style = {{backgroundColor:'green'}}
          ref={inputRef3}
          returnKeyType="done"
          onSubmitEditing={handleSubmission3}
        />
  <Button title='BTN'></Button>    
  </View>
  );
};

export default MyComponent;
