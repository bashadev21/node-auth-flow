const express = require('express');
const router = express.Router();
const passportController = require('../../controller/passport_controller');

router.post('/addpassport', passportController.createPassport);
router.get('/getall', passportController.getallPassport);
router.get('/getbyID/:id', passportController.getparticularID);

module.exports = router;