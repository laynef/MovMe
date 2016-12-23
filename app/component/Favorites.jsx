import React from 'react'
import axios from 'axios'
import { Router, Route, Link, browserHistory } from 'react-router'

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
            axios({
                method: 'DELETE',
                url: '/api/favorites',
                data: {
                    title: index
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
        this.loadFavorites()
    }

    render() {
        return (
            <div id="favoritesPage">
                    <h1>Favorites</h1>
                    
                    <Grid fluid={true}>
                        {_.chunk(this.state.list, 3).map(e => (
                            <Row>
                            {e.map(ele => (
                                <Col xs={6} md={4}>
                                <Link to="/details">
                                    <Thumbnail src={'https://image.tmdb.org/t/p/w500' + ele.poster_path}>
                                        <h3>{ele.title}</h3>
                                        <p>{ele.overview}</p>
                                    </Thumbnail>
                                    </Link>
                                    <p>
                                        <Button onClick={this.deleteFavorite.bind(this, ele.title)}>Delete Favorite</Button>
                                    </p>
                                </Col>
                                ))}
                            </Row>
                        ))}
                    </Grid>
            </div>
            )
        }
}