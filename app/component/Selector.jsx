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
                <div id="selector">
                    <img className="movieImage" src={'https://image.tmdb.org/t/p/w500' + this.state.currMovie.poster_path} />
                    <h2 className="movieTitle">{this.state.currMovie.title}</h2> 
                    <p className="movieRating">{this.state.currMovie.vote_average}</p> 
                    <p className="movieSummary">{this.state.currMovie.overview}</p>
                </div>

                <input className="toggleBtn" type="submit" value="prev" onClick={this.lastMovie.bind(this)} />
                <input className="toggleBtn" type="submit" value="fav" onClick={this.submitFavorite.bind(this)} />
                <input className="toggleBtn" type="submit" value="next" onClick={this.nextMovie.bind(this)} />

            </div>
            )
        }
}