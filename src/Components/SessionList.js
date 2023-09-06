import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavCmp from './NavCmp';
import axios from 'axios';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Label } from 'reactstrap';
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
                alert(eror.message);
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
  return (
    <div>
        <NavCmp />
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <div className='col-12'>
                    <Accordion toggle={toggle} open={open} className='shadow'>
                        {renderAccordion()}
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SessionList