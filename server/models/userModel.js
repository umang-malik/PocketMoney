const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const userSchema = new Schema({
    Id              :  {type: String, required: true, unique: true},
    Name            :  {type: String, required: true, unique: true},
    
    transactions    :  {type: [
        {
            transactionId : String
        }
    ], default: []},

    friends         :  {type: [
        {
        Id          : {type: String, required: true},
        Name        : {type: String, required: true},
        currBalance : {type: Number, required: true} // Positive => Friend owes this user
        },
    ], default: []}
})

const User = mongoose.model('user', userSchema)

module.exports = User
