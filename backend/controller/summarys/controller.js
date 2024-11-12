const expressAsyncHandler = require('express-async-handler')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')
const Battle = require('../../models/battleModel.js')
const Summary = require('../../models/summaryModel.js')
const Token = require('../../models/tokenModel.js')
const { topper } = require('../../utils/topper.js')

const threshold = 100


const createSummary = expressAsyncHandler(async (req, res) => {
    const { battle_id, winner } = req.body
    let winer = ''
    let winner_id = ''
    if (!battle_id || !winner ) {
        return res.status(400).json({ 'error': 'No battle_id or winner in the request body' })
    }
    const battle = await Battle.findById(battle_id)
    if (!battle) {
        return res.status(404).json({ 'error': 'The Battle cannot be found' })
    }
    if (battle.creator_id == winner) {
        winner_id = battle.creator_id
        winer = "creator"   
    }
    if (battle.contender_id == winner) {
        winner_id = battle.contender_id
        winer = "contender"
    }
    if (!winner_id) {
        return res.status(400).json({ 'error': 'The winner contract address sent is not found' })
    }
    if (winer == "creator"){
        const cr_token = await Token.findOne({ contract_address: battle.creator_id })
        if (!cr_token) {
            return res.status(404).json({ 'error': 'The creator token cannot be found' })
        }
        if(cr_token.point + 1 != threshold){
            cr_token.point += 1
            await cr_token.save()
        } else {
            await topper(battle.creator_id, "creator")
        }

    } else {
        const co_token = await Token.findOne({ contract_address: battle.creator_id })
        if (!co_token) {
            return res.status(404).json({ 'error': 'The contender token cannot be found' })
        }
        if (co_token.point + 1 != threshold){
            co_token.point += 1
            await co_token.save()
        } else {
            await topper(battle.contender_id, "contender")
        }
    }
    battle.status = "past"
    await battle.save();
    const summary = await Summary.create({ battle_id, winner: winer, winner_id })
    return res.status(201).json(format(summary))
})

const getSummarys = expressAsyncHandler(async (req, res) => {
    const query = req.query.query || ''
    let response = []
    if (query == "contender" || query == "creator") {
        response = await Summary.find({ winner: query })
    } else {
        response = await Summary.find()
    }
    const value = []
    for (let resa of response) {
        value.push(format(resa))
    }
    return res.status(200).json(value)
})

const getSummaryByBattleId = expressAsyncHandler(async (req, res) => {
    const response = await Summary.findOne({ battle_id: req.params.id })
    if (!response) {
        return res.status(404).json({ 'error': 'The Battle cannot be found' })
    }
    return res.status(200).json(format(response));
})

const getSummary = expressAsyncHandler(async (req, res) => {
    const summary = await Summary.findById(req.params.id)
    if (!summary) {
        return res.status(404).json({ 'error': 'The Summary cannot be found' })
    }
    return res.status(200).json(format(summary))
})

const updateSummary = expressAsyncHandler(async (req, res) => {
    const { winner } = req.body
    const summary = await Summary.findById(req.params.id)
    if(!summary){
        return res.status(404).json({'error': 'The Summary cannot be found'})
    }
    const updated = {}
    if (!winner){
        return res.status(400).json({'error': 'No winner in the request body, Nothing to update'})
    } else {
        if (summary.winner_id == winner) {
            return res.status(400).json({'error': 'The winner is the same as the previous winner'})
        }
        updated.winner = winner
    }
    const battle = await Battle.findById(summary.battle_id)
    if (!battle) {
        return res.status(404).json({ 'error': 'Battle cannot be found' })
    }
    if (winner == battle.contender_id) {
        updated.winner_id = battle.contender_id;
        updated.winner = "contender"
    } else if (winner == battle.creator_id) {
        updated.winner_id = battle.creator_id;
        updated.winner = "creator";
    }  
    await Summary.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    const newSummary = await Summary.findOne({ _id: req.params.id });
    return res.status(200).json(format(newSummary));
})

module.exports = { createSummary, getSummarys, getSummary, updateSummary, getSummaryByBattleId }