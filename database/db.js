const Sequelize = require('Sequelize')
const db = new Sequelize('movMe', 'root', '')

const Fav = db.define('favorite', {
    poster_path: Sequelize.STRING,
    title: Sequelize.STRING,
    overview: Sequelize.STRING,
    vote_averag: Sequelize.NUMBER
})

Fav.sync()

module.exports = Fav