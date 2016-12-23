import React from 'react'
import axios from 'axios'
import _ from 'lodash'

import { Button, Carousel, CarouselCaption, CarouselItem, Grid, Col, Row, Thumbnail } from 'react-bootstrap'

const options = ["comedies", "action", "adventure", "fantasy", "drama", "horror"]
const arr = [
            "adventureList",
            "actionList",
            "horrorList",
            "comediesList",
            "dramaList",
            "fantasyList"
            ]

const imgs = [
"http://i.imgur.com/ncF41VA.jpg",
"http://i.imgur.com/DRNFL2C.jpg",
"http://i.imgur.com/bAsrJzX.jpg"
]

export default class Selector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: {
                adventureList: [],
                actionList: [],
                horrorList: [],
                comediesList: [],
                dramaList: [],
                fantasyList: []
            },
            currMovie: {},
            index : {
                comediesIndex: 0,
                fantasyIndex: 0,
                dramaIndex: 0,
                horrorIndex: 0,
                actionIndex: 0,
                adventureIndex: 0
            },
            direction : {
                comediesDirection: null,
                fantasyDirection: null,
                dramaDirection: null,
                horrorDirection: null,
                actionDirection: null,
                adventureDirection: null
            },
            curr : '',
            init: []
        }
    }

    componentWillMount() {
        options.forEach(e => {
            this.getMovieInfo(e)
        })
    }

    getMovieInfo(ep) {
        let name = ep + 'List'
        axios.get('/api/' + ep)
            .then((resp) => {
                this.state.list[name] = resp.data
                this.setState(this.state.list)
                let copy = this.state.init
                copy.push(resp.data[0])
                this.setState({init: copy})
            })
            .catch((err) => {
                console.log(`getMovieInfo error: ${err}`)
            })
    }

    getCurrMovie(e) {
        this.setState({ currMovie: e.target.value })
        this.postMovieInfo()
    }

    getName(e) {
        this.setState({curr : e})
    }

    getAction(selectedIndex, e) {
        let idx = this.state.curr + 'Index'
        let dir = this.state.curr + 'Direction'
        this.state.index[idx] = selectedIndex
        this.state.direction[dir] = e.direction
        this.setState(this.state.index)
        this.setState(this.state.direction)
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

    render() {
        return (
            <div id="selectorPage">

                {/* Image Div */}
                  <Carousel>
                    {this.state.init.filter(e => { _.identity(e) })}
                    {this.state.init.map(e => (
                        <Carousel.Item>
                            <img maxHeight={500} alt="900x500" src={'https://image.tmdb.org/t/p/w500' + e.poster_path}/>
                            <Carousel.Caption>
                                <h3>{e.title}</h3>
                                <p>{e.overview}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>

                {/* Grid Picker */}
                  <Grid fluid={true} bsClass="gridMain">
                  {options.map(name => (
                    <Carousel wrap={false}  activeIndex={this.state.index[name + 'Index']} direction={this.state.direction[name + 'Direction']} onMouseEnter={this.getName.bind(this, [name])} onSelect={this.getAction.bind(this)}>
                        {_.chunk(_.filter(this.state[name + 'List'], (e) => (
                            _.identity(e.poster_path))), 4).map((e) => (
                                <Carousel.Item>
                                {console.log(e)}
                                        {e.map(ele => (
                                            <Col xs={6} md={3}>
                                                    <Thumbnail src={'https://image.tmdb.org/t/p/w500' + ele.poster_path} alt="242x200">
                                                        <h3>{ele.title}</h3>
                                                        <h5>Rating: {ele.vote_average}</h5>
                                                        <p>
                                                            <Button bsStyle="default" value={ele} onClick={this.getCurrMovie.bind(this)}>Favorite</Button>
                                                        </p>
                                                    </Thumbnail>
                                                </Col>
                                        ))}                                        
                                    </Carousel.Item>
                                ))}
                        </Carousel>
                    ))}
                    </Grid>
            </div>
            )
        }
}