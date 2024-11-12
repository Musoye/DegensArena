const Battle = require('../models/battleModel.js')
const Token = require('../models/tokenModel.js')
const Summary = require('../models/summaryModel.js')
const Transaction = require('../models/transactionModel.js');

const threshold = 50;

const getLastHourTransactions = async (token_id) => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const transactions = await Transaction.find({
        token_id: token_id,
        createdAt: { $gte: oneHourAgo }
    });
    return transactions;
}

const topper = async ( token_id, second_id,  type) => {
    const token = await Token.findOne({ contract_address: token_id });
    if (!token) {
        return -2
    }
    if (token.point + 1 < threshold) {
        return -1
    }
    let king = await Token.findOne({king: True});
    if (!king) {
        king = await Token.find({}).sort({ points: -1 }).limit(1);
        king = king[0]
    }
    if (type == "creator") {
        if (second_id == king._id){
            king = await Token.findById(second_id)
            king.king = False
            king.point = 99
            await king.save()
            token.king = True
            await token.save()
        } else{
            await Battle.create({
                creator_id: token_id,
                creator_name: token.name,
                creator_img: token.image_url,
                contender_id: king.contract_address,
                contender_name: king.name,
                contender_img: king.image_url,
                status: "live",
            });   
        }
    } else {
        if (token_id == king._id){
            return 1
        } else {
            await Battle.create({
                creator_id: token_id,
                creator_name: token.name,
                creator_img: token.image_url,
                contender_id: king.contract_address,
                contender_name: king.name,
                contender_img: king.image_url,
                status: "live",
            });
        }
    }
    return 1;
}



module.exports = { topper }; 