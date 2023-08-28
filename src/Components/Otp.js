import React, { useState } from 'react'
import NavCmp from './NavCmp'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
function Otp() {
    const [ otp, setOtp ] = useState("");
  return (
    <>
    <NavCmp />
    <div className='container'>
        <div className='row d-flex justify-content-center'>
            <div className='col-8 d-flex align-items-center shadow'>
                <Form className='m-3'>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4'>
                                <Label><strong>Otp :</strong></Label>
                            </div>
                            <div className='col-10 col-md-8'>
                                <Input placeholder='Otp' onChange={(e) => setOtp(e.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4 m-3'>
                                <Button className='btn btn-success'>Login</Button>
                            </div>
                            <div className='col-10 col-md-8 m-3'>
                                <Button className='btn btn-danger'>Sign Up</Button>
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