// require('dotenv')
const models = require('./models')
const axios = require('axios')
const config = require('../config')

module.exports = {
    login: {
        post: (req, res) => {
            models.login.post(req.body, res, req)
        }
    },
    register: {
        post: (req, res) => {
            models.register.post(req.body, res, req)
        }
    },
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
    action: {
        get: (req, res) => {
            let pageNumber = Math.floor((Math.random() * 10)  + 1)
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=28&sort_by=popularity.desc&page=' + pageNumber)
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    comedies: {
        get: (req, res) => {
            let pageNumber = Math.floor((Math.random() * 10)  + 1)
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=35&sort_by=popularity.desc&page=' + pageNumber)
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    horror: {
        get: (req, res) => {
            let pageNumber = Math.floor((Math.random() * 10)  + 1)
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=27&sort_by=popularity.desc&page=' + pageNumber)
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    drama: {
        get: (req, res) => {
            let pageNumber = Math.floor((Math.random() * 10)  + 1)
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=18&sort_by=popularity.desc&page=' + pageNumber)
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    fantasy: {
        get: (req, res) => {
            let pageNumber = Math.floor((Math.random() * 10)  + 1)
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=14&sort_by=popularity.desc&page=' + pageNumber)
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    },
    adventure: {
        get: (req, res) => {
            let pageNumber = Math.floor((Math.random() * 10)  + 1)
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&with_genres=12&sort_by=popularity.desc&page=' + pageNumber)
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    }
}