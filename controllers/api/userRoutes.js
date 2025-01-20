const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// User registration
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(201).json(userData);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to register user', error: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData || !(await userData.checkPassword(req.body.password))) {
      res.status(401).json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: 'Login successful' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to log in', error: err.message });
  }
});

// User logout
router.post('/logout', withAuth, (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;