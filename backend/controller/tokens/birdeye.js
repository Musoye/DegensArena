const axios = require('axios');
require('dotenv').config();
const Battle = require('../../models/battleModel.js')
const Summary = require('../../models/summaryModel.js')

const key = process.env.X_API_KEY;

const birdeye = axios.create({
    baseURL: 'https://public-api.birdeye.so/defi',
    headers: {
        'X-API-KEY': `${key}`,
        content_type: "Content-Type: application/json"
    },
});

const getToke = async () => {
    const value = { data: []};
    let offset = 0;

    for (let i = 0; i < 2; i++) {
        const response = await birdeye.get('/tokenlist', {
            params: {
                offset
            }

        });
        value.data.push(...response.data.data.tokens)
    }
    return value
}

function findTokenByAddress(tokens, contract1, contract2) {
    const value = [null, null]; 
    for (const token of tokens.data) {
        if (!token[0] && token.address === contract1) {
            value[0] = token; 
        } else if (token.address === contract2) {
            value[1] = token;
        }
    }
    return value.filter(token => token !== null);
}

const declareWinner = async (battle_id) => {
    const battle = await Battle.findById(battle_id)
    if(!battle){
        return -1;
    }
    const {creator_id, contender_id} = battle
    const value = await getToke()
    const creator = findTokenByAddress(value, creator_id, contender_id);
    let winner_id = ''
    let winner = ''
    if (creator[0].v24hUSD > creator[1].v24hUSD) {
        winner_id = creator_id
        winner = 'creator'
    } else {
        winner_id = contender_id
        winner = 'contender'
    }
    battle.status = 'past'
    await battle.save()
    const summary = await Summary.create({ battle_id, winner, winner_id })
    return summary._id
}
module.exports = { getToke, declareWinner }