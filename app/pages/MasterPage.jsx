import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { NavbarHeader, NavbarToggle, NavbarCollapse, NavbarBrand, Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'

import { Login } from '../component/Login.jsx'

export default class MasterPage extends React.Component {

    render() {
        return (
            <div className="master">
                  <Navbar fixedTop inverse collapseOnSelect>
                    <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">MovMe</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1}><Link className="topNavLink" to="/favorites">Favorites</Link></NavItem>
                        <NavItem eventKey={1}><Link className="topNavLink" to="/login">Login</Link></NavItem>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {this.props.children}
            </div>
            )
        }
}