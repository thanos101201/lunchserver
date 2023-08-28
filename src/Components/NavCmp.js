import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import { Button, Nav, Navbar, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
function NavCmp() {
  const [ invite, setInvite ] = useState(false);
  const [ join, setJoin ] = useState(false);
  const [ id, setId ] = useState("");
  return (
    <Navbar primary>
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
                <Input placeholder='Session Id' onChange={(e) => setId(e.target.value33)} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 d-flex align-items-center'>
                <Button>Join</Button>
              </div>
            </div>
          </ModalFooter>
        </Modal>
        <Modal isOpen={invite}>
          <ModalHeader>
            <h3>Join a Group</h3>
          </ModalHeader>
          <ModalBody>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 col-md-4 d-flex align-items-center'>
                <Label><strong>Session Id : </strong></Label>
              </div>
              <div className='col-12 col-md-4 d-flex align-items-center'>
                <Input placeholder='Session Id' onChange={(e) => setId(e.target.value33)} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 d-flex align-items-center'>
                <Button>Join</Button>
              </div>
            </div>
          </ModalFooter>
        </Modal>
        <NavItem>
            <NavLink>
                <h1>Lunch Time</h1>
            </NavLink>
        </NavItem>
        <NavItem>
            <Button>Join</Button>
        </NavItem>
        <NavItem>
            <Button>Sessions</Button>
        </NavItem>
        <NavItem>
            <Button>Invite</Button>
        </NavItem>
    </Navbar>
  )
}

export default NavCmp