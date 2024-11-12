const expressAsyncHandler = require('express-async-handler')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')
const Credit = require('../../models/creditWallet.js')

const getCredits = expressAsyncHandler(async (req, res) => {
    if (!req.query.battle_id) {
        const credits = await Credit.find();
        const result = credits.map((tok) => format(tok));
        return res.status(200).json(result);
    }else if (req.query.status){
        const credits = await Credit.find({status: req.query.status});
        const result = credits.map((tok) => format(tok));
        return res.status(200).json(result);
    } else {
        const result = await Credit.findOne({ battle_id: req.query.battle_id })
        if (!result) {
            return res.status(404).json({ 'error': 'The Credit cannot be found' })
        }
        return res.status(200).json(result)
    }
})

const getCredit = expressAsyncHandler(async (req, res) => {
   const result = await Credit.findOne({ _id: req.params.id })
    if (!result) {
        return res.status(404).json({ 'error': 'The Credit cannot be found' })
    }
    return res.status(200).json(result)
})

const updateCredit = expressAsyncHandler(async (req, res) => {
    const result = await Credit.findOne({ _id: req.params.id })
    if (!result) {
        return res.status(404).json({ 'error': 'The Credit cannot be found' })
    }
    const { status } = req.body
    result.status = "paid"
    await result.save()
    return res.status(200).json(200)    
})

module.exports = { getCredits, getCredit, updateCredit }