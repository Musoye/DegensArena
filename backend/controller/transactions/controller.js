const expressAsyncHandler = require("express-async-handler");
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require("../../utils/formatter.js");
const Transaction = require("../../models/transactionModel.js");

const createTransaction = expressAsyncHandler(async (req, res) => {
    const { token, user_id, amount, contender_id } = req.body;
    if (!token) {
        return res.status(400).json({ error: "No Token in the request body" });
    }
    const trans = await Transaction.create({ token, user_id, amount, contender_id });
    return res.status(201).json(format(trans));
});

const transact = async (query) => {
    let response = ''
    if (query) {
        response = await Transaction.find({ token: query });
    } else {
        response = await Transaction.find()
    }
    const value = [];
    for (let resa of response) {
        value.push(format(resa));
    }
    return { transactions: value }
}

const getTransactions = expressAsyncHandler(async (req, res) => {
    const token = req.query.token
    const result = await transact(token);
    return res.status(200).json(result);
})



const getTransaction = expressAsyncHandler(async (req, res) => {
    const trans = await Transaction.findById(req.params.id);
    if (!trans) {
        return res.status(404).json({ error: "The Transaction cannot be found" });
    }
    return res.status(200).json(format(trans));
});

const updateTransaction = expressAsyncHandler(async (req, res) => {
    const trans = await Transaction.findById(req.params.id);
    if (!trans) {
        return res.status(400).json({ error: "Transaction not found" });
    }
    const { amount } = req.body;
    if (amount) {
        trans.amount = amount;
    }
    await trans.save();
    return res.status(200).json(format(trans));
});

module.exports = { createTransaction, getTransactions, getTransaction, updateTransaction };