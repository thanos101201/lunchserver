import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
import NavCmp from './NavCmp';
import { Button, Card, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import Food from '../assets/food.jpeg';
function Login() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    
    useEffect(() => {
        const email = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        if(email !== undefined && password !== undefined){
        //    handleLogin(email, password);
        }
    }, []);
  const handleLogin = (username, password) => {
    console.log("username :- "+username);
    axios.post('http://localhost:3001/user/login', {
        username: username,
        password: password
    }).then((response) => {
        if(response.data.message === "User can proceed"){
            alert(response.data.message);
            localStorage.setItem('username', response.data.data[0].username);
            localStorage.setItem('password', password);
            window.open("http://localhost:3000/home", "_self");
        }
        else{
            alert(response.data.message);
        }
    }).catch((eror) => {
        alert(eror.message);
    })
  }
  

////////


  return (
    <div style={{
        backgroundImage: `url(${Food})`,  // Set the background image using the imported variable
        backgroundSize: 'cover',           // Cover the entire container
        backgroundPosition: 'center',      // Center the background image
        backgroundRepeat: 'no-repeat',     // Do not repeat the image
        height: '100vh' // Add this to make z-index work
    }}>
    <NavCmp />
    <div className='container'>
        <div className='row d-flex justify-content-center'>
            <div className='col-10 m-4 d-flex align-items-center shadow' style={{
                background: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white background
                padding: '20px',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)', // Adjust the blur amount
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a shadow
            }}>
                <Form className='m-4'>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-md-4'>
                                <Label><strong>Email : </strong></Label>
                            </div>
                            <div className='col-10 col-md-8'>
                                <Input placeholder='Email/Username' onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-md-4'>
                                <Label><strong>Password : </strong></Label>
                            </div>
                            <div className='col-10 col-md-8'>
                                <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4 m-3'>
                                <Button  className='btn btn-success' onClick={() => handleLogin(username, password)}>Login</Button>
                            </div>
                            <div className='col-10 col-md-4 m-3'>
                                <Button  className='btn btn-danger' href="/signup">Signup</Button>
                            </div>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login