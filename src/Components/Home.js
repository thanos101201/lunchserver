import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import NavCmp from './NavCmp';
import axios from 'axios';
function Home() {
  const [ join, setJoin ] = useState(false);
  const [ create, setCreate ] = useState(false);
  const [ id, setId ] = useState("");
  useEffect(() => {
    const user = localStorage.getItem('username');
    axios.get(`http://localhost:3001/session/active/${user}`).then((response) => {
      if(response.data.data.length > 0){
        // alert(response.data.data);
        window.open("http://localhost:3000/session", "_self");
      }
    })
  },[]);
  const handleJoin = () => {
    axios.post('http://localhost:3001/session/join', {
      username: localStorage.getItem('username'),
      id: id
    }).then((response) => {
      if(response.data.message === 'Session joined'){
        window.open("http://localhost:3000/session", "_self");
      }
      else if(response.data.message === 'Session is full'){
        alert('Session is full');
      }
    }).catch((eror) => {
      alert(eror.message);
    });
  }
  const handleCreate = () => {
    axios.post('http://localhost:3001/session', {
      username: localStorage.getItem('username')
    }).then((response) => {
      if(response.data.message === 'Session created'){
        window.open("http://localhost:3000/session", "_self");
      }
    }).catch((eror) => {
      alert(eror.message);
    });
  }
  return (
    <div>
        <NavCmp />
        <Modal isOpen={join}>
          <ModalHeader>
            <h3>Join a Group</h3>
          </ModalHeader>
          <ModalBody>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 col-md-4 d-flex align-items-center'>
                <Label><strong>Session Id : </strong></Label>
              </div>
              <div className='col-12 col-md-4 d-flex align-items-center'>
                <Input placeholder='Session Id' onChange={(e) => setId(e.target.value)} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 col-md-6 d-flex align-items-center'>
                <Button onClick={() => handleJoin()}>Join</Button>
              </div>
              <div className='col-12 col-md-6 d-flex align-items-center'>
                <Button onClick={() => setJoin(!join)}>Close</Button>
              </div>
            </div>
          </ModalFooter>
        </Modal>
        <div className='container'>
            <div className='row m-5 d-flex justify-content-center'>
              <div className='col-10 col-md-8 d-flex align-items-center'>
                <Form className='shadow'>
                  <FormGroup>
                    <div className='row m-5 d-flex justify-content-center'>
                        <div className='col-12 m-2 col-md-6'>
                          <Button className ='btn btn-info' onClick={() => {
                            setJoin(!join);
                          }}>Join Session</Button>
                        </div>
                        <div className='col-12 m-2 col-md-6'>
                          <Button className ='btn btn-danger' onClick={() => {
                            handleCreate();
                          }}>Create Session</Button>
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

export default Home