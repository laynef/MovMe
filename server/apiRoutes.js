const router = require('express').Router()
const controllers = require('./controllers')

router.get('/favorites', controllers.favorites.get)
router.post('/favorites', controllers.favorites.post)

module.exports = router