const mongoose = require('mongoose');
const Token = require('./tokenModel.js')


const creditSchema = new mongoose.Schema({
    first: String,
    second: String,
    third: String,
    battle_id: String,
    status: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    }
}, { timestamps: true })

module.exports = mongoose.model('Credit', creditSchema)