import React from 'react'
import axios from 'axios'
import config from '../../config'

class Selector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movieIndex: 0,
            currMovie: {}
        }
    }
    // image => http://image.tmdb.org/t/p/
    getMovieInfo() {
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key + '&sort_by=popularity.desc')
            .then((resp) => {
                this.setState({ currMovie: resp.results[movieIndex]})
            })
            .catch((err) => {
                console.log(`getMovieInfo error: ${err}`)
            })
    }

    nextMovie() {
       this.setState({movieIndex: this.state.movieIndex++})
    }

    lastMovie() {
        if (this.state.movieIndex > 0)
            this.setState({movieIndex: this.state.movieIndex--})
    }

    render() {
        return (
            <div>

                <div>
                    <img src={'http://image.tmdb.org/t/p/' + obj.poster_path} />
                    <h2>{obj.title}</h2> 
                    <p>{obj.vote_average}</p> 
                    <p>{obj.overview}</p> 
                </div>

                <input type="submit" value="prev" />
                <input type="submit" value="fav" />
                <input type="submit" value="next" />

            </div>
            )
        }
}