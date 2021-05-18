const Sequelize = require('sequelize')
const db = new Sequelize('blue-badge-server', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
})

db.authenticate().then(
    () => {
        console.log('connected to db')
    },
    (err) => {
        console.log(err)
    }
)

module.exports = db