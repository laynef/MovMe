import React from 'react'
import { Link } from 'react-router'

let menuItems = [
    "Home",
    "User",
    "Selector",
    "Favorites"
]

let MenuElements = menuItems.map(e => {
    let linkName = e.replace(/[^a-z]/ig, '').toLowerCase()
    if (e === "Home") { linkName = "" }
    return (
        <li>
            <Link to={"/" + linkName}>{e}</Link>
        </li>
    )
})

class Menu extends React.Component {

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

module.exports = Menu