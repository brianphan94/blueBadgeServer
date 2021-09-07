const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    // dialectOptions:{
    //     ssl:{
    //         require: true, 
    //         rejectUnauthorized: false
    //     }
    // }
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