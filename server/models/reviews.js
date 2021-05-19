const sequelize = require('sequelize');
const db = require('../../db');

const Review = db.define('review', {
    email: {
        type: sequelize.STRING,
        allowNull: false,    
    }, 
    reviewTitle: {
        type: sequelize.STRING,
        allowNull: false,
    }, 
    reviewBody: {
        type: sequelize.STRING,
        allowNull: false, 
    }
})

module.exports = Review