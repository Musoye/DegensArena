const router = require('express').Router()
const { createToken, getTokens, getToken, updateToken } = require('./controller')


router.route('/').get(getTokens)
router.route('/:id').get(getToken)

module.exports = router