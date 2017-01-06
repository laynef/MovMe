import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { axios } from 'axios'

import { SignUp } from './SignUp.jsx'

import { FormGroup, ControlLabel, FormControl, FormControlFeedback, HelpBlock, Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'react-bootstrap'

export default class Login extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {
            showModal: true,
            username: '',
            email: '',
            password: '',
            clicked: false
        }
        const fields = [
            {
                type: 'username',
                title: 'Username',
                placeholder: 'Enter username',
                func: () => {},
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
                func: () => {},
                help: 'The length of your password must be 8 or more characters'
            }
        ]
    }

    validEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.state.email);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
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
            <Modal>
                {this.state.clicked ?
                    (<SignUp />)
                    : (this.fields.map(e => (
                    <div>
                        <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
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
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.submitLogin}>Login</Button>
                            <Button onClick={this.signUp}>Sign Up</Button>
                        </Modal.Footer>
                    </div>
                    )))}
            </Modal>
            )
        }
}