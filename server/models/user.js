const sequelize = require('sequelize');
const db = require('../../db')


const User = db.define('user', {
    username: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true
    },
    
    email: {
        type: sequelize.STRING,
        allowNull: false, 
        unique: true
    },

    password: {
        type: sequelize.STRING, 
        allowNull: false
    }

})

module.exports = User