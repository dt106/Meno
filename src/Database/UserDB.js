/* eslint-disable prettier/prettier */
import {firebase} from '@react-native-firebase/firestore';
import uudi from 'react-native-uuid';
const database = firebase.firestore();
const querysnapshort = database.collection('User');

class UserDB {
  constructor(Fname, Lname, Email, PassWord) {
    (this.Id = firebase.firestore.Timestamp.now()),
      (this.Fname = Fname),
      (this.Lname = Lname),
      (this.Email = Email),
      (this.PassWord = PassWord);
  }
  GetId() {
    return this.Id;
  }
  SetId(Id) {
    this.Id = Id;
  }
  GetLname() {
    return this.Lname;
  }
  SetLname(Lname) {
    this.Lname = Lname;
  }
  GetFname() {
    return this.Fname;
  }
  SetFname(Fname) {
    this.Fname = Fname;
  }
  GetEmail() {
    return this.Email;
  }
  GetPassWord() {
    return this.PassWord;
  }
  SetPassWord(PassWord) {
    this.PassWord = PassWord;
  }
  Select(Id) {
    database
      .collection('User')
      .where('Id', '==', Id)
      .get()
      .then(querysnapshort => {
        querysnapshort.forEach(DocumentSnapshort => {
          console.log(DocumentSnapshort.data().Fname);
        });
      })
      .catch(error => console.log(error.message));
  }

  async Add(Fname, Lname, Email, PassWord) {
    let result = 0;
    try {
      await querysnapshort.add({
        Id: uudi.v4(),
        Fname: Fname,
        Lname: Lname,
        Email: Email,
        PassWord: PassWord,
      });
      result = 1;
    } catch (e) {
      console.log(e.message);
      result = -99;
    }

    return result;
  }
  Delete(Id) {
    database
      .collection('User')
      .get()
      .then(snapshort => {
        if (snapshort.empt) {
          console.log('Not Exists');
        } else {
          database
            .collection('User')
            .where('Id', '==', Id)
            .get()
            .then(snapshort => {
              snapshort.forEach(doc => {
                doc.ref
                  .delete()
                  .then(() => {
                    console.log('Delete Successfull');
                  })
                  .catch(error => console.log(error.message));
              });
            })
            .catch(error => {
              console.log(error.message);
            });
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}
export default UserDB;
