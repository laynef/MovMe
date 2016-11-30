require('dotenv').config()
const Sequelize = require('sequelize')
const db = new Sequelize(process.env.dbUrl)

const Fav = db.define('favorites', {
    poster_path: Sequelize.STRING(500),
    title: Sequelize.STRING(500),
    overview: Sequelize.STRING(5000),
    vote_average: Sequelize.STRING(20)
})

Fav.sync()

module.exports = Fav