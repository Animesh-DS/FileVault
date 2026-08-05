const express = require('express');
const router = express.Router();
const {AuthUser,refreshToken} = require('../../controllers/authController');

router.post('/login',AuthUser);
router.post('/refresh',refreshToken);

module.exports = router;