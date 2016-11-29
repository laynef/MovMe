const models = require('./models')

module.exports = {
    favorites: {
        get: (req, res) => {
            models.favorites.get()
        },
        post: (req, res) => {
            models.favorites.post()
        }
    }
}