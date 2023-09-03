import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavCmp from './NavCmp';
import axios from 'axios';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Label } from 'reactstrap';
function SessionList() {
    const [sessions, setSession] = useState([]);
    // useEffect(() => {
    //     axios.get('/session').then((response) => {
    //         if(response.data.message === 'Session list'){
    //             setSession(response.data.data);
    //         }
    //         else{
    //             setSession([]);
    //         }
    //     }).catch((eror) => {
    //         alert(eror.message);
    //     })
    // }, []);
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
                                {e._id}
                            </AccordionHeader>
                            <AccordionBody accordionId={cnt}>
                                <div className='row d-flex justify-content-center'>
                                    <div className='col-12 col-md-3 d-flex align-items-center'>
                                        <Label><strong>{localStorage.getItem('username')} : </strong></Label>
                                    </div>
                                    <div className='col-12 col-md-3 d-flex align-items-center'>
                                        <Label><strong>{e.socres.localStorage.getItem('username')} : </strong></Label>
                                    </div>
                                </div>
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
                <div className='col-12 col-md-8 d-flex align-items-center'>
                    <Accordion className='shadow'>
                        {renderAccordion()}
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SessionList