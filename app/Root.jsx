import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SelectorPage from './pages/SelectorPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'

import styles from './sass/index.scss'

class Root extends React.Component {

    render() {
        return (
            <Router history={ browserHistory }>
                <Route path="/" component={ HomePage }>
                    <Route path="/user" component={ LoginPage }/>
                    <Route path="/selector" component={ SelectorPage }/>
                    <Route path="/favorites" component={ FavoritesPage }/>
                </Route>
            </Router>
            )
        }
}

ReactDOM.render(<Root />, document.getElementById('app'))