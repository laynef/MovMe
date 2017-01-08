const db = require('../database/db')
const bcrypt = require('bcrypt-nodejs')

module.exports = {
        login: {
            post: (data, res, req) => {
                db.User.findAll({
                    where: {
                        username: data.username,
                        email: data.email
                    }
                })
                .then(resp => {
                     bcrypt.compare(data.password, resp.password, (err, result) => {
                         if (result) {
                             res.send(resp)
                         }
                     })
                })
            }
        },
        register: {
            post: (data, res, req) => {
                db.User.findOrCreate({
                    where: {
                        email: data.email
                    }
                })
                .spread((user, exists) => {
                    if (!exists) {
                        bcrypt.hash(data.password, data.password.length, (err, hash) => {
                            db.User.create({
                                username: data.username,
                                email: data.email,
                                password: hash
                            })
                            .then(resp => { console.log('\n\nReistered\n\n') })
                        })
                        .then(resp => {
                            res.status(201)
                        })
                    } else {
                        bcrypt.compare(data.password, user.password, (err, result) => {
                            if (result) {
                                res.send(user)
                            }
                        })
                    }
                })
            }
        },

    favorites: {
        get: (res) => {
            db.Fav.findAll()
                .then((resp) => {
                    res.status(200).send(resp)
                })
        },
        post: (res, data) => {
            db.Fav.create({
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
            db.Fav.destroy({
                    where: {
                        title: data.title
                    }
                })
                .then((resp) => {
                    res.sendStatus(202).send(resp)
                })
        }
    }
}