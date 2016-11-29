import React from 'react'
import axios from 'axios'

export default class Favorites extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentWillMount() {
        this.displayFavorites()
    }

    loadFavorites() {
        axios.get('/api/favorites')
            .then((resp) => {
                console.log(`Get Favorites resp: ${resp}`)
                this.setState({list: resp})
            })
            .catch((err) => {
                console.log(`loadFavorites error: ${err}`)
            })
    }

    displayFavorites() {
        return this.state.list.map(e => (
            <div>
                <img src={'https://image.tmdb.org/t/p/w500' + e.poster_path} />
                <h2>{e.title}</h2> 
                <p>{e.vote_average}</p> 
                <p>{e.overview}</p>
            </div>
        ))
    }

    render() {
        return (
            <div>
                
            </div>
            )
        }
}