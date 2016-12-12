import React from 'react'
import axios from 'axios'

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

const gambler = {
    'max-width': '30%',
    'margin': '0 auto',
    'text-align': 'center'
}

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
            <Card style={gambler}>
                <CardMedia overlay={<CardTitle title={e.title} />} >
                <img src={'https://image.tmdb.org/t/p/w500' + e.poster_path} />
                </CardMedia>
                <CardText>
                    <p className="movieRating">{e.vote_average}</p> 
                    <p className="movieSummary">{e.overview}</p>
                </CardText>
                <RaisedButton label="Delete Favorite" onClick={this.deleteFavorite.bind(this, [i])} />
            </Card>
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