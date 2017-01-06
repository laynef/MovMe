const router = require('express').Router()
const controllers = require('./controllers')

router.post('/user/login', controllers.user.login.post)
router.post('/user/register', controllers.user.register.post)

router.get('/comedies', controllers.comedies.get)
router.get('/drama', controllers.drama.get)
router.get('/action', controllers.action.get)
router.get('/adventure', controllers.adventure.get)
router.get('/fantasy', controllers.fantasy.get)
router.get('/horror', controllers.horror.get)

router.get('/favorites', controllers.favorites.get)
router.post('/favorites', controllers.favorites.post)
router.delete('/favorites', controllers.favorites.delete)

module.exports = router