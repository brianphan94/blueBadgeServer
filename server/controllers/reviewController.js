const router = require('express').Router();
// const validateSession = require('../middleware/validateSession');
const Review = require('../models/reviews');

// create review 
// router.post('/post', (res, req) => {
//     Review.create({
//         email: req.body.email,
//         reviewTitle: req.body.reviewTitle,
//         reviewBody: req.body.reviewBody
//     })
//     .then(review => res.status(200).json({review}))
//     .catch((error => res.status(500).json({error: error})))
// })

router.post('/post', (req, res) => {
    Review.create({
        email: req.body.email,
        reviewTitle: req.body.reviewTitle,
        reviewBody: req.body.reviewBody
    })
    .then(review => res.status(200).json({review}))
    .catch(err => res.status(500).json({message: 'Failed to post review.', error: err}))
})

module.exports = router; 

