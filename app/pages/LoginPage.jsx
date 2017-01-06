import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { axios } from 'axios'

import Login from '../component/Login.jsx'

export default class LoginPage extends React.Component {

    render() {
        return (
            <div>
                <Login />
            </div>
            )
        }
}