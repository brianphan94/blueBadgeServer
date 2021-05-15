const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.get('/testing', (req, res) => {
    res.send('testing testing')
})

//USER CREATE
router.post('/register', (req, res) => {
    User.create({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 10)
    })
    .then(user => {
        let token = jwt.sign({id: user.id}, "I_AM_SECRET",{expiresIn: '1d'})
        res.status(200).send({user:user, token: token})
    })


    .catch((error => res.status(500).send({error: error})))
})

module.exports = router