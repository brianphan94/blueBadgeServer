const router = require('express').Router();
const Review = require('../models/reviews');
const validate = require('../middleware/validateSession');
const { response } = require('express');

router.get('/test', (req, res) => res.send('Review test'));

router.post('/post', validate, (req, res) => {
    Review.create({
        username: req.body.username,
        reviewTitle: req.body.reviewTitle,
        subReviewTitle: req.body.subReviewTitle,
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


router.delete('/delete/:id', validate, (req,res) => {
    Review.destroy({where: {id: req.params.id} })
    .then(destroyed => res.status(200).json({message: 'Review deleted', destroyed}))
    .catch(err => res.status(500).json({error: err}))

router.get('/search', (req, res) => {
    Review.findAll({where: {username: req.query.query}})
    .then(reviews => {
        let userList = {}
        reviews.forEach(review => {
            if (userList[review.dataValues.username]) {
                userList[review.username].push(review) 
            }
            else {
                userList[review.username] = [review]
            }   
        })
        
        res.status(200).json({userList})})
    .catch(err => res.status(500).json({message: 'No users found', error: err}))
})



module.exports = router