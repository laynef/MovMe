import React from 'react'

import Menu from '../component/Menu.jsx'

class MasterPage extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Menu />
                { this.props.children }
            </div>
            )
        }
}

module.exports = MasterPage