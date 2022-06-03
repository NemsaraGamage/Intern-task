import React from 'react';
import '../App.css';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {db} from '../firebase'
import {uid} from 'uid'
import { DataSnapshot, onValue, ref, remove, set } from 'firebase/database';


function MainBody(){

    const [plateValue, setPlateValue] = useState("");
    const [registerValue, setRegisterValue] = useState("");
    const [displayValue, setDisplayValue] = useState("");

    var patternNumber =/[0-9]/g
    var patternAlphabet = /[a-zA-Z]/g

    // write data
    const writeToDatabase = () =>{
        const uuid = uid()
        set(ref(db, `/${uuid}`), {
            registerValue,
            uuid

        })
    }
    
    
    // read data
    useEffect(() => {
        onValue(ref(db), DataSnapshot => {
            setDisplayValue([])
            const data = DataSnapshot.val()
            if(data !== null ){
                Object.values(data).map( (registerValue) => {
                    setDisplayValue((oldArray) => [...oldArray, registerValue] )
                })
            }
        })
    }, [])

    // delete data
    const deleteData = (registerValue) =>{
        remove(ref(db, `/${registerValue.uuid}`))
    }
   
    // dose not handle errors
    function validate(){

        if(plateValue.replace(/\s/g,'').includes("shri") ){
            toast.success("\""+plateValue.replace(/\s/g,'').toUpperCase()+ "\"" +" Is a Vintage Plate number.");
            
        }
         else if(plateValue.replace(/\s/g,'').substring(0,4).match(patternAlphabet) ){
            toast.success("\""+plateValue.replace(/\s/g,'').toUpperCase()+ "\"" +" Is a Mordern Plate number.")

        }

        else if( plateValue.replace(/\s/g,'').substring(0,3).match(patternNumber)){
            toast.success("\""+plateValue.replace(/\s/g,'')+ "\"" +" Is a Old Plate number.");

        }
    
    }

    // Handles errors
    function register(){

        if(registerValue.replace(/\s/g,'').includes("shri") && registerValue.replace(/\s/g,'').includes("9999") ){
            toast.success("\""+registerValue.replace(/\s/g,'').toUpperCase()+ "\"" +" Is a Vintage Plate and a valid license plate number.");
            writeToDatabase()
            
        }
         else if(registerValue.replace(/\s/g,'').substring(0,4).match(patternAlphabet) && registerValue.replace(/\s/g,'').includes("9999")){
            toast.success("\""+registerValue.replace(/\s/g,'').toUpperCase()+ "\"" +" Is a Mordern Plate and a valid license plate number.")
            writeToDatabase()

        }

        else if( registerValue.replace(/\s/g,'').substring(0,3).match(patternNumber) && registerValue.replace(/\s/g,'').includes("9999")){
            toast.success("\""+registerValue.replace(/\s/g,'')+ "\"" +" Is a Old Plate and a valid license plate number.");
            writeToDatabase()

        }

        else if(registerValue.length == 0 || registerValue.slice(-4) != "9999"){
            toast.error("\""+registerValue.replace(/\s/g,'')+ "\"" + " Is not a valid license plate number.");

        }    
        else{
            toast.error("\""+registerValue.replace(/\s/g,'')+ "\"" + " Is not a valid license plate number.");
        }
        
    
    }
    

    return(

        <React.Fragment>

            <div className='boxes-container' >

                <div className='tasks' >

                    <h2>Licence Valadation</h2>

                    <label>If plate has ශ්‍රි use SHRI Instead</label>
                    <input type="text" onChange={(e) => setPlateValue(e.target.value)} className="TextBox" name="licence" placeholder='Enter Licence Plate'></input>
                    <button className='Btn' onClick={validate} >Submit</button>
                    
 
                </div>

                <div className='tasks' >

                    <h2>Register Licence</h2>

                    <label>If plate has ශ්‍රි use SHRI Instead</label>
                    <input type="text" onChange={(e) => setRegisterValue(e.target.value)} className="TextBox" name="register" placeholder='Register Plate'></input>
                    <button className='Btn' onClick={register} >Register</button>
                   

                </div>

                <div className='valueTasks' >

                    <h2 className='savedLable' >Saved Plates</h2>
                    
                    {Array.from(displayValue).map(registerValue =>(
                        <>
                            <p className='dbValue' >{registerValue.registerValue}</p>
                            <button className='dbBtns' >Update</button>
                            <button className='dbBtns' onClick={() => deleteData(registerValue) } >Delete</button>
                            
                        </>
                    ))}


                </div>

                <ToastContainer  />


            </div>
            

        </React.Fragment>
    );
}

export default MainBody