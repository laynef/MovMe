import React from 'react'
import { Link, browserHistory } from 'react-router'

let menuItems = [
    "Home",
    "Selector",
    "Favorites"
]

let MenuElements = menuItems.map(e => {
    let linkName = "/" + e.replace(/[^a-z]/ig, '').toLowerCase()
    if (e === "Home") { linkName = "" }
    return (
        <li>
            <Link to={linkName}>{e}</Link>
        </li>
    )
})

export default class Menu extends React.Component {

    render() {
        return (
            <div id="sideMenu">
                <ul>
                    {MenuElements}
                </ul>
            </div>
            )
        }
}