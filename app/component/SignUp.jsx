import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { axios } from 'axios'

export default class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
            rePassword: ''
        }
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
        if (this.validEmail() &&
             this.samePassword() &&
             this.validPassword()) {
                 this.signMeUp()
             }
    }

    render() {
        return (
            <form>
                <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
                >
                <ControlLabel>Username</ControlLabel>
                <FormControl
                    type="text"
                    name="username"
                    value={this.state.username}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>

                <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
                >
                <ControlLabel>Email</ControlLabel>
                <FormControl
                    type="text"
                    name="email"
                    value={this.state.email}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>

                <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
                >
                <ControlLabel>Password</ControlLabel>
                <FormControl
                    type="text"
                    name="password"
                    value={this.state.password}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>

                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                <ControlLabel>Re-Password</ControlLabel>
                <FormControl
                    type="text"
                    name="rePassword"
                    value={this.state.rePassword}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>

                
            </form>
            )
        }
}