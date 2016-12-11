const router = require('express').Router()
const controllers = require('./controllers')

router.get('/movies', controllers.movies.get)

router.get('/favorites', controllers.favorites.get)
router.post('/favorites', controllers.favorites.post)
router.delete('/favorites', controllers.favorites.delete)

module.exports = router