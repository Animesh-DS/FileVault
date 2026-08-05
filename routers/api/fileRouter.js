const express = require('express');
const router = express.Router();
const {addFile} = require('../../controllers/addFileController.js');
const {verifyJWT} = require('../../middleware/verifyJWT.js')

router.post('/upload',verifyJWT,addFile)

module.exports = router;