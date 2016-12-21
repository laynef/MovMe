// require('dotenv')
const models = require('./models')
const axios = require('axios')
const config = require('../config')

module.exports = {
    favorites: {
        get: (req, res) => {
            models.favorites.get(res)
        },
        post: (req, res) => {
            models.favorites.post(res, req.body)
        },
        delete: (req, res) => {
            models.favorites.delete(res, req.body)
        }
    },
    pop: {
        get: (req, res) => {
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&sort_by=popularity.desc')
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    newReleases: {
        get: (req, res) => {
            let date = Date.now();
            let year = date.getYear();
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&primary_release_year=' + year)
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    action: {
        get: (req, res) => {
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=28')
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    comedies: {
        get: (req, res) => {
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=35')
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    horror: {
        get: (req, res) => {
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=27')
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    drama: {
        get: (req, res) => {
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=18')
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    topRated: {
        get: (req, res) => {
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&sort_by=vote_average.desc')
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    fantasy: {
        get: (req, res) => {
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=14')
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    adventure: {
        get: (req, res) => {
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=12')
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    }
}