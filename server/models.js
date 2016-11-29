const db = require('../database/db')

module.exports = {
    favorites: {
        get: () => {
            db.findAll({

            })
            .then((resp) => {

            })
            .catch((err) => {
                console.log(`Get db method error: ${err}`)
            })
        },
        post: (data) => {
            db.create({
                    image: data.image,
                    title: data.title,
                    overview: data.overview,
                    rating: data.rating
            })
            .then((resp) => {

            })
            .catch((err) => {
                console.log(`Post db method error: ${err}`)
            })
        }
    }
}