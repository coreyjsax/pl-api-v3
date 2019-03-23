const express = require('express');
const secured = require('../controllers/admin_panel/middleware');
const router = express.Router();

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  console.log(req.user)
  const { _raw, _json, ...userProfile } = req.user;
  console.log(req.user)
  console.log(userProfile)
  res.render('user', { user: userProfile
  });
});

module.exports = router;