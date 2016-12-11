const Sequelize = require('sequelize')
const config = require('../config')
const db = new Sequelize(config.dbUrl)

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})

const Fav = db.define('favorites', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    poster_path: Sequelize.STRING,
    title: Sequelize.STRING,
    overview: Sequelize.STRING,
    vote_average: Sequelize.STRING
})

User.hasMany(Fav, {foreignKey: 'id'})
Fav.belongsTo(User, {foreignKey: 'id'})

User.sync()
Fav.sync()

module.exports = User
module.exports = Fav