require('dotenv').config()
import React from 'react'
import axios from 'axios'

export default class Selector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movieIndex: 0,
            currMovie: {
                "poster_path": "/9HE9xiNMEFJnCzndlkWD7oPfAOx.jpg",
                "adult": false,
                "overview": "In 1926, Newt Scamander arrives at the Magical Congress of the United States of America with a magically expanded briefcase, which houses a number of dangerous creatures and their habitats. When the creatures escape from the briefcase, it sends the American wizarding authorities after Newt, and threatens to strain even further the state of magical and non-magical relations.",
                "release_date": "2016-11-16",
                "genre_ids": [
                    10751,
                    12,
                    14
                ],
                "id": 259316,
                "original_title": "Fantastic Beasts and Where to Find Them",
                "original_language": "en",
                "title": "Fantastic Beasts and Where to Find Them",
                "backdrop_path": "/6I2tPx6KIiBB4TWFiWwNUzrbxUn.jpg",
                "popularity": 69.552406,
                "vote_count": 659,
                "video": false,
                "vote_average": 7.2
            }
        }
    }

    getMovieInfo() {
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=de4f44a3c638131546b994dc9d2e602c&sort_by=popularity.desc', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
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