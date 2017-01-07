// MongoDB database
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schemas
const UserSchema = new Schema({
  username: String,
  email: String,
  password: String
})

const FavSchema = new Schema({
    poster_path: String,
    title: String,
    overview: String,
    vote_average: String
})

// Models
let User = mongoose.model('User', UserSchema)
let Fav = mongoose.model('Fav', FavSchema)

//exports
module.exports = {
    User: User,
    Fav: Fav
}