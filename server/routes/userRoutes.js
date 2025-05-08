const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { uid, email } = req.body;

  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({ uid, email });
    }
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});

module.exports = router;