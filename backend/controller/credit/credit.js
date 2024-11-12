const router = require('express').Router()
const {  getCredits, getCredit, updateCredit } = require('./controller')


router.route('/').get(getCredits)
router.route('/:id').get(getCredit).put(updateCredit);

module.exports = router