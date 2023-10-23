const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a User using POST "/api/auth/createuser" . No login required

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
],
    async (req, res) => {
        // if there are errors , return bad request and error.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            // check whether the user with this email already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" })
            }
            user = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            });

            res.status(201).json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured")
        }

    });

module.exports = router;
