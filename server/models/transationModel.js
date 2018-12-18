const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount        : {type: Number,   required: true},
    paidBy        : {type: String,   required: true},   // Id of user who paid
    description   : {type: String,   default: ""},
    paidFor       : {type: [String], required: true},   // Array of Id's of users
    includeSelf   : {type: Boolean,  required: true}    // Check if he also paid for himself
}, {timestamps: true})

const User = mongoose.model('transaction', transactionSchema)

module.exports = Transactions
