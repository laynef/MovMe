import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import axios from 'axios'

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
                    help: '',
                    change: this.handleUsernameChange.bind(this)
                },
                {
                    type: 'email',
                    title: 'Email',
                    placeholder: 'Enter email',
                    func: this.validEmail.bind(this),
                    help: '',
                    change: this.handleEmailChange.bind(this)
                },
                {
                    type: 'password',
                    title: 'Password',
                    placeholder: 'Enter password',
                    func: this.validPassword.bind(this),
                    help: 'The length of your password must be 8 or more characters',
                    change: this.handlePasswordChange.bind(this)
                },
                {
                    type: 'rePassword',
                    title: 'Confirm Password',
                    placeholder: 'Re-Enter password',
                    func: this.samePassword.bind(this),
                    help: 'The passwords do not match',
                    change: this.handleRePasswordChange.bind(this)
                }
            ]
        }
    }

    placeholderFunc() {
        console.log(`placeholder`)
    }

    samePassword() {
        console.log(`hit same`)
        return this.state.password === this.state.rePassword
    }

    validEmail() {
        console.log(`hit email`)
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.state.email);
    }

    validPassword() {
        console.log(`hit pass`)
        return this.state.password.length >= 8
    }

    noEmpties() {
        console.log(`hit empty`)
        return (
                    this.state.email !== '' &&
                     this.state.username !== '' &&
                     this.state.password !== '' &&
                     this.state.rePassword !== ''
                )
    }

    handleUsernameChange(e) {
        this.setState({username : e.target.value})
    }
    handlePasswordChange(e) {
        this.setState({password : e.target.value})
    }
    handleEmailChange(e) {
        this.setState({email : e.target.value})
    }
    handleRePasswordChange(e) {
        this.setState({rePassword : e.target.value})
    }
 
    signMeUp() {
        axios.post('/api/register', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        })
        .then((resp) => {
            console.log(`register successful`)
        })
    }

    handleSubmit() {
        return this.noEmpties() && this.validEmail() && this.validPassword() && this.samePassword() && this.signMeUp()
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
                                onChange={e.change}
                            />
                            <FormControl.Feedback />
                            <HelpBlock>{e.help}</HelpBlock>
                        </FormGroup>
                    ))}
                </form>
                <Button onClick={this.handleSubmit.bind(this)}>Sign Up</Button>
            </div>
            )
        }
}