import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import config from '../config.js'

import HomePage from './pages/HomePage.jsx'
import MasterPage from './pages/MasterPage.jsx'
import SelectorPage from './pages/SelectorPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

import styles from './sass/index.scss'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

import AuthService from './Auth0Lock.jsx'
const auth = new AuthService(config.authFirst, config.authSecond)

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

ReactDOM.render((
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={MasterPage}>
            <IndexRoute component={HomePage}/>
                <Route path="/selector" component={SelectorPage}/>
                <Route path="/favorites" component={FavoritesPage} onEnter={requireAuth} />
                <Route path="/login" component={LoginPage} auth={auth} />
            </Route>
        </Router>
    </MuiThemeProvider>
), document.getElementById('app'))