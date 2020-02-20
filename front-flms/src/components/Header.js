import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../actions/action';
import logo from '../assets/trumpet.png';

const Header = () => {
    const loggedIn = useSelector(state => state.loggedIn);

    const dispatch = useDispatch();

    const handleSignOut = () => {
        sessionStorage.removeItem('jwtToken');
        dispatch(allActions.logoutAction());
    };

    return (
        <Navbar className="justify-content-between" bg="dark" variant="dark">
            {loggedIn ?
                <Navbar.Brand> <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /><NavLink to="/pluginsList" className="title">Store FMLS</NavLink></Navbar.Brand>
                :
                <Navbar.Brand><img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /><NavLink to="/shop" className="title">Store FMLS</NavLink></Navbar.Brand>
            }
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav pullright="true">
                {loggedIn ?
                    <NavItem className="mr-sm-2">
                        <NavLink to="/publishPlugin"><Button variant="outline-light">Publier un plugin</Button></NavLink>
                        <NavLink to="/shop"><Button onClick={handleSignOut} variant="outline-light">Déconnexion</Button></NavLink>
                    </NavItem>
                    :
                    <NavItem className="mr-sm-2">
                        <NavLink to="/login"><Button variant="outline-light">Connexion</Button></NavLink>
                        <NavLink to="/register"><Button variant="outline-light">Inscription</Button></NavLink>
                    </NavItem>
                }
            </Nav>
        </Navbar>
    );
};

export default Header;
