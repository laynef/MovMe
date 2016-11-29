const Sequelize = require('Sequelize')
const db = new Sequelize('movMe', 'root', '')

const Fav = db.define('favorite', {
    image: Sequelize.STRING(50),
    title: Sequelize.STRING(50),
    overview: Sequelize.STRING(5000),
    rating: Sequelize.NUMEBR()
})

Fav.sync()

module.exports = Fav