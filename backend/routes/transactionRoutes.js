const express = require('express');
const router = express.Router();

const { getTransaction, addTransaction } = require('../controllers/transactionControllers');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTransaction);
router.post('/', protect, addTransaction);

module.exports = router;