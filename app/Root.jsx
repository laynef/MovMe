import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HomePage from './pages/HomePage.jsx'
import MasterPage from './pages/MasterPage.jsx'
import SelectorPage from './pages/SelectorPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'

import styles from './sass/index.scss'

ReactDOM.render((
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={MasterPage}>
            <IndexRoute component={HomePage}/>
                <Route path="/selector" component={SelectorPage}/>
                <Route path="/favorites" component={FavoritesPage}/>
            </Route>
        </Router>
    </MuiThemeProvider>
), document.getElementById('app'))