const Fav = require('../database/db')

module.exports = {
    favorites: {
        get: (res) => {
            Fav.findAll()
                .then((resp) => {
                    res.json(resp)
                    res.sendStatus(200)
                })
        },
        post: (res, data) => {
            Fav.create({
                    image: data.image,
                    title: data.title,
                    overview: data.overview,
                    rating: data.rating
            })
            .then((resp) => {
                res.sendStatus(201)
            })
        }
    }
}