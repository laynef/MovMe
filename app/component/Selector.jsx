import React from 'react'
import axios from 'axios'

import { Button, Carousel, CarouselCaption, CarouselItem } from 'react-bootstrap'

export default class Selector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movieIndex: 0,
            popList: [],
            adventureList: [],
            actionList: [],
            horrorList: [],
            comediesList: [],
            dramaList: [],
            topRatedList: [],
            newReleasesList: [],
            fantasyList: [],
            currMovie: {}
        }
    }

    componentWillMount() {
        this.gridPicker()
    }

    getMovieInfo(ep) {
        let listings = ep + 'List'
        axios.get('/api/' + ep)
            .then((resp) => {
                this.setState({ listings: resp.data })
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

    gridPicker() {
        let options = ["pop", "newReleases", "topRated", "comedies", "action", "adventure", "fanasty", "drama", "horror"]
        let arr = options.map(e => {
           setTimeout( this.getMovieInfo(e), 250) // not syncing
            let listing = e + "List"
            return (
                <Carousel>
                    {this.state.listing.map((ele, idx) => (
                        <Carousel.Item>
                            <img width={250} height={250} alt="250x250" src={'https://image.tmdb.org/t/p/w500' + this.state.listing.poster_path[idx]}/>
                            <Carousel.Caption>
                                <h3>{this.state.listing.title[idx]}</h3>
                                <Button bsStyle="primary" onClick={this.postMovieInfo.bind(this)}>Favorite</Button>
                                <p>{this.state.listing.overview[idx]}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
             )
        })
    }

    render() {
        return (
            <div id="selectorPage">
                {/* Image Div */}
                  <Carousel>
                    <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="http://i.imgur.com/ncF41VA.jpg"/>
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="http://i.imgur.com/DRNFL2C.jpg"/>
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="http://i.imgur.com/bAsrJzX.jpg"/>
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                {/* Grid Picker */}
                {this.gridPicker()}
            </div>
            )
        }
}