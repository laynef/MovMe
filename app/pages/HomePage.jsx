import React from 'react'

import Menu from '../component/Menu.jsx'

export default class HomePage extends React.Component {

    render() {
        return (
            <div>
                <h1>Welcome to MovMe!</h1>
                <Menu />
            </div>
            )
        }
}