const express = require('express');
const router = express.Router();
const {AddUser} = require('../../controllers/adduserController');

router.post('/register',AddUser);

module.exports = router;