import Axios from '../utils/axios';
import React from 'react';
import {
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useUserContext } from '../context/userContext';

const Header = () => {
  const {
    userState: { isAuthenticated },
    dispatch,
  } = useUserContext();
  const handleLogout = async () => {
    dispatch('UNSET_USER');
    try {
      await Axios.get(`/auth/logout`);
    } catch (error) {
      console.log('error in logout');
    }
  };
  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Social Media V1
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {!isAuthenticated ? (
              <>
                <Nav.Link className='navbar__items' as={Link} to='/register'>
                  Sign Up
                </Nav.Link>
                <Nav.Link className='navbar__items' as={Link} to='/login'>
                  Log In
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to='/' className='navbar__items'>
                  <OverlayTrigger
                    placement='bottom'
                    overlay={<Tooltip id='tooltip-add-post'>Home</Tooltip>}
                  >
                    <i className='fas fa-home icon'></i>
                  </OverlayTrigger>
                </Nav.Link>

                <Nav.Link as={Link} to='/new/post' className='navbar__items'>
                  <OverlayTrigger
                    placement='bottom'
                    overlay={<Tooltip id='tooltip-add-post'>Add Post</Tooltip>}
                  >
                    <i className='fas fa-plus icon'></i>
                  </OverlayTrigger>
                </Nav.Link>

                <Nav.Link as={Link} to={`/me`} className='navbar__items'>
                  <OverlayTrigger
                    placement='bottom'
                    overlay={<Tooltip id='tooltip-add-post'>Profile</Tooltip>}
                  >
                    <i className='fas fa-user icon'></i>
                  </OverlayTrigger>
                </Nav.Link>

                <Nav.Link onClick={handleLogout} className='navbar__items'>
                  <OverlayTrigger
                    placement='bottom'
                    overlay={<Tooltip id='tooltip-add-post'>Logout</Tooltip>}
                  >
                    <i className='fas fa-sign-out-alt icon'></i>
                  </OverlayTrigger>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
