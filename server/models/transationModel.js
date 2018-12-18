const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount        : {type: Number,   required: true},
    paidBy        : {type: String,   required: true},
    description   : {type: String,   default: ""},
    paidFor       : {type: [String], required: true},
    includeSelf   : {type: Boolean,  required: true}
}, {timestamps: true})

const User = mongoose.model('transaction', transactionSchema)

module.exports = Transactions
