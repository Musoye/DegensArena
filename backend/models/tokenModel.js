const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    name: String,
    contract_address: String,
    symbol: String,
    image_url: String
}, { timestamps: true });


module.exports = mongoose.model('Token', tokenSchema)