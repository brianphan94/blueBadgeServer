const express = require('express')
const app = express()
const db = require('./db')
const reviewController = require('./server/controllers/reviewController')

const userController = require('../blueBadgeServer/server/controllers/userController')

app.use(require('./server/middleware/headers'))
app.use(express.json())


app.use('/test', (req,res) => {
    res.send('Testing')
})

app.use('/user', userController)

app.use('/review', reviewController)

db.sync()

app.listen(4040, () => {
    console.log('App is listening on 4040')
})

