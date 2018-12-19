const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount        : {type: Number,   required: true},
    paidBy        : {type: String,   required: true},   // Id of user who paid
    description   : {type: String,   default: ""},      // Description String of transaction
    splitRatio   : {type: [Number], default: ""},      // Array of splitRatio's for all members in paidFor array
    paidFor       : {type: [String], required: true},   // Array of Id's of users
}, {timestamps: true})

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction