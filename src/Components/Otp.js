import React, { useState } from 'react'
import NavCmp from './NavCmp'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios';
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
        axios.get('http://localhost:3001/otp', config).then((response) => {
        console.log(response);    
        if(response.data.message === "Otp is send"){
                setOpen(true);
            }
            else{
                alert("Namaste");
                alert(response.data.message);
            }
        }).catch((eror) => {
            alert("Hello");
            alert(eror.message);
        })
    }
    const handleVerfiy = () => {
        axios.post('http://localhost:3001/otp', {
            email: email,
            otpNum: otp
        }).then((response) => {
            if(response.data.message === "Otp is verified"){
                window.open("http://localhost:3000/home", "_self");
            }
            else{
                alert(response.data.message);
            }
        }).catch((eror) => {
            alert(eror.message);
        });
    }
  return (
    <>
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
    <div className='container'>
        <div className='row d-flex justify-content-center'>
            <div className='col-8 d-flex align-items-center shadow'>
                <Form className='m-3'>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4'>
                                <Label><strong>Email :</strong></Label>
                            </div>
                            <div className='col-10 col-md-8'>
                                <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4 m-3'>
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
    </>
  )
}

export default Otp