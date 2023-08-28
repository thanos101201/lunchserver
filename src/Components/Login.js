import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
import NavCmp from './NavCmp';
import { Button, Card, Form, FormGroup, Input, Label } from 'reactstrap';

function Login() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  return (
    <>
    <NavCmp />
    <div className='container'>
        <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex align-items-center shadow'>
                <Form className='m-4'>
                    <FormGroup>
                        <div className='row'>
                            <div className='col-10 col-md-4'>
                                <Label><strong>Email : </strong></Label>
                            </div>
                            <div className='col-10 col-md-8'>
                                <Input placeholder='Email/Username' onChange={(e) => setUsername(e.target.value)} />
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
                            <div className='col-10 col-md-4 m-3'>
                                <Button  className='btn btn-success'>Login</Button>
                            </div>
                            <div className='col-10 col-md-4 m-3'>
                                <Button  className='btn btn-danger'>Signup</Button>
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

export default Login