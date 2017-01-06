// require('dotenv').config()
const config = require('../config')
const Sequelize = require('sequelize')
// const db = new Sequelize(process.env.dbUrl)
const db = new Sequelize(config.dbUrl)

const User = db.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})

const Fav = db.define('favorites', {
    poster_path: Sequelize.STRING(500),
    title: Sequelize.STRING(500),
    overview: Sequelize.STRING(5000),
    vote_average: Sequelize.STRING(20)
})

User.hasMany(Fav)
Fav.belongsTo(User)

User.sync()
Fav.sync()

module.exports = User
module.exports = Fav