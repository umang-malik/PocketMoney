const router     = require('express').Router()
const bodyParser = require('body-parser')
const Transaction = require('../models/transactionModel.js')
const User       = require('../models/userModel.js')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Handler to validate transaction api request
const transactionReqHandler = function(req, res, next){
    if((req.body.amount == undefined) || (!req.body.paidBy) || (!req.body.paidFor) || (!req.body.splitRatio) ){
        res.status(400)
        res.setHeader("Access-Control-Allow-Origin", "http://localhost")
        res.send("User Id not sent!")
    } else {
        next()
    }
}

function updateTransactions(paidBy, index, splitRatio, currUsers, sum, transactionId, amount){
    console.log(index)
    if(index === splitRatio.length){
        User.findOneAndUpdate({Id: paidBy['Id']},paidBy,{new:true}).then(function(resp){
            console.log(resp)
            return
        })
    } 
    else{
        User.findOneAndUpdate({Id: currUsers[index]},{$push:{transactions: {"transactionId": transactionId}}},{new:true}).then(function(idUser){
            for(var i=0; i<idUser['friends'].length; i++){
                if(idUser['friends'][i].Id === paidBy['Id']){
                    idUser['friends'][i].currBalance -= ((splitRatio[index]*amount/sum));
                    // idUser['friends'][i].currBalance = 100
                    for(var j=0;j<paidBy['friends'].length;j++){
                        if(paidBy['friends'][j]['Id'] === idUser['Id']){
                            paidBy['friends'][j].currBalance += ((splitRatio[index]*amount/sum));
                        }
                    }
                    break;
                }
            }
            console.log(idUser)
            User.findOneAndUpdate({Id: currUsers[index]},idUser,()=>{
                updateTransactions(paidBy, index+1, splitRatio, currUsers, sum, transactionId, amount)
            })
        })
    }
}

// Endpoint for making a new transaction
router.post('/new', transactionReqHandler, function(req, res){
    var splitRatio = req.body.splitRatio.map(Number)
    var sum = splitRatio.reduce(function(a, b) { return a + b; }, 0)
    var amount = req.body.amount
    for(var i=0; i<req.body.paidFor.length; i++){
        if(req.body.paidFor[i] === req.body.paidBy){
            amount = amount - ((splitRatio[i]*amount)/sum)
            sum = sum - splitRatio[i];
            splitRatio = splitRatio.splice(i, 1)
            var paidForNew = req.body.paidFor
            paidForNew.splice(i,1)
        }
    }

    User.findOne({Id: req.body.paidBy}).then(function(paidBy){
        if(!paidBy){
            res.status(404)
            res.setHeader("Access-Control-Allow-Origin", "http://localhost")
            res.send("User does not exist")
        } else {
            //Check if all users exist-
            User.find({Id: {$in: paidForNew}}).then(function(currUsers){
                if(!currUsers || currUsers.length != paidForNew.length){
                    res.status(404)
                    res.setHeader("Access-Control-Allow-Origin", "http://localhost")
                    res.send("Some user does not exist")
                    return false
                } else{
                    new Transaction({
                        amount: amount,
                        paidBy: req.body.paidBy,
                        description: req.body.description,
                        splitRatio: splitRatio,
                        paidFor: paidForNew,
                    }).save().then(function(result){
                        
                        paidBy['transactions'].push({
                            transactionId: result['_id']
                        })
                        updateTransactions(paidBy, 0, splitRatio, paidForNew, sum, result['_id'], amount)
                
                        res.status(200)
                        res.setHeader("Access-Control-Allow-Origin", "http://localhost")
                        res.send("New transaction successfully created!")
                    })
                }
            })
        }
    })
    .catch(function(err){
        console.log(err)
        res.status(500)
        res.setHeader("Access-Control-Allow-Origin", "http://localhost")
        res.send("Internal Server Error")
    })
    
})

module.exports = router