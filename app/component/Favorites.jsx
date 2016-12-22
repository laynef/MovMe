import React from 'react'
import axios from 'axios'

import { Button, Carousel, CarouselCaption, CarouselItem, Grid, Col, Row, Thumbnail } from 'react-bootstrap'

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
        return this.state.list.map((ele,i) => (
            <Col xs={6} md={3}>
                <Thumbnail src={'https://image.tmdb.org/t/p/w500' + ele.poster_path} alt="242x200">
                    <h3>{ele.title}</h3>
                    <h5>Rating: {ele.vote_average}</h5>
                    <p>{ele.overview}</p>
                    <p>
                        <Button bsStyle="default" onClick={this.postMovieInfo.bind(this)}>Favorite</Button>
                    </p>
                </Thumbnail>
            </Col>
        ))
    }

    render() {
        return (
            <div id="favoritesPage">
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

                <Grid>
                    <Row>
                        {this.displayFavorites()}
                    </Row>
                </Grid>
            </div>
            )
        }
}