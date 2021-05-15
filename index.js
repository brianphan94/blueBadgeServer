const express = require('express')
const app = express()
const db = require('./db')

const userController = require('../blueBadgeServer/server/controllers/userController')

app.use(require('./server/middleware/headers'))
app.use(express.json())


app.use('/test', (req,res) => {
    res.send('Testing')
})

app.use('/user', userController)

db.sync()

app.listen(3000, () => {
    console.log('App is listening on 3000')
})//