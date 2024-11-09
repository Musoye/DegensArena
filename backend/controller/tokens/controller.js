const expressAsyncHandler = require('express-async-handler')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')
const Token = require('../../models/tokenModel.js')
const { getToke } = require('./birdeye.js')


const createToken = expressAsyncHandler(async (req, res) => {
    const {name, contract_address, image_url} = req.body
    if(!name || !contract_address || !image_url ) {
        return res.status(400).json({'error': 'No name, contract_address or image_url in the request body'})
    }
    let symbol = req.body.symbol
    const exist = await Token.findOne({contract_address})
    if (exist) {
        return res.status(409).json({'error': 'A token with the same contract address exist'})
    }
    if (!symbol) {
        symbol = name.slice(0, 3)
    }
    const token = await Token.create({name, contract_address, image_url, symbol})
    return res.status(201).json(format(token))
})

// const getTokens = expressAsyncHandler(async (req, res) => {
//     const query = req.query.query || ''
//     let response = []
//     if (!query) {
//         response = await Token.find()
//     } else {
//         response = await Token.find({name: query})     
//     }
//     if (response.length == 0 && query){
//         response = await Token.find({contract_address: query})
//     }
//     const value = []
//     for (let resa of response) {
//         value.push(format(resa))
//     }
//     return res.status(200).json(value)
// })
function findTokenByAddress(tokens, contractAddress) {
    for (const token of tokens.data) {
        if (token.address === contractAddress) {
            return token;
        }
    }
    return null;
}

const getTokens = expressAsyncHandler(async (req, res) => {
    const value = await getToke()
    return res.status(200).json(value)
})

const getToken = expressAsyncHandler(async (req, res) => {
    const value = await getToke()
    const result = findTokenByAddress(value, req.params.id)
    if(!result) {
        return res.status(404).json({'error': 'The token cannot be found'})
    }
    return res.status(200).json(result)
})

const updateToken = expressAsyncHandler(async (req, res) => {
    const { name, contract_address, image_url, symbol}  = req.body
    const updated = {}
    if (name) {
        updated.name = name
    }
    if (contract_address) {
        updated.contract_address = contract_address
    }
    if (image_url) {
        updated.image_url = image_url
    }
    if (symbol) {
        updated.symbol = symbol
    }
    await Token.findByIdAndUpdate(req.params.id, { $set: updated}, { new: true })
    const newToken = await Token.findOne({ _id: req.params.id });
    return res.status(200).json(format(newToken));
})

module.exports = { createToken, getTokens, getToken, updateToken }