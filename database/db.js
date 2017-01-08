const config = require('../config')
const Sequelize = require('sequelize')
const db = new Sequelize(config.dbUrl)

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    tableName: 'UserTable'
})

const Fav = db.define('Fav', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    poster_path: Sequelize.STRING,
    title: Sequelize.STRING,
    overview: Sequelize.STRING,
    vote_average: Sequelize.STRING,
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'UserTable',
            key: 'id'
        }
    }
}, {
    tableName: 'FavsTable'
})

User.hasMany(Fav)
Fav.belongsTo(User, { foreignKey: { allowNull: false } })

User.sync()
Fav.sync()

module.exports = {
    User: User,
    Fav: Fav
}