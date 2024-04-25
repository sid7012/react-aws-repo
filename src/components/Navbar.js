import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "./Auth/Account";
import { Navbar as BootstrapNavbar, Container, Button } from "react-bootstrap";

const Navbar = () => {
  const { isLoggedIn,userAttributes, logout} = useContext(AccountContext);
  const userName = userAttributes ? userAttributes["name"] : null;

  return (
    <BootstrapNavbar className="bg-body-tertiary">
      <Container>
        <BootstrapNavbar.Brand href="#home">My App</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse className="justify-content-end">
          <BootstrapNavbar.Text>
            {isLoggedIn ? (
              <>
              <span>Hello, {userName}</span> 
              <Link to="/changepassword">Foreget your password?Click here</Link>
              <Button className="primary ml-2" onClick={logout}>Logout</Button>
            </>
              
            ) : (
              <Link to="/login">Login</Link>
            )}
          </BootstrapNavbar.Text>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
