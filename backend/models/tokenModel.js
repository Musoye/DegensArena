const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    name: String,
    price: Number,
    asset_name: String,
    contract_address: String,
    symbol: String,
    image_url: String,
    point: {
        type:Number,
        default:0
    }
}, { timestamps: true });


module.exports = mongoose.model('Token', tokenSchema)