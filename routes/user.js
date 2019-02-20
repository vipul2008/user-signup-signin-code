const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        name: req.body.name
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'User name already exists'
            });
        }
        else {
            User.findOne({
                email: req.body.email
            }).then(user => {
                if (user) {
                    return res.status(400).json({
                        email: 'Email already exists'
                    });
                } else {

                    const newUser = new User({
                        name: req.body.name,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        dob: req.body.dob,
                        password: req.body.password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) console.error('There was an error', err);
                        else {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) console.error('There was an error', err);
                                else {
                                    newUser.password = hash;
                                    newUser
                                        .save()
                                        .then(user => {
                                            res.json(user)
                                        });
                                }
                            });
                        }
                    });
                }
            });
        }
    })
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                dob: user.dob,
                                email: user.email
                            };
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;