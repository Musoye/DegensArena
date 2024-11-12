const Battle = require('../models/battleModel.js')
const Token = require('../models/tokenModel.js')
const Summary = require('../models/summaryModel.js')
const Transaction = require('../models/transactionModel.js')
const Credit = require('../models/creditWallet.js')
const { topper } = require('./topper.js')

const threshold = 50


const getLastHourTransactions = async (token_id) => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const transactions = await Transaction.find({
        token_id: token_id,
        createdAt: { $gte: oneHourAgo }
    });
    return transactions;
}

const getTotalAmount = async (transactions) => {
    let amount = 0;
    for (let i = 0; i < transactions.length; i++){
        amount += transactions[i].amount;
    }
    return amount;
}

const getTopper = async (transactions) => {
    const topper = {}
    for (let i = 0; i < transactions.length; i++){
        const id = transactions[i].user_id
        if (id in topper) {
            topper.id += transactions[i].amount
        }else {
            topper.id = transactions[i].amount
        }
    }
    const top = Object.entries(topper)
    top.sort((a, b) => b[1] - a[1]);
    top.sort((a, b) => b[1] - a[1]);

    // Step 3: Extract the keys of the top three values
    const topThreeKeys = top.slice(0, 3).map(entry => entry[0]);

    return topThreeKeys
}


const declareWinner = async (battle_id) => {
    const battle = await Battle.findById(battle_id)
    if(!battle){
        return -1;
    }
    const {creator_id, contender_id} = battle
    const r_token = await getLastHourTransactions(creator_id)
    const o_token = await getLastHourTransactions(contender_id)
    const cr_token = await getTotalAmount(r_token)
    const co_token = await getTotalAmount(o_token)

    let winner_id = ''
    let winner = ''
    if (cr_token > co_token) {
        winner_id = creator_id
        winner = 'creator'
        const topper = await getTopper(r_token)
        await Credit.create({first: topper[0], second: topper[1], third: topper[2], battle_id})
        const toke = await Token.findOne({contract_address: creator_id})
        if (!toke) {
            return -1
        }
        if (toke.point + 1 != threshold){
            toke.point += 1
            await toke.save()
        } else {
            await topper(battle.creator_id, battle.contender_id, "creator")
        }
    } else {
        winner_id = contender_id
        winner = 'contender'
        const toke = await Token.findOne({contract_address: contender_id})
        const topper = await getTopper(o_token)
        await Credit.create({first: topper[0], second: topper[1], third: topper[2], battle_id})
        if (!toke) {
            return -1
        }
        if (toke.point + 1 != threshold){
            toke.point += 1
            await toke.save()
        } else {
            await topper(battle.contender_id, battle.creator_id, "contender")
        }
    }
    battle.status = 'past'
    await battle.save()
    const summary = await Summary.create({ battle_id, winner, winner_id })
    return summary._id
}

module.exports = { declareWinner }