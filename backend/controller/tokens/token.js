const router = require('express').Router()
const { createToken, getTokens, getToken, updateToken } = require('./controller')


router.route('/').get(getTokens).post(createToken);
router.route('/:id').get(getToken).put(updateToken);

module.exports = router