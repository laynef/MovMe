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
        this.loadFavorites()
    }    

    loadFavorites() {
        axios.get('/api/favorites')
            .then((resp) => {
                this.setState({list: resp.data})
            })
            .catch((err) => {
                console.log(`loadFavorites error: ${err}`)
            })
    }

    deleteFavorite(index) {
        var self = this
            axios({
                method: 'DELETE',
                url: '/api/favorites',
                data: {
                    id: self.state.list[index].id
                }
            })
            .then((resp) => {
                console.log(`Successful delete`)
            })
            .catch((err) => {
                console.log(`Error in deleting favorite: ${err}`)
            })
        let copy = this.state.list.slice()
        copy.splice(index, 1)
        this.setState({list: copy})
    }

    displayFavorites() {
        return this.state.list.map((e,i) => (
            <div className="favorite">
                <img src={'https://image.tmdb.org/t/p/w500' + e.poster_path} />
                <h2>{e.title}</h2> 
                <p>{e.vote_average}</p> 
                <p>{e.overview}</p>
                <button className="toggleBtn" onClick={this.deleteFavorite.bind(this, [i])}>Delete Me</button>
            </div>
        ))
    }

    render() {
        return (
            <div id="favoritesPage">
                {this.displayFavorites()}
            </div>
            )
        }
}