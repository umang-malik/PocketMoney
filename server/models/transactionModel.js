const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount        : {type: Number,   required: true},
    paidBy        : {type: String,   required: true},   // Id of user who paid
    description   : {type: String,   default: ""},      // Description String of transaction
    splitRation   : {type: [Number], default: ""},      // Array of splitRatio's for all members in paidFor array
    creator       : {type: String,   required: true},   // Person who initiated this transaction
    paidFor       : {type: [String], required: true},   // Array of Id's of users
    includeSelf   : {type: Boolean,  required: true}    // Check if he also paid for himself to differ split from loan
}, {timestamps: true})

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction