const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE, 'postgres', process.env.PASS, {
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