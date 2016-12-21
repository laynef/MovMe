import React from 'react'
import axios from 'axios'

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

const gambler = {
    'max-width': '30%',
    'margin': '0 auto',
    'text-align': 'center'
}

export default class Selector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movieIndex: 0,
            list: [],
            currMovie: {}
        }
    }

    componentWillMount() {
        this.getMovieInfo()
    }

    getPopMovieInfo() {
        axios.get('/api/pop')
            .then((resp) => {
                this.setState({ list: resp.data })
                this.setState({ currMovie: this.state.list[this.state.movieIndex] })
            })
            .catch((err) => {
                console.log(`getMovieInfo error: ${err}`)
            })
    }

    postMovieInfo() {
        axios.post('/api/favorites', {
                poster_path: this.state.currMovie.poster_path,
                title: this.state.currMovie.title,
                overview: this.state.currMovie.overview,
                vote_average: JSON.stringify(this.state.currMovie.vote_average)
            })
            .then((resp) => {
                console.log(`postMovieInfo successful`)
            })
            .catch((err) => {
                console.log(`postMovieInfo error: ${err}`)
            })
    }

    submitFavorite() {
        this.postMovieInfo()
    }

    nextMovie() {
        if (this.state.movieIndex < 20)
            this.setState({movieIndex: this.state.movieIndex+1})
            this.getMovieInfo()
    }

    lastMovie() {
        if (this.state.movieIndex > 0)
            this.setState({movieIndex: this.state.movieIndex-1})
            this.getMovieInfo()
    }

    render() {
        return (
            <div id="selectorPage">

            </div>
            )
        }
}