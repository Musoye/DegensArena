const router = require('express').Router()
const {createBattle, getBattles, getBattle, updateBattle, getBattleLive, getBattleFuture, getBattlePast} = require('./controller')

router.route('/').post(createBattle).get(getBattles);
router.route('/live').get(getBattleLive);
router.route('/past').get(getBattlePast);
router.route('/:id').put(updateBattle).get(getBattle)

module.exports = router