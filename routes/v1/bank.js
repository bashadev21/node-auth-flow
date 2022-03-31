const express = require('express');
const router = express.Router();
const bankController = require('../../controller/banking_controller');

router.post('/register', bankController.createUser);
router.post('/apply_loan', bankController.applyloan);
router.get('/manager_loans', bankController.getmanagerloans);
router.get('/my_loans', bankController.myloans);
router.post('/status_update', bankController.statusUpdate);
router.get('/admin_loans', bankController.adminLoans);


///////LOAN STATUS??????
// Waiting for approval..!
// Waiting for admin approval..!
// Loan Approved!!
//Loan Rejected
module.exports = router;