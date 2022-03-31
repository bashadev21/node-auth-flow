const express = require('express');
const router = express.Router();

router.use('/user', require('./v1/user'));
router.use('/passport', require('./v1/passport'));
router.use('/bank', require('./v1/bank'));

module.exports = router;