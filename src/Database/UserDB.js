import { firebase } from "@react-native-firebase/firestore";

const database = firebase.firestore();


class UserDB {

    constructor(Fname, Lname, Email, PassWord){
        this.Id = firebase.firestore.Timestamp.now(),
        this.Fname = Fname,
        this.Lname = Lname,
        this.Email = Email,
        this.PassWord = PassWord
    }
    GetId(){
        return this.Id;
    }
    SetId(Id){
        this.Id = Id;
    }
    GetLname(){
        return this.Lname
    }
    SetLname(Lname){
        this.Lname = Lname;
    }
    GetFname(){
        return this.Fname;
    }
    SetFname(Fname){
        this.Fname = Fname;
    }
    GetEmail(){
        return this.Email;
    }
    GetPassWord(){
        return this.PassWord;
    }
    SetPassWord(PassWord){
        this.PassWord = PassWord;
    }
    Select(Id){

        database.collection('User').where('Id', '==',Id).get()
        .then((querysnapshort)=>{    
            querysnapshort.forEach(DocumentSnapshort=>{
               console.log( DocumentSnapshort.data().Fname);
            })
        })
        .catch((error)=>console.log(error.message))
    }


    Add(Fname, Lname,Email, PassWord){
        database.collection('User').get()
        .then((snapshort)=>{
            if (snapshort.empty){
                console.log('rong');
                database.collection('User').add({
                    
                })
                .then(()=>console.log('Create Table'))
                .catch((error)=>console.log(error.message))
            }
            else{
                database.collection('User').add({
                    Id:1,
                    Fname:Fname,
                    Lname:Lname,
                    Email:Email,
                    PassWord:PassWord
                    
                },{})
                .then(()=>console.log('Create Successfull'))
                .catch((error)=>console.log(error.message))
            }
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    Delete(Id){
        database.collection('User').get()
        .then((snapshort) =>{
            if(snapshort.empt){
                console.log('Not Exists')
            }
            else
            {
                database.collection('User').where('Id','==',Id).get()
                .then((snapshort)=>{
                    snapshort.forEach(doc=>{
                        doc.ref.delete()
                        .then(()=>{
                            console.log('Delete Successfull')
                        })
                        .catch((error)=>console.log(error.message))
                    })
                })
                .catch((error)=>{
                    console.log(error.message)
                })
            }
        
        })
        .catch((error)=>{
            console.log(error.message);
        })

    }
} 
export default UserDB;