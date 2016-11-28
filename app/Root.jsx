import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import MasterPage from './pages/MasterPage.jsx'

import styles from './sass/index.scss'

class Root extends React.Component {

    render() {
        return (
            <Router history={ browserHistory }>
                <Route path="/" component={ MasterPage }>

                </Route>
            </Router>
            )
        }
}

ReactDOM.render(<Root />, document.getElementById('app'))