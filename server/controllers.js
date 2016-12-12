require('dotenv').config()
const models = require('./models')

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
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.api_key +'&sort_by=popularity.desc')
                .then(resp => { 
                    res.status(200).send(resp.data.results) })
                .catch(err => {})
        }
    }
}