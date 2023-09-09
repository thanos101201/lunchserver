import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavCmp from './NavCmp';
import axios from 'axios';
import Food from '../assets/food.jpeg';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardHeader, Label } from 'reactstrap';
function SessionList() {
    const [sessions, setSession] = useState([]);
    const [ open, setOpen ] = useState("");

    const toggle = (e) => {
        if(open === e){
            setOpen("");
        }
        else{
            setOpen(e);
        }
    }
    useEffect(() => {
        if(typeof localStorage !== 'undefined'){
            const user = localStorage.getItem('username');
            console.log(user);
            axios.get(`http://localhost:3001/session/active/${user}`).then((response) => {
                if(response.data.message === 'Session is here'){
                    console.log(response.data.data);
                    setSession(response.data.data);
                }
            }).catch((eror) => {
                // alert(eror.message);
            });
        }
    }, []);
    const renderScores = (session) => {
        if(session.scores.length === 0){
            return(
                <div></div>
            );
        }
        else{
            return Object.keys(session.scores).map((e,key) => {
                return(
                    <div className='row d-flex justify-content-center'>
                        <div className='col-12 col-md-8 d-flex align-items-center'>
                            <Label><strong>{e} :</strong></Label>
                        </div>
                        <div className='col-12 col-md-3 d-flex align-items-center'>
                            <Label><strong>{session.scores[e]}  </strong></Label>
                        </div>
                    </div>
                );
            })
        }
    }
    const renderAccordion = () => {
        if(sessions.length === 0){
            return <div></div>
        }
        else{
            let cnt = 0;
            return sessions.map((e,key) => {
                return(
                        <AccordionItem key={key}>
                            <AccordionHeader targetId={cnt}>
                                <div className='row d-flex justify-content-center'>
                                    <div className='col-12 d-flex align-items-center'>
                                        <h4>{e.date}</h4>
                                    </div>
                                </div>
                            </AccordionHeader>
                            <AccordionBody accordionId={cnt}>
                                <div className='row d-flex justify-content-center'>
                                    <div className='col-12 col-md-8 d-flex align-items-center'>
                                        <Label><strong>Session Id :</strong></Label>
                                    </div>
                                    <div className='col-12 col-md-3 d-flex align-items-center'>
                                        <Label><strong>{e._id}  </strong></Label>
                                    </div>
                                </div>
                                {renderScores(e)}
                            </AccordionBody>
                        </AccordionItem>
                );
            })
        }
    }
    const renderCards = () => {
        if(sessions.length === 0){
            return(
                <div>
                    <h3>No history</h3>
                </div>
            );
        }
        else{
            return sessions.map((e,key) => {
                return(
                    <div className='col-12 col-md-4'>
                        <Card key={key} className='shadow' style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '20px',
                            borderRadius: '10px',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}>
                            <CardHeader>
                                <div className='row d-flex justify-content-center'>
                                    <div className='col-12 col-md-6'>
                                        <h4>{e.date}</h4>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className='row d-flex justify-content-center'>
                                    <div className='col-12 col-md-3 d-flex align-items-center'>
                                        <Label><strong>Session Id :</strong></Label>
                                    </div>
                                    <div className='col-12 col-md-8 d-flex align-items-center'>
                                        <Label><strong>{e._id}  </strong></Label>
                                    </div>
                                </div>
                                {renderScores(e)}
                            </CardBody>
                        </Card>
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
        <NavCmp name={'Home'} path={'home'} />
        <div className='container' style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '20px',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
            <div className='row d-flex justify-content-center'>
                {renderCards()}
            </div>
        </div>
    </div>
  )
}

export default SessionList