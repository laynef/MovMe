import React from 'react'
import axios from 'axios'
import config from '../../config.js'

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

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

    getMovieInfo() {
        axios.get('/api/movies')
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
                    <Card>
                        <CardMedia overlay={<CardTitle title={this.state.currMovie.title} />} >
                        <img src={'https://image.tmdb.org/t/p/w500' + this.state.currMovie.poster_path} />
                        </CardMedia>
                        <CardText>
                            <p className="movieRating">{this.state.currMovie.vote_average}</p> 
                            <p className="movieSummary">{this.state.currMovie.overview}</p>
                        </CardText>
                        <RaisedButton label="Prev" onClick={this.lastMovie.bind(this)} />
                        <RaisedButton label="Fav" onClick={this.submitFavorite.bind(this)} />
                        <RaisedButton label="Next" onClick={this.nextMovie.bind(this)} />
                    </Card>
            </div>
            )
        }
}