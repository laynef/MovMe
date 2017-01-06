import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import MasterPage from './pages/MasterPage.jsx'
import SelectorPage from './pages/SelectorPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'

import styles from './sass/index.scss'

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={MasterPage}>
            <IndexRoute component={SelectorPage}/>
                <Route path="/favorites" component={FavoritesPage}/>
                <Route path="/details" component={DetailsPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/signUp" component={SignUpPage}/>
            </Route>
        </Router>
), document.getElementById('app'))