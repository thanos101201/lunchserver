import React, { useState } from 'react'
import NavCmp from './NavCmp'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios';
import Food from '../assets/food.jpeg';
function Otp() {
    const [ otp, setOtp ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ open, setOpen ] = useState(false);
    const handleOtp = () => {
        let config = {
            headers: {
                email: email
            }
        }
        axios.get('https://lunchserver-tau.vercel.app/otp', config).then((response) => {
        console.log(response);    
        if(response.data.message === "Otp is send"){
                setOpen(true);
            }
            else{
                //alert("Namaste");
                //alert(response.data.message);
            }
        }).catch((eror) => {
            //alert("Hello");
            //alert(eror.message);
        })
    }
    const handleVerfiy = () => {
        axios.post('https://lunchserver-tau.vercel.app/otp', {
            email: email,
            otpNum: otp
        }).then((response) => {
            if(response.data.message === "Otp is verified"){
                window.open("http://localhost:3000/home", "_self");
            }
            else{
                //alert(response.data.message);
            }
        }).catch((eror) => {
            //alert(eror.message);
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
    <NavCmp />
    <Modal isOpen={open}>
        <ModalHeader>
            Verify Otp
        </ModalHeader>
        <ModalBody>
            <div className='row d-flex justify-content-center'>
                <div className='col-12 col-md-4 d-flex align-items-center'>
                    <Label><strong>Otp : </strong></Label>
                </div>
                <div className='col-12 col-md-8 d-flex align-items-center'>
                    <Input placeholder='OTP' onChange={(e) => setOtp(e.target.value)} />
                </div>
            </div>
        </ModalBody>
        <ModalFooter>
            <div className='row d-flex justify-content-center'>
                <div className='col-12 col-md-6 d-flex align-items-center'>
                    <Button onClick={() => handleVerfiy()}>Verify</Button>
                </div>
                <div className='col-12 col-md-6 d-flex align-items-center'>
                    <Button onClick={() => setOpen(!open)}>Close</Button>
                </div>
            </div>
        </ModalFooter>
    </Modal>
    <div  className='container pb-5'  style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '20px',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
        <div className='row d-flex justify-content-center'>
            <div className='col-12 d-flex align-items-center shadow'>
                <Form className='mt-5 p-5'>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-3'>
                                <Label><strong>Email :</strong></Label>
                            </div>
                            <div className='col-10 col-md-9'>
                                <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10'>
                                <Button className='btn btn-danger' onClick={() => {
                                    handleOtp();
                                }}>Get Otp</Button>
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

export default Otp