const sequelize = require('sequelize');
const db = require('../../db');

const Review = db.define('review', {
    username: {
        type: sequelize.STRING,
        allowNull: false
    },

    reviewTitle: {
        type: sequelize.STRING, 
        allowNull: false
    },

    subReviewTitle: {
        type: sequelize.STRING, 
        allowNull: false
    },

    reviewBody: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Review