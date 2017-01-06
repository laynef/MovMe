import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { axios } from 'axios'

import SignUp from '../component/SignUp.jsx'

export default class LoginPage extends React.Component {

    render() {
        return (
            <div>
                <SignUp />
            </div>
            )
        }
}