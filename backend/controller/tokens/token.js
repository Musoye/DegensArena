const router = require('express').Router()
const { createToken, getTokens, getToken, updateToken, getcurrentTable } = require('./controller')


router.route('/').get(getTokens).post(createToken);
router.route('/table').get(getcurrentTable);
router.route('/:id').get(getToken).put(updateToken);

module.exports = router