import React from 'react'
import axios from 'axios'
import config from '../../config'

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
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key + '&sort_by=popularity.desc')
            .then((resp) => {
                console.log(`$Getting resp: ${resp.data.results[0]}`)
                this.setState({ currMovie: resp.data.results[this.state.movieIndex]})
            })
            .catch((err) => {
                console.log(`getMovieInfo error: ${err}`)
            })
    }

    postMovieInfo() {
        axios.post('/api/favorites')
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
                <input type="submit" value="fav" />
                <input type="submit" value="next" onClick={this.nextMovie.bind(this)} />

            </div>
            )
        }
}