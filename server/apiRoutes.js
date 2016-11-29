const router = require('express').Router()
const controllers = require('./controllers')

router.get('/favorites', controllers.favorites.get)
router.post('/favorites', controllers.favorites.post)
router.delete('/favorites', controllers.favorites.delete)
// router.route('/favorites')
// .delete(function(req,res){
//     console.log(' i made it to the /api/favorites');
//     res.send('im trying to delete');
// })

module.exports = router