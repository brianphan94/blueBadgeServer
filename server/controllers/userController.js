const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validate = require('../middleware/validateSession');

router.get('/testing', (req, res) => {
    res.send('testing testing')
})

//USER CREATE
router.post('/register', (req, res) => {
    User.create({
        username: req.body.user.username,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 10)
    })
    .then(user => {
        let token = jwt.sign({id: user.id}, "I_AM_SECRET",{expiresIn: '1d'})
        res.status(200).send({user:user, token: token})
    })
    .catch((error => res.status(500).send({error: error})))
})

//!LIST USERS
router.get('/users', (req, res) => {
    User.findAll()
    .then(user => res.status(200).json({user}))
    .catch(err => res.status(500).json({message: 'Could not find any users.', error: err}))
})
//! NEED TO ADD TOKEN IN THE VIEW USER ENDPOINT

//USER LOGIN
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.user.username,
            password: req.body.user.password
        }
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.user.password, user.password, function(err, matches){
                matches ? generateToken(user) : res.send('Email or password is incorrect.')
            })

            function generateToken(user) {
                let token = jwt.sign({id: user.id}, "I_AM_SECRET", {expiresIn: '1d'})
                res.send({user, token})
            }
        }else{
            res.send('No user detected')
        }
    }).catch(err => res.status(500).json({error: err}))
})

//!UPDATE USER
router.put('/update/:id', validate, (req, res) => {
    User.update(req.body, {where: {id: req.params.id}})
    .then(updated => res.status(200).json({message: `Successfully updated user ${req.params.id}`, updated}))
    .catch(err => res.status(500).json({message: 'Update unsuccessful, ', error: err}))
})

module.exports = router