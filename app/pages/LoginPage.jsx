import React, { PropTypes as T } from 'react'
import AuthService from '../Auth0Lock.jsx'
import {Jumbotron, ButtonToolbar, Button} from 'react-bootstrap'

class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { auth } = this.props
        return (
            <Jumbotron>
                <h2>
                    <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
                </h2>
                <div>
                    <h2>Login</h2>
                    <ButtonToolbar>
                        <Button onClick={auth.login.bind(this)}>Login</Button>
                    </ButtonToolbar>
                </div>
            </Jumbotron>
            )
        }
    }

LoginPage.contextTypes = {
    router: T.object
}

LoginPage.propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
}

export default LoginPage
