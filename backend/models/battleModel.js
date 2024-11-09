const mongoose = require('mongoose');
const Token = require('./tokenModel.js')


const battleSchema = new mongoose.Schema({
    creator_id: String,
    creator_name: String,
    contender_name: String,
    creator_img: String,
    contender_id: String,
    contender_img: String,
    time: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["live", "past", "future"]
    }
}, { timestamps: true })

module.exports = mongoose.model('Battle', battleSchema)