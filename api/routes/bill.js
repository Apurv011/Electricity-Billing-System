const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const BillController = require('../controllers/bill');

router.get('/', BillController.getAllBills);

router.post('/', BillController.createOneBill);

router.get('/status/:status', BillController.getBillByStatus);

router.get('/user/:userId', BillController.getBillByUserId);

router.get('/paid/user/:userId', BillController.getBillPaidByUserId);

router.patch('/:billId', BillController.updateOneBill);

module.exports = router;
