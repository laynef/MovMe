const Sequelize = require('Sequelize')
const db = new Sequelize('movMe', 'root', '')

const Fav = db.define('favorite', {
    poster_path: Sequelize.STRING(50),
    title: Sequelize.STRING(50),
    overview: Sequelize.STRING(5000),
    vote_averag: Sequelize.NUMEBR()
})

Fav.sync()

module.exports = Fav