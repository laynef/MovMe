const models = require('./models')
const config = require('../config')
const axios = require('axios')

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
    movies: {
        get: (req, res) => {
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + config.api_key +'&sort_by=popularity.desc')
                .then(resp => { res.json(resp) })
                .catch(err => {})
        }
    }
}