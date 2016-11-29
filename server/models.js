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
                    poster_path: data.poster_path,
                    title: data.title,
                    overview: data.overview,
                    vote_average: data.vote_average
            })
            .then((resp) => {
                res.sendStatus(201)
            })
        }
    }
}