const router = require('express').Router();
const Review = require('../models/reviews');
const validate = require('../middleware/validateSession');

router.get('/test', (req, res) => res.send('Review test'));

router.post('/post', validate, (req, res) => {
    Review.create({
        email: req.body.email,
        reviewTitle: req.body.reviewTitle,
        reviewBody: req.body.reviewBody
    })
    .then(review => res.status(200).json({review}))
    .catch(err => res.status(500).json({message: 'Failed to post review.', error: err}))
})

router.get('/all', validate, (req, res) => {
    Review.findAll()
    .then(review => res.status(200).json({review, token}))
    .catch(err => res.status(500).json({message: 'Failed to get reviews.', error: err}))
})

router.put('/update/:id', validate, (req, res) => {
    Review.update(req.body, {where: {id: req.params.id}})
    .then(updated => res.status(200).json({message: `Successfully updated review ${req.params.id}`, updated}))
    .catch(err => res.status(500).json({message: 'Update unsuccessful.', error: err}))
})

router.get('/mine', validate, (req, res) => {
    Review.findAll(req.body, {where: {email: req.body.email}})
    .then(review => res.status(200).json({review}))
    .catch(err => res.status(500).json({message: 'Failed to get reviews.', error: err}))
})

module.exports = router