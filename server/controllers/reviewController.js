const router = require('express').Router();
const Review = require('../models/reviews');
const validate = require('../middleware/validateSession');
const { response } = require('express');

router.get('/test', (req, res) => res.send('Review test'));

router.post('/post', validate, (req, res) => {
    Review.create({
        username: req.body.username,
        reviewTitle: req.body.reviewTitle, //game
        subReviewTitle: req.body.subReviewTitle, //user title
        reviewBody: req.body.reviewBody
    })
    .then(review => res.status(200).json({review}))
    .then(function (review) {
        let responseObject = {
            review: review, 
        }
        res.status(200).json({responseObject})
    })
    .catch(err => res.status(500).json({message: 'Failed to post review.', error: err}))
})


router.get('/all', validate, (req, res) => {
    Review.findAll()
    .then(review => res.status(200).json({review}))
    .catch(err => res.status(500).json({message: 'Failed to get reviews.', error: err}))
})

router.put('/update/:id', validate, (req, res) => {
    Review.update(req.body, {where: {id: req.params.id}})
    .then(updated => res.status(200).json({message: `Successfully updated review ${req.params.id}`, updated}))
    .catch(err => res.status(500).json({message: 'Update unsuccessful.', error: err}))
})

router.get('/mine', validate, (req, res) => {
    Review.findAll(req.body, {where: {username: req.body.username}})
    .then(review => res.status(200).json({review}))
    .catch(err => res.status(500).json({message: 'Failed to get reviews.', error: err}))
})

// this end point is for jason's edit review page.  
router.get('/edit/:username', validate, (req, res) => {
    Review.findAll(req.body, {where: {username: req.params.username}})
    .then(review => res.status(200).json({review}))
    .catch(err => res.status(500).json({message: 'Failed to get reviews.', error: err}))
})

module.exports = router