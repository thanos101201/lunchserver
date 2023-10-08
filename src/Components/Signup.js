import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
import NavCmp from './NavCmp';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, Form, FormGroup, Input, Label, NavItem, NavLink, Navbar } from 'reactstrap';
import axios from 'axios';
import Food from '../assets/food.jpeg';

function Signup() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ goal, setGoal ] = useState("");
  const [open, setOpen] = useState("");
  const [ name, setName ] = useState("");
  const toggle = (e) => {
    if(e === open){
        setOpen("");
    }
    else{
        setOpen(e);
    }
  }
  const handleSign = () => {
    axios.post('https://lunchserver-tau.vercel.app/user', {
        email,
        username,
        password,
        name,
        goal
    }).then((response) => {
        if(response.data.message === "User added"){
            localStorage.setItem('email', username);
            localStorage.setItem('password', password);
            window.open("https://lunchserver-two.vercel.app/otp", "_self");
        }
        else{
            // alert(response.data.message);
        }
    }).catch((eror) => {
        console.log(eror);
        if(eror.response.status === 400){
            alert("Username already registered");
        }
    });
  }
  return (
    <div style={{
        backgroundImage: `url(${Food})`,  // Set the background image using the imported variable
        backgroundSize: 'cover',           // Cover the entire container
        backgroundPosition: 'center',      // Center the background image
        backgroundRepeat: 'no-repeat',     // Do not repeat the image
        height: '100vh' // Add this to make z-index work
    }}>
    <Navbar>
        <NavItem>
            <NavLink>
                <h1>Lunch Time</h1>
            </NavLink>
        </NavItem>
        <NavItem>
            <Button className='btn btn-success'>Login</Button>
        </NavItem>
    </Navbar>
    <div className='container pb-5'  style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '20px',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
        <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex align-items-center mt-5 ml-3'>
                <Form>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4'>
                                <Label><strong>Email : </strong></Label>
                            </div>
                            <div className='col-10 col-md-8'>
                                <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4'>
                                <Label><strong>Name : </strong></Label>
                            </div>
                            <div className='col-10 col-md-8'>
                                <Input placeholder='Name' onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4'>
                                <Label><strong>Password : </strong></Label>
                            </div>
                            <div className='col-10 col-md-8'>
                                <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4'>
                                <Label><strong>Username : </strong></Label>
                            </div>
                            <div className='col-10 col-md-8'>
                                <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4'>
                                <Label><strong>Goal : </strong></Label>
                            </div>
                            <div className='col-10 col-md-8'>
                                <Accordion toggle={toggle} open={open}>
                                    <AccordionItem>
                                        <AccordionHeader targetId='1'><strong>Your goal</strong></AccordionHeader>
                                        <AccordionBody accordionId='1'>
                                            <div className='row m-4'>
                                                <div className='col-12'>
                                                    <Button className='btn btn-success' onClick={() => setGoal("1")}>Managing Diabetes</Button>
                                                </div>
                                            </div>
                                            <div className='row m-4'>
                                                <div className='col-12'>
                                                    <Button className='btn btn-primary'  onClick={() => setGoal("2")}>Managing Blood Pressure</Button>
                                                </div>
                                            </div>
                                            <div className='row m-4'>
                                                <div className='col-12'>
                                                    <Button className='btn btn-warning'  onClick={() => setGoal("3")}>Building Muscle</Button>
                                                </div>
                                            </div>
                                            <div className='row m-4'>
                                                <div className='col-12'>
                                                    <Button className='btn btn-danger'  onClick={() => setGoal("4")}>General Well-Bieng</Button>
                                                </div>
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4 m-3'>
                                <Button className='btn btn-success' href="/">Login</Button>
                            </div>
                            <div className='col-10 col-md-4 m-3'>
                                <Button className='btn btn-danger' onClick={handleSign}>Signup</Button>
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

export default Signup