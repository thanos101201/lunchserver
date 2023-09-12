import React, { useEffect, useState } from 'react'
import NavCmp from './NavCmp'
import { Button, Form, FormGroup, Label } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Food from '../assets/food.jpeg';

function GameSession() {
    useEffect(() => {
        const user = localStorage.getItem('username');
        //alert(window.path);
        if(user === null && window.path !== '/signup'){
          window.open("http://localhost:3000", "_self");
        }
      }, []);
    useEffect(() => {
        const user = localStorage.getItem('username');
        axios.get(`https://lunchserver-tau.vercel.app/session/active/${user}`).then(async (response) => {
            if(response.data.data !== undefined && response.data.data.length > 0){
                if(Object.keys(response.data.data[0].scores).length === 1){
                    window.open("https://lunchserver-tau.vercel.app/home","_self");
                }
                if(response.data.data[0].counts[user] >= 9){
                    window.open("http://localhost:3000/history","_self");
                }
                setSessionId(response.data.data[0]._id);
                setCount(response.data.data[0].counts[user]);
                if(response.data.data[0].count >= 9){
                    window.open("http://localhost:3000/history", "_self");
                }
                axios.get(`https://lunchserver-tau.vercel.app/session/question/${response.data.data[0].restaurantName}`).then((response2) => {
                    setOption1(response2.data.data[0]);
                    setOption2(response2.data.data[1]);
                    setOption3(response2.data.data[2]);
                    axios.get(`https://lunchserver-tau.vercel.app/user/${user}`).then((response3) => {
                        if(response3.data.status === 200 && response3.data.message === 'User is here'){
                            setGoal(parseInt(response3.data.data.goal));
                        }
                    }).catch((eror3) => {
                        //alert(eror3.message);
                    });
                }).catch((er2) => {
                    //alert(er2.message);
                });
            }
        }).catch((eror) => {
            //alert(eror.message);
        });
    }, []);
  const [ count, setCount ] = useState(0);
  const [ sessionId, setSessionId ] = useState("");
  const [ goal,setGoal ] = useState(0);
  const [ score, setScore ] = useState(0);
  const [ option1, setOption1 ] = useState({ name: "Option 1" });
  const [ option2, setOption2 ] = useState({ name: "Option 2" });
  const [ option3, setOption3 ] = useState({ name: "Option 3" });
  const updatePoints = async() => {
    let scr = 2;
    if(count >= 9){
        window.open("http://localhost:3000/history", "_self");
    }
    let ar = [ option1.score[goal], option2.score[goal], option3.score[goal]]
    ar.sort((a,b) => a-b);
    if(score === ar[1]){
        scr = 5;
    }
    else if(score === ar[2]){
        scr = 10;
    }
    return axios.put('https://lunchserver-tau.vercel.app/session', {
        user: localStorage.getItem('username'),
        score: scr,
        session: sessionId
    }).then((response) => {
        if(response.data.message === 'Option is here'){
            setOption1(response.data.data[0]);
            setOption2(response.data.data[1]);
            setOption3(response.data.data[2]);
        }
        else{
            //alert(response.data.message);
        }
    }).catch((eror) => {
        //alert(eror.message);
    })
  }
  const renderNext = () => {
    if(count < 10){
        return(
            <div className='col-12'>
                <Button className='btn btn-success' onClick={async() => {
                    setCount(count+1);
                    await updatePoints();
                }}>
                    Next
                </Button>
            </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
  }
  return (
    <div style={{
        backgroundImage: `url(${Food})`,  // Set the background image using the imported variable
        backgroundSize: 'cover',           // Cover the entire container
        backgroundPosition: 'center',      // Center the background image
        backgroundRepeat: 'no-repeat',
        height: '100vh' // Add this to make z-index work
    }}>
    <NavCmp name={'History'} path={'history'} />
    <div className='container mt-5'  style={{
                background: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white background
                padding: '20px',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)', // Adjust the blur amount
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a shadow
            }}>
        <div className='row d-flex justify-content-center mt-5'>
            <div className='col-6 d-flex align-items-center shadow'>
                <Form className='m-3'>
                    <FormGroup>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-12 d-flex align-items-center'>
                                <Label>
                                    <h2>Count : {count} </h2>
                                </Label>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row d-flex justify-content-center'>
                            <Button className='btn btn-success col-12 d-flex align-items-center shadow' onClick={() => setScore(option1.score[goal])} >
                                <h3>{option1.name}</h3>
                            </Button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row d-flex justify-content-center'>
                            <Button className='btn btn-warning col-12 d-flex align-items-center shadow' onClick={() => setScore(option2.score[goal])}>
                                <h3>{option2.name}</h3>
                            </Button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row d-flex justify-content-center'>
                            <Button className='btn btn-danger col-12 d-flex align-items-center shadow' onClick={() => setScore(option3.score[goal])}>
                                <h3>{option3.name}</h3>
                            </Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </div>
        <div className='row m-3'>
            {renderNext()}
        </div>
    </div>
    </div>
  )
}

export default GameSession;