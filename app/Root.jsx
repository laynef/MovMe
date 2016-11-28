import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import MasterPage from './pages/MasterPage.jsx'
import HomePage from './pages/HomePage.jsx'

import styles from './sass/index.scss'

class Root extends React.Component {

    render() {
        return (
            <Router history={ browserHistory }>
                <Route path="/" component={ MasterPage }>
                <IndexRoute component={ HomePage }/>
                    <Route path="/user" />
                    <Route path="/selector" />
                    <Route path="/favorites" />
                </Route>
            </Router>
            )
        }
}

ReactDOM.render(<Root />, document.getElementById('app'))