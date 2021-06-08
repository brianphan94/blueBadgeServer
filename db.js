const Sequelize = require('sequelize')
const db = new Sequelize(
    `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/blue-badge-server,`, 
    {
    dialect: 'postgres',
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