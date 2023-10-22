// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // Create a User using POST "/api/auth/"  doesn't require authentication

// router.get('/' , (req , res)=>{

//     console.log(req.body);
//     const user = User(req.body);
//     user.save();
//     res.send(req.body);
// } )

// module.exports = router

const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create and save the user if the email is unique
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    // Handle other errors, e.g., database connection issues
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
