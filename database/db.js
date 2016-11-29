const Sequelize = require('Sequelize')
const db = new Sequelize('movMe', 'root', 'pass')

const Fav = db.define('favorite', {
    poster_path: Sequelize.STRING(50),
    title: Sequelize.STRING(100),
    overview: Sequelize.STRING(5000),
    vote_averag: Sequelize.FLOAT(1)
})

Fav.sync()

module.exports = Fav