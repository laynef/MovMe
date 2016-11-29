const Sequelize = require('Sequelize')
const db = new Sequelize('movMe', 'root', '')

const User = db.define('user', {
    name: Sequelize.STRING(20)
})

const Fav = db.define('favorite', {
    image: Sequelize.STRING(50),
    title: Sequelize.STRING(50),
    overview: Sequelize.STRING(5000),
    rating: Sequelize.NUMEBR()
})

User.hasMany(Fav)
Fav.belongsTo(User)

User.sync()
Fav.sync()

module.exports = User
module.exports = Fav