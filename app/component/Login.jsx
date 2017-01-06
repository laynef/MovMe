import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import axios from 'axios'

import { FormGroup, ControlLabel, FormControl, FormControlFeedback, HelpBlock, Button } from 'react-bootstrap'

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            clicked: false,
            fields : [
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
                    func: this.placeholderFunc.bind(this),
                    help: 'The length of your password must be 8 or more characters',
                    change: this.handlePasswordChange.bind(this)
                }
            ]
        }
    }

    placeholderFunc() {
        console.log(`placeholder`)
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

    validEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.state.email);
    }

    submitLogin() {
        axios.post('/api/login', {
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
            <div id="loginPage">
                <h1>Login</h1>
                    {this.state.fields.map(e => (
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
                                    onChange={e.change}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{e.help}</HelpBlock>
                            </FormGroup>
                        </form>
                    ))}
                <Button onClick={this.submitLogin}>Login</Button>
                <Button><Link to="/signUp">Sign Up</Link></Button>
            </div>
            )
        }
}