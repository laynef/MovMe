import React from 'react'

import Menu from '../component/Menu.jsx'

export default class MasterPage extends React.Component {

    render() {
        return (
            <div>
                <Menu />
                {this.props.children}
            </div>
            )
        }
}