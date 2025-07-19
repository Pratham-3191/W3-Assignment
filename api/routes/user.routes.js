const express = require('express');
const router = express.Router();
const User = require('../models/User');
const History = require('../models/History');



// Get all users sorted by points
router.get('/users/all', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

// Add new user
router.post('/users', async (req, res) => {
  const { name } = req.body;
  const existing = await User.findOne({ name });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ name });
  await user.save();
  res.status(201).json(user);
});

// GET /api/leaderboard?page=1&limit=5
router.get("/leaderboard", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find()
      .sort({ totalPoints: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: users,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



// Claim points
router.post('/claim/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const points = Math.floor(Math.random() * 10) + 1;
  user.totalPoints += points;
  await user.save();

  const history = new History({
    userId: user._id,
    userName: user.name,
    points,
  });

  await history.save();
  res.json({ points });
});

// Get claim history with pagination
router.get('/history', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const total = await History.countDocuments();
    const history = await History.find()
      .sort({ claimedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: history,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalEntries: total,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching history' });
  }
});


module.exports = router;
