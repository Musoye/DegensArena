const mongoose = require('mongoose');
const Token = require('./tokenModel.js')


const transactionSchema = new mongoose.Schema({
    token: String,
    user_id: String,
    amount: Number,
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)