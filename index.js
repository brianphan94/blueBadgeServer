const express = require('express')
const app = express()
const db = require('./db')

//const user = require('../blueBadgeServer/server/controllers/userController')


db.sync()

app.use('/test', (req,res) => {
    res.send('Testing')
})

app.use(express.json())

app.listen(3000, () => {
    console.log('App is listening on 3000')
})//