const expressAsyncHandler = require('express-async-handler')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')
const Battle = require('../../models/battleModel.js')
const Summary = require('../../models/summaryModel.js')


const createSummary = expressAsyncHandler(async (req, res) => {
    const { battle_id, winner } = req.body
    let winner_id = ''
    if (!battle_id || !winner ) {
        return res.status(400).json({ 'error': 'No battle_id or winner in the request body' })
    }
    const battle = await Battle.findById(battle_id)
    if (!battle) {
        return res.status(404).json({ 'error': 'The Battle cannot be found' })
    }
    if (winner != "contender" && winner != "creator") {
        return res.status(400).json({ 'error': 'The winner must be either contender or creator' })
    }
    if (winner == "contender") {
        winner_id = battle.contender_id
    } else {
        winner_id = battle.creator_id
    }
    const summary = await Summary.create({ battle_id, winner, winner_id })
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
        if (winner != "contender" && winner != "creator") {
            return res.status(400).json({ 'error': 'The winner must be either contender or creator' })
        }
        updated.winner = winner
    }
    const battle = await Battle.findById(summary.battle_id)
    if (!battle) {
        return res.status(404).json({ 'error': 'Battle cannot be found' })
    }
    if (winner == "contender") {
        updated.winner_id = battle.contender_id
    } else {
        updated.winner_id = battle.creator_id
    }  
    await Summary.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    const newSummary = await Summary.findOne({ _id: req.params.id });
    return res.status(200).json(format(newSummary));
})

module.exports = { createSummary, getSummarys, getSummary, updateSummary, getSummaryByBattleId }