import React, { useState } from 'react'
import NavCmp from './NavCmp'
import { Button, Form, FormGroup } from 'reactstrap'

function GameSession() {
  const [ count, setCount ] = useState(0);
  const renderNext = () => {
    if(count < 10){
        return(
            <div className='col-12'>
                <Button className='btn btn-success' onClick={() => setCount(count+1)}>
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
                                <h3>Option 1</h3>
                            </Button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row d-flex justify-content-center'>
                            <Button className='btn btn-warning col-12 d-flex align-items-center shadow'>
                                <h3>Option 2</h3>
                            </Button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className='row d-flex justify-content-center'>
                            <Button className='btn btn-danger col-12 d-flex align-items-center shadow'>
                                <h3>Option 3</h3>
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

export default GameSession