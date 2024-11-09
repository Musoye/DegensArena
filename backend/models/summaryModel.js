const mongoose = require('mongoose');
const Battle = require('./battleModel.js')
const Token = require('./tokenModel.js')


const sumamrySchema = new mongoose.Schema({
    battle_id : String,
    winner_id: String,
    winner: {
        type: String,
        enum: ["contender", "creator"]
    }
}, { timestamps: true })

module.exports = mongoose.model('Summary', sumamrySchema)