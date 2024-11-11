const Battle = require('../models/battleModel.js')
const Token = require('../models/tokenModel.js')
const Summary = require('../models/summaryModel.js')
const Transaction = require('../models/transactionModel.js')

const threshold = 50;

const topper = async (token_id) => {
    const token = await Token.findOne({ contract_address: token_id });
    if (!token) {
        return -2
    }
    if (token.point < threshold) {
        return -1
    }
    if (token.point >= threshold) {
        const tokens = await Token.find({}).sort({ points: -1 }).limit(100);
        const w_token = tokens[0];
        await Battle.create({
            creator_id: token_id,
            creator_name: token.name,
            creator_img: token.image_url,
            contender_id: w_token.contract_address,
            contender_name: w_token.name,
            contender_img: w_token.image_url,
            status: "live",
        });
    }
    return 1;
}



module.exports = { topper }; 