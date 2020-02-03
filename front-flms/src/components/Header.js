import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import Button from 'reactstrap/es/Button';

const Header = () => {
    const handleSignOut = () => {
        sessionStorage.removeItem('jwtToken');
    };

    const navContent = () => {
        if (sessionStorage.getItem('jwtToken')) {
            return (
                <NavItem className="mr-4">
                    <Link to="/pluginsList"><Button>Liste des plugins</Button></Link>
                    <Link to="/publishPlugin"><Button>Publier un plugin</Button></Link>
                    <Button onClick={handleSignOut}>Déconnexion</Button>
                </NavItem>
            );
        }
        return (
            <NavItem className="mr-4">
                <Link to="/pluginsList"><Button>Liste des plugins</Button></Link>
                <Link to="/login"><Button>Connexion</Button></Link>
                <Link to="/register"><Button>Inscription</Button></Link>
            </NavItem>
        );
    };

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand className="mr-auto">Store FLMS</NavbarBrand>
            <Nav navbar className="mr-2">
                {navContent()}
            </Nav>
        </Navbar>
    );
};

export default Header;
