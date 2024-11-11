const mongoose = require('mongoose');
const Token = require('./tokenModel.js')


const battleSchema = new mongoose.Schema({
    creator_id: String,
    creator_name: String,
    creator_img: String,
    contender_id: String,
    contender_name: String,
    contender_img: String,
    status: {
        type: String,
        enum: ["live", "past"]
    }
}, { timestamps: true })

module.exports = mongoose.model('Battle', battleSchema)