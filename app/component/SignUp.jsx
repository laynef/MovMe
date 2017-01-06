import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { axios } from 'axios'

import { Button, FormGroup, ControlLabel, FormControl, FormControlFeedback, HelpBlock } from 'react-bootstrap'

export default class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
            rePassword: '',
            fields: [
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
                    func: this.validPassword.bind(this),
                    help: 'The length of your password must be 8 or more characters'
                },
                {
                    type: 'rePassword',
                    title: 'Confirm Password',
                    placeholder: 'Re-Enter password',
                    func: this.samePassword.bind(this),
                    help: 'The passwords do not match'
                }
            ]
        }
    }

    placeholderFunc() {
        console.log(`placeholder`)
    }

    samePassword() {
        return this.state.password === this.state.rePassword
    }

    validEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.state.email);
    }

    validPassword() {
        return this.state.password.length >= 8
    }

    noEmpties() {
        return (
                    this.state.email === '' &&
                     this.state.username === '' &&
                     this.state.password === '' &&
                     this.state.rePassword === ''
                )
    }

    handleChange(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
 
    signMeUp() {
        axios.post('/api/user/register', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        })
        .then((resp) => {
            console.log(`register successful`)
        })
    }

    handleSubmit() {
        return (
                    this.validEmail() &&
                    this.validPassword() &&
                    this.samePassword() &&
                    this.signMeUp()
                )
    }

    render() {
        return (
            <div id="signUpPage">
                <h1>Sign Up</h1>
                <form>
                    {this.state.fields.map(e => (
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
                    ))}
                </form>
                <Button onClick={this.handleSubmit}>Sign Up</Button>
            </div>
            )
        }
}