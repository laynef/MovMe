import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import { MasterPage, SelectorPage, HomePage, LoginPage, FavoritesPage } from './pages/exports.jsx'

import styles from './sass/index.scss'

class Root extends React.Component {

    render() {
        return (
            <Router history={ browserHistory }>
                <Route path="/" component={ MasterPage }>
                <IndexRoute component={ HomePage }/>
                    <Route path="user" component={ LoginPage }/>
                    <Route path="selector" component={ SelectorPage }/>
                    <Route path="favorites" component={ FavoritesPage }/>
                </Route>
            </Router>
            )
        }
}

ReactDOM.render(<Root />, document.getElementById('app'))