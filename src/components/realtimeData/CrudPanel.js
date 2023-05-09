import React from "react";
import { Button, Modal, InputGroup, Form } from "react-bootstrap";
import { ref, set, get, update, remove, child } from 'firebase/database';
import StartFirebase from '../firebaseConfig/index'
import './index.css';
const db = StartFirebase();

export class CrudPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: '',
            isOpen: false,
            record: {
                username: props.username,
                fullname: props.record.Fullname,
                email: props.record.Email,
                phonenum: props.record.Phonenumber,
                dob: props.record.dateofbirth,
            },

            modUsername: '',
            modFullname: '',
            modEmail: '',
            modPhonenum: '',
            modDob: ''
        }
    }

    componentDidMount() {
        console.log(this.state.record);
    }
    render() {
        return (
            
            
            

            <>
                <Button variant='outline-success' className='ms-2' onClick={()=>{this.openModal('add')}}>Create</Button>
                <Button variant='outline-light' className='ms-2' onClick={()=>{this.openModal('edit')}}>Edit</Button>

                <Modal show={this.state.isOpen}>
                    <Modal.Header style={{backgroundColor: "#white"}}>
                        <Modal.Title>{(this.state.mode == 'add')? 'Create' : 'Edit'}</Modal.Title>
                        <Button size="sm" variant="dark" onClick={()=>{this.closeModal()}}>X</Button>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor: "aliceblue"}}>
                        <InputGroup style={{padding: "10px"}}>
                            <InputGroup.Text>Username</InputGroup.Text>
                            <Form.Control value={this.state.modUsername}
                                onChange={e => { this.setState({ modUsername: e.target.value }) }} 
                                disabled= {(this.state.mode != 'add')}
                                />
                        </InputGroup>

                        <InputGroup style={{padding: "10px"}}>
                            <InputGroup.Text>Fullname</InputGroup.Text>
                            <Form.Control value={this.state.modFullname}
                                onChange={e => { this.setState({ modFullname: e.target.value }) }} />
                        </InputGroup>

                        <InputGroup style={{padding: "10px"}}>
                            <InputGroup.Text>Email</InputGroup.Text>
                            <Form.Control value={this.state.modEmail}
                                onChange={e => { this.setState({ modEmail: e.target.value }) }} />
                        </InputGroup>

                        <InputGroup style={{padding: "10px"}}>
                            <InputGroup.Text>Phone number</InputGroup.Text>
                            <Form.Control value={this.state.modPhonenum}
                                onChange={e => { this.setState({ modPhonenum: e.target.value }) }} />
                        </InputGroup>

                        <InputGroup style={{padding: "10px"}}>
                            <InputGroup.Text>Date of Birth</InputGroup.Text>
                            <Form.Control type='date' value={this.state.modDob}
                                onChange={e => { this.setState({ modDob: e.target.value }) }} />
                        </InputGroup>

                    </Modal.Body>

                    <Modal.Footer style={{backgroundColor: "white"}}>
                        <Button variant="outline-success" className='ms-2' onClick={()=>{this.interface('add')}}  style={(this.state.mode != 'add')? {display:'none'}:{}}>Create</Button>
                        <Button variant="outline-info" className='ms-2' onClick={()=>{this.interface('update')}} style={(this.state.mode == 'add')? {display:'none'}:{}}>Update</Button>
                        <Button variant="outline-danger" className='ms-2' onClick={()=>{this.interface('delete')}}style={(this.state.mode == 'add')? {display:'none'}:{}}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    openModal(option) {
        if (option=='add') {
            this.setState({
                isOpen: true,
                mode: option,
                modUsername: '',
                modFullname: '',
                modEmail: '',
                modPhonenum: '',
                modDob: ''
            });
        }
 
        else if(option=='edit'){
            let rec = this.state.record;
            this.setState({
                isOpen: true,
                mode: option,
                modUsername: rec.username,
                modFullname: rec.fullname,
                modEmail: rec.email,
                modPhonenum: rec.phonenum,
                modDob: rec.dob
            });
        }
    }

    closeModal() {
        this.setState({
            isOpen: false
        })
    }

    getAllData(){
        return{
            id: this.state.modUsername,
            data:{
                Fullname: this.state.modFullname,
                Email: this.state.modEmail,
                Phonenumber: this.state.modPhonenum,
                dateofbirth: this.state.modDob
            }
        }
    }

    interface(option){
        if(option == 'add')
        this.insertData();

        else if(option == 'update')
        this.updateData();

        else if(option == 'delete')
        this.deleteData();

        this.closeModal();
    }

    insertData(){
        const dbRef = ref(db);
        const record = this.getAllData();
        const address = 'Customer/'+ record.id;

        get(child(dbRef, address)).then(snapshot =>{
            if(snapshot.exists()){
                alert('The user already exist');
            }
            else{
                set(ref(db, address), record.data);
            }
        })
    }

    updateData(){
        const dbRef = ref(db);
        const record = this.getAllData();
        const address = 'Customer/'+ record.id;

        get(child(dbRef, address)).then(snapshot =>{
            if(snapshot.exists()){
                update(ref(db, address), record.data);
            }
            else{
                alert('The user does not exist');
            }
        })
    }

    deleteData(){
        const dbRef = ref(db);
        const record = this.getAllData();
        const address = 'Customer/'+ record.id;

        get(child(dbRef, address)).then(snapshot =>{
            if(snapshot.exists()){
                remove(ref(db, address));
            }
            else{
                alert('The user does not exist');
            }   
        })
    }

}