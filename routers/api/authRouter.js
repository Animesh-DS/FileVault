const express = require('express');
const router = express.Router();
const {AuthUser,refreshToken} = require('../../controllers/authController');

router.post('/login',authUser);
router.post('/refresh',refreshToken);

module.exports = router;