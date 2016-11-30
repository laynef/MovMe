const Fav = require('../database/db')

module.exports = {
    favorites: {
        get: (res) => {
            Fav.findAll()
                .then((resp) => {
                    res.status(200).send(resp)
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
                res.status(201)
            })
        },
        delete: (res, data) => {
            Fav.destroy({
                    where: {
                        id: data.id
                    }
                })
                .then((resp) => {
                    res.sendStatus(202).send(resp)
                })
        }
    }
}