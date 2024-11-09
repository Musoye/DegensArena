const router = require('express').Router()
const { createSummary, getSummarys, getSummary, updateSummary, getSummaryByBattleId } = require('./controller')

router.route('/').post(createSummary).get(getSummarys)
router.route('/:id').put(updateSummary).get(getSummary)
router.route('/:id/battles').get(getSummaryByBattleId)

module.exports = router