import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import { Button, Nav, Navbar, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
function NavCmp() {
  const [ invite, setInvite ] = useState(false);
  const [ join, setJoin ] = useState(false);
  const [ id, setId ] = useState("");
  const [userList, setUserList ] = useState([]);
  return (
    <Navbar primary>
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
            <div className='row d-flex justify-content-center'>
              <div className='col-12 d-flex align-items-center'>
                {/* {renderUsers()} */}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 col-md-6 d-flex align-items-center'>
                <Button>Join</Button>
              </div>
              <div className='col-12 col-md-6 d-flex align-items-center'>
                <Button onClick={() => setInvite(!invite)}>Close</Button>
              </div>
            </div>
          </ModalFooter>
        </Modal>
        <NavItem>
            <NavLink>
                <h1>Lunch Time</h1>
            </NavLink>
        </NavItem>
    </Navbar>
  )
}

export default NavCmp