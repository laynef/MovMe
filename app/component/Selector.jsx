import React from 'react'
import axios from 'axios'

import { Button, Carousel, CarouselCaption, CarouselItem } from 'react-bootstrap'

// const options = ["pop", "newReleases", "topRated", "comedies", "action", "adventure", "fantasy", "drama", "horror"]
const options = ["newReleases", "topRated", "pop"]

export default class Selector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
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
        options.forEach(e => {
            this.getMovieInfo(e)
        })
    }

    componentDidMount() {
        this.gridPicker()
    }

    getMovieInfo(ep) {
        let listings = ep + 'List'
        axios.get('/api/' + ep)
            .then((resp) => {
                this.setState({ listings: resp.data })
            })
            .catch((err) => {
                console.log(`getMovieInfo error: ${err}`)
            })
    }

    getCurrMovie(e) {
        this.setState({ currMovie: e.target.value })
        this.postMovieInfo()
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
        let arr = options.map(e => {
        let listing = e + "List"
        return (
            <Carousel>
                {this.state.listing.map(ele => (
                    <Carousel.Item>
                        <img width={250} height={250} alt="250x250" src={'https://image.tmdb.org/t/p/w500' + ele.poster_path}/>
                        <Carousel.Caption>
                            <h3>{ele.title}</h3>
                            <Button bsStyle="primary" value={ele} onClick={this.getCurrMovie.bind(this)}>Favorites</Button>
                            <p>{ele.overview}</p>
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