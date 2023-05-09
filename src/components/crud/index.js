import React from 'react';
import Startfirebase from "../firebaseConfig/index";
import { ref, set, get, update, remove, child} from 'firebase/database';

export class Crud extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            db:'',
            username:'',
            fullname:'',
            email:'',
            phonenumber:'',
            dob:'',
        }

        this.interface = this.interface.bind(this);
    }

    componentDidMount(){
        this.setState({
            db: Startfirebase()
        });
    }

    render(){
        return(
            <>
            <label>Enter username</label>
            <input type='text' id='userbox' value={this.state.username}
            onChange={e=>{this.setState({username: e.target.value});}}/>
            <br></br>

            <label>Enter Fullname</label>
            <input type='text' id='namebox' value={this.state.fullname}
            onChange={e=>{this.setState({fullname: e.target.value});}}/>
            <br></br>

            <label>Enter Email</label>
            <input type='text' id='namebox' value={this.state.email}
            onChange={e=>{this.setState({email: e.target.value});}}/>
            <br></br>

            <label>Enter your phone number</label>
            <input type='number' id='phonebox' value={this.state.phonenumber}
            onChange={e=>{this.setState({phonenumber: e.target.value});}}/>
            <br></br>

            <label>Enter your birthday</label>
            <input type='date' id='datebox' value={this.state.dob}
            onChange={e=>{this.setState({dob: e.target.value});}}/>
            <br></br>

            <button id="addBtn" onClick={this.interface}>Add Data</button>
            <button id="updateBtn" onClick={this.interface}>Update Data</button>
            <button id="deleteBtn" onClick={this.interface}>Delete Data</button>
            <button id="selectBtn" onClick={this.interface}>Select Data from database</button>
            </>
        )
    }

    interface(event){
        const id= event.target.id;
        if(id =='addBtn'){
            this.insertData();
        }
        if(id =='updateBtn'){
            this.updateData();
        }
        if(id =='deleteBtn'){
            this.deleteData();
        }
        if(id =='selectBtn'){
            this.selectData();
        }
    }

    getAllInputs(){
        return{
            username: this.state.username,
            name: this.state.fullname,
            email: this.state.email,
            phone: Number(this.state.phonenumber),
            dob: this.state.dob
        }
    }

    insertData(){
        const db = this.state.db;
        const data = this.getAllInputs();

        set(ref(db, 'Customer/' + data.username),
        {
            Fullname: data.name,
            Email: data.email,
            Phonenumber: data.phone,
            dateofbirth: data.dob
        })
        .then(()=>{alert('Data was added successfully')})
        .catch((error)=>{alert("Data error"+ error)}); 
    }

    updateData(){
        const db = this.state.db;
        const data = this.getAllInputs();

        update(ref(db, 'Customer/' + data.username),
        {
            Fullname: data.name,
            email: data.email,
            Phonenumber: data.phone,
            dateofbirth: data.dob
        })
        .then(()=>{alert('Data was updated successfully')})
        .catch((error)=>{alert("Data error"+ error)});
    }

    deleteData(){
        const db = this.state.db;
        const username = this.getAllInputs().username;

        remove(ref(db, 'Customer/' +username))
        .then(()=>{alert('Data was deleted successfully')})
        .catch((error)=>{alert("Data error"+ error)});
    }

    selectData(){
        const dbref = ref(this.state.db);
        const username = this.getAllInputs().username;

        get(child(dbref, 'Customer/' + username)).then((snapshot)=>{
            if(snapshot.exists()){
                this.setState({
                    fullname: snapshot.val().Fullname,
                    email: snapshot.val().Email,
                    phonenumber: snapshot.val().Phonenumber,
                    dob: snapshot.val().dateofbirth
                })                
            }

            else{
                alert("No data found");
            }
        })
    }
}
