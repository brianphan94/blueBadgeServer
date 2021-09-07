const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/register', (req, res) => {
    User.create({
        email: req.body.user.email,
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 10)
    })
    .then(user => {
        let token = jwt.sign({id: user.id}, process.env.SECRET,{expiresIn: '1d'})
        res.status(200).send({user:user, token: token})
    })
    .catch((error => res.status(500).send({error: error.errors[0].message})))
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.user.password, user.password, function(err, matches){
                matches ? generateToken(user) : res.send('Email or password is incorrect.')
            })

            function generateToken(user) {
                let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '1d'})
                res.send({user, token})
            }
        }else{
            res.send('No user detected')
        }
    }).catch(err => res.status(500).json({error: err}))
})

module.exports = router