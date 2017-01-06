import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { NavbarHeader, NavbarToggle, NavbarCollapse, NavbarBrand, Navbar, Nav, NavItem, MenuItem, NavDropdown, FormGroup, ControlLabel, FormControl, FormControlFeedback, HelpBlock, Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'react-bootstrap'

import { SignUp } from '../component/SignUp.jsx'

export default class MasterPage extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {
            showModal: false,
            username: '',
            email: '',
            password: '',
            clicked: false
        }
        this.fields = [
            {
                type: 'username',
                title: 'Username',
                placeholder: 'Enter username',
                func: this.placeholderFunc.bind(this),
                help: ''
            },
            {
                type: 'email',
                title: 'Email',
                placeholder: 'Enter email',
                func: this.validEmail.bind(this),
                help: ''
            },
            {
                type: 'password',
                title: 'Password',
                placeholder: 'Enter password',
                func: this.placeholderFunc.bind(this),
                help: 'The length of your password must be 8 or more characters'
            }
        ]
    }

    placeholderFunc() {
        console.log(`placeholder`)
    }

    validEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.state.email);
    }

    openModal() {
        this.setState({ showModal: true })
    }
    closeModal() {
        this.setState({ showModal: false })
    }

    submitLogin() {
        axios.post('/api/user/login', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
        .then(resp => { console.log(`Successful Login`) })
    }

    signUp() {
        this.setState({ clicked: !this.state.clicked })
    }

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
                        <NavItem onClick={this.openModal} eventKey={2}>Login</NavItem>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    {this.state.clicked ?
                        (<SignUp />)
                        : (<div>
                                <Modal.Header closeButton>
                                    <Modal.Title>Login</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {this.fields.map(e => (
                                        <form>
                                            <FormGroup
                                            controlId="formBasicText"
                                            validationState={e.func}
                                            >
                                                <ControlLabel>{e.title}</ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name={e.type}
                                                    value={this.state[e.type]}
                                                    placeholder={e.placeholder}
                                                    onChange={this.handleChange}
                                                />
                                                <FormControl.Feedback />
                                                <HelpBlock>{e.help}</HelpBlock>
                                            </FormGroup>
                                    </form>
                                ))}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.submitLogin}>Login</Button>
                                <Button onClick={this.signUp}>Sign Up</Button>
                            </Modal.Footer>
                        </div>
                        )}
                </Modal>

                {this.props.children}
            </div>
            )
        }
}