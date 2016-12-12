import React from 'react'

export default class HomePage extends React.Component {

    render() {
        return (
            <div>
                <h1>Welcome to MovMe!</h1>
                {this.props.children}
            </div>
            )
        }
}