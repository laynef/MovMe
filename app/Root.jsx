import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import HomePage from './pages/HomePage.jsx'
import SelectorPage from './pages/SelectorPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'

import styles from './sass/index.scss'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={HomePage}>
            <Route path="selector" component={SelectorPage}/>
            <Route path="favorites" component={FavoritesPage}/>
        </Route>
    </Router>
), document.getElementById('app'))