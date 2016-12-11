const express = require('express')
const morgan = require('morgan')
const parser = require('body-parser')
const app = express()
const router = require('./apiRoutes')

let port = process.env.PORT || 3000

app.use(express.static("public"))
app.use(morgan('dev'))
app.use(parser.json())

app.use('/api', router)

app.get('/', (req, res) => { res.sendFile('index.html') })

app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
})
