import React from 'react'
import axios from 'axios'
import config from '../../config'

export default class Selector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movieIndex: 0,
            currMovie: config.firstMovie
        }
    }

    getMovieInfo() {
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key + '&sort_by=popularity.desc')
            .then((resp) => {
                this.setState({ currMovie: resp.data.results[this.state.movieIndex]})
            })
            .catch((err) => {
                console.log(`getMovieInfo error: ${err}`)
            })
    }

    postMovieInfo() {
        axios.post('/api/favorites')
            .then((resp) => {
                console.log(`Posting resp: ${resp}`)
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
                <div>
                    <img src={'https://image.tmdb.org/t/p/w500' + this.state.currMovie.poster_path} />
                    <h2>{this.state.currMovie.title}</h2> 
                    <p>{this.state.currMovie.vote_average}</p> 
                    <p>{this.state.currMovie.overview}</p>
                </div>

                <input type="submit" value="prev" onClick={this.lastMovie.bind(this)} />
                <input type="submit" value="fav" onClick={this.submitFavorite.bind(this)} />
                <input type="submit" value="next" onClick={this.nextMovie.bind(this)} />

            </div>
            )
        }
}