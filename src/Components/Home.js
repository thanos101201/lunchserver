import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import NavCmp from './NavCmp';
import axios from 'axios';
import Food from '../assets/food.jpeg';
function Home() {
  useEffect(() => {
    const user = localStorage.getItem('username');
    if(user === undefined){
      window.open("https://lunchserver-two.vercel.app", "_self");
    }
  }, []);
  const [ join, setJoin ] = useState(false);
  const [ create, setCreate ] = useState(false);
  const [ user, setUser ] = useState([]);
  const [ invite, setInvite ] = useState(false);
  const [ id, setId ] = useState("");
  const [ redirect, setRedirect ] = useState(false);
  const [ sessionId, setSessionId ] = useState("");
  useEffect(() => {
    const user = localStorage.getItem('username');
    axios.get(`https://lunchtime-bice.vercel.app/session/active/${user}`).then((response) => {
      if( response.data.data !== undefined &&  response.data.data.length > 0){
        setSessionId(response.data.data[0]._id);
        if(Object.keys(response.data.data[0].scores).length === 1){
          alert("Invite at least one more friend in order to continue to the session");
        }
        else{
          setRedirect(true);
        }
        // window.open("https://lunchserver-two.vercel.app/session", "_self");
      }
      console.log(response.data.data);
    }).catch((eror) => {
      //alert(eror.message);
    });
  },[]);
  useEffect(() => {
    axios.get('https://lunchtime-bice.vercel.app/users').then((response) => {
      if(response.data.message === 'User is here'){
        if(response.data.data.length > 0){
          let dt = response.data.data.filter((e) => {
            if(e.username === localStorage.getItem('username')){
              return false;
            }
            return true;
          });
          setUser(dt);
        }
      }
      else{
        alert(response.data.message);
      }
    }).catch((eror) => {
      //alert(eror.message);
    })
  }, []);
  const handleJoin = () => {
    axios.post('https://lunchtime-bice.vercel.app/session/join', {
      username: localStorage.getItem('username'),
      id: id
    }).then((response) => {
      if(response.data.message === 'Joined session'){
        window.open("https://lunchserver-two.vercel.app/session", "_self");
      }
      else if(response.data.message === 'Session is full'){
        alert('Session is full');
      }
      else if(response.data.message === 'Session already played'){
        window.open("https://lunchserver-two.vercel.app/history", "_self");
      }
    }).catch((eror) => {
      console.log(eror);
      if(eror.response.data.message === "Session already played"){
        window.open("https://lunchserver-two.vercel.app/history", "_self");
      }
    });
  }
  const handleCreate = () => {
    axios.post('https://lunchtime-bice.vercel.app/session', {
      username: localStorage.getItem('username')
    }).then((response) => {
      if(response.data.message === 'Session created'){
        window.open("https://lunchserver-two.vercel.app/session", "_self");
      }
      else if(response.data.message === "Session already present"){
        window.open("https://lunchserver-two.vercel.app/history", "_self");
      }
    }).catch((eror) => {
      console.log(eror);
      if(eror.response.data.message === "Session already present"){
        window.open("https://lunchserver-two.vercel.app/history", "_self");
      }
    });
  }
  const renderUser = () => {
    if(user.length === 0){
      return(
        <div>
          <h4>No Users to add</h4>
        </div>
      );
    }
    else{
      return user.map((e,key) => {
        return(
          <div key={key} className='row d-flex justify-content-center'>
            <div className='col-12 col-md-6 d-flex align-items-center'>
              <Label><h3>{e.username}</h3></Label>
            </div>
            <div className='col-12 col-md-3 d-flex align-items-center'>
              <Button onClick={() => {
                axios.post('https://lunchtime-bice.vercel.app/session/invite', {
                  user1: localStorage.getItem('username'),
                  user2: e.username,
                  email: e.email,
                  sessionId: sessionId
                }).then((response) => {
                  if(response.data.message === 'Invitation sent'){

                  }
                  else{
                    alert(response.data.message);
                  }
                }).catch((eror) => {
                  //alert(eror.message);
                })
              }}>Invite</Button>
            </div>
          </div>
        );
      })
    }
  }
  return (
    <div  style={{
      backgroundImage: `url(${Food})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      height: '100vh'
  }}>
    <Modal isOpen={redirect}>
      <ModalHeader>
        <h3>Redirect</h3>
      </ModalHeader>
      <ModalBody>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 d-flex align-items-center'>
            <h3>Click <a href='/session'>here</a> to redirect to the game session page</h3>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 d-flex align-items-center'>
            <Button onClick={() => setRedirect(!redirect)}>Close</Button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
        <NavCmp name={'History'} path={'history'} />
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
        <Modal isOpen={create}>
          <ModalHeader>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 d-flex align-items-center'>
                <h3>Invite your Friend</h3>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            {renderUser()}
          </ModalBody>
          <ModalFooter>
          <div className='row d-flex justify-content-center'>
            <div className='col-12 d-flex align-items-center'>
              <Button onClick={() => setCreate(!create)}>Close</Button>
            </div>
          </div>
          </ModalFooter>
        </Modal>
        <div className='container mt-5 pt-5' style={{
                background: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white background
                padding: '20px',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)', // Adjust the blur amount
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a shadow
            }}>
            <div className='row m-5 d-flex justify-content-center'>
              <div className='col-10 col-md-8 d-flex align-items-center'>
                <Form className='shadow'>
                  <FormGroup>
                    <div className='row m-5 d-flex justify-content-center'>
                        <div className='col-12 p-1 col-md-4'>
                          <Button className ='btn btn-info shadow' onClick={() => {
                            setJoin(!join);
                          }}>Join Session</Button>
                        </div>
                        <div className='col-12 p-1 col-md-4'>
                          <Button className ='btn btn-danger shadow' onClick={() => {
                            handleCreate();
                          }}>Create Session</Button>
                        </div>
                        <div className='col-12 p-1 col-md-4'>
                          <Button className ='btn btn-danger shadow' onClick={() => {
                            setCreate(!create);
                          }}>Invite Friend</Button>
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