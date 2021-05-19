const sequelize = require('sequelize');
const db = require('../../db')


const User = db.define('user', {
    email: {
        type: sequelize.STRING,
        allowNull: false, 
        unique: true
    },

    //maybe username also

    password: {
        type: sequelize.STRING, 
        allowNull: false
    }

})

module.exports = User