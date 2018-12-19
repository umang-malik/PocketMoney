const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expensesUserSchema = new Schema({
    Id          :  {type: String, required: true, unique: true},
    expenses    :  {type: [
        {
            category  : String,
            amount : String,
            comment: String,
            timestamp: {type: Date, default: Date.now}
        }
    ], default: []},
    expenditure: {type: Number, default: 0} //total expenditure for current month.
}, {timestamps: true})

const expensesUser = mongoose.model('expensesUser', expensesUserSchema)

module.exports = expensesUser