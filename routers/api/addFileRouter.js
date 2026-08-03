const express = require('express');
const router = express.Router();
const {addFile} = require('../controllers/addFileController.js');

router.post('/',addFile)

module.exports = router;