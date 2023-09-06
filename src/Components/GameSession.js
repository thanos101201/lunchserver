import React, { useEffect, useState } from 'react'
import NavCmp from './NavCmp'
import { Button, Form, FormGroup } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function GameSession() {
    useEffect(() => {
        if(count >= 10){
            window.open("http://localhost:3000/history", "_self");
        }
        const user = localStorage.getItem('username');
        axios.get(`http://localhost:3001/session/active/${user}`).then((response) => {
            if(response.data.data !== undefined && response.data.data.length > 0){
                setSessionId(response.data.data._id);
                axios.get(`http://localhost:3001/session/question/${response.data.data[0].restaurantName}`).then((response2) => {
                    setOption1(response2.data.data[0]);
                    setOption2(response2.data.data[1]);
                    setOption3(response2.data.data[2]);
                    axios.get(`http://localhost:3001/user/${user}`).then((response3) => {
                        if(response3.data.status === 200 && response3.data.message === 'User is here'){
                            setGoal(parseInt(response3.data.data.goal));
                        }
                    }).catch((eror3) => {
                        alert(eror3.message);
                    });
                }).catch((er2) => {
                    alert(er2.message);
                });
            }
        }).catch((eror) => {
            alert(eror.message);
        });
    }, []);
  const [ count, setCount ] = useState(0);
  const [ sessionId, setSessionId ] = useState("");
  const [ goal,setGoal ] = useState(0);
  const [ score, setScore ] = useState(0);
  const [ option1, setOption1 ] = useState({ name: "Option 1" });
  const [ option2, setOption2 ] = useState({ name: "Option 2" });
  const [ option3, setOption3 ] = useState({ name: "Option 3" });
  const updateScore = async(score) => {
    const user = localStorage.getItem('username');
    return axios.put('http://localhost:3001/session', {
        user: user,
        session: sessionId,
        score: score
    }).then((response) => {
        if(response.status === 200 && response.data.message === "Option is here"){
            setScore(0);
            setOption1(response.data.data[0]);
            setOption2(response.data.data[1]);
            setOption3(response.data.data[2]);
        }
        else{
            setOption1({ name: "Option 1" });
            setOption2({ name: "Option 2" });
            setOption3({ name: "Option 3" });
        }
    }).catch((eror) => {
        alert(eror.message);
    });
  }
  const updatePoints = () => {
    
  }
  const renderNext = () => {
    if(count < 10){
        return(
            <div className='col-12'>
                <Button className='btn btn-success' onClick={async() => {
                    setCount(count+1);
                    await updateScore();
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
    <>
    <NavCmp />
    <div className='container'>
        <div className='row d-flex justify-content-center mt-5'>
            <div className='col-6 d-flex align-items-center shadow'>
                <Form className='m-3'>
                    <FormGroup>
                        <div className='row d-flex justify-content-center'>
                            <Button className='btn btn-success col-12 d-flex align-items-center shadow'>
                                <h3>{option1.name}</h3>
                            </Button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row d-flex justify-content-center'>
                            <Button className='btn btn-warning col-12 d-flex align-items-center shadow'>
                                <h3>{option2.name}</h3>
                            </Button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row d-flex justify-content-center'>
                            <Button className='btn btn-danger col-12 d-flex align-items-center shadow'>
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
    </>
  )
}

export default GameSession;