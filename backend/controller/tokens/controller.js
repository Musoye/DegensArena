const expressAsyncHandler = require('express-async-handler')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')
const Token = require('../../models/tokenModel.js')
const { getToke } = require('./birdeye.js')


const createToken = expressAsyncHandler(async (req, res) => {
    const { name, contract_address, image_url, price, assest_name } = req.body
    if (!name || !contract_address || !image_url) {
        return res.status(400).json({ 'error': 'No name, contract_address or image_url in the request body' })
    }
    let symbol = req.body.symbol
    const exist = await Token.findOne({ contract_address })
    if (exist) {
        return res.status(409).json({ 'error': 'A token with the same contract address exist' })
    }
    if (!symbol) {
        symbol = name.slice(0, 3)
    }
    const token = await Token.create({ name, contract_address, image_url, symbol, price, assest_name });
    return res.status(201).json(format(token))
})


function findTokenByAddress(tokens, contractAddress) {
    for (const token of tokens.data) {
        if (token.address === contractAddress) {
            return token;
        }
    }
    return null;
}

const getTokens = expressAsyncHandler(async (req, res) => {
    if (!req.query.contract_address) {
        const tokens = await Token.find({});
        const result = tokens.map((token) => format(token));
        return res.status(200).json(result);
    } else {
        const result = await Token.findOne({ contract_address: req.query.contract_address })
        if (!result) {
            return res.status(404).json({ 'error': 'The token cannot be found' })
        }
        return res.status(200).json(result)
    }
})

const getToken = expressAsyncHandler(async (req, res) => {
   const result = await Token.findOne({ _id: req.params.id })
    if (!result) {
        return res.status(404).json({ 'error': 'The token cannot be found' })
    }
    return res.status(200).json(result)
})

const updateToken = expressAsyncHandler(async (req, res) => {
    const { name, contract_address, image_url, symbol, price, assest_name  } = req.body
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
    if (price) {
        updated.price = price
    }
    if (assest_name) {
        updated.assest_name = assest_name
    }
    await Token.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    const newToken = await Token.findOne({ _id: req.params.id });
    return res.status(200).json(format(newToken));
})

module.exports = { createToken, getTokens, getToken, updateToken }