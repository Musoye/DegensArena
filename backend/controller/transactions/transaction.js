const router = require('express').Router()
const { createTransaction, getTransactions, getTransaction, updateTransaction } = require('./controller')

router.route('/').post(createTransaction).get(getTransactions);
router.route('/:id').put(updateTransaction).get(getTransaction)

module.exports = router