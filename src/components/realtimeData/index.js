import StartFirebase from '../firebaseConfig/index';
import React from 'react';
import {ref, onValue} from 'firebase/database';
import {Table} from 'react-bootstrap';
import { CrudPanel } from './CrudPanel';
import './index.css';




const db= StartFirebase();
let UniqueNUmber= 0;

export class RealtimeData extends React.Component{
    constructor(){
        super();
        this.state ={
            tableData: []
        }
    }

    componentDidMount(){
        const dbRef = ref(db, 'Customer');

        onValue(dbRef, (snapshot)=>{
            let records = [];
            snapshot.forEach(childSnapshot=>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key": keyName, "data": data});
            });
            this.setState({tableData: records});
        });
    }
    render(){
        return(
      
        <Table className='container w-75' striped bordered variant='dark' >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Date of birth</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {this.state.tableData.map((row, index)=>{
                    return(
                    <tr key={UniqueNUmber++}>
                        <td>{index+ 1}</td>
                        <td>{row.key}</td>
                        <td>{row.data.Fullname}</td>
                        <td>{row.data.Email}</td>
                        <td>{row.data.Phonenumber}</td>                      
                        <td>{row.data.dateofbirth}</td>
                       

                        <td><CrudPanel username={row.key} record={row.data}/></td>
                    </tr>
                    )
                })}              
            </tbody>   
        </Table>  
        )
    }
}