const router     = require('express').Router()
const bodyParser = require('body-parser')
const Transaction = require('../models/transactionModel.js')
const User       = require('../models/userModel.js')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Handler to validate transaction api request
const transactionReqHandler = function(req, res, next){
    if(req.body.amount == undefined || (!req.body.paidBy) || (!req.body.paidFor)){
        res.status(400)
        res.setHeader("Access-Control-Allow-Origin", "http://localhost")
        res.send("User Id not sent!")
    } else {
        next()
    }
}

// Endpoint for making a new transaction
router.post('/new', transactionReqHandler, function(req, res){
    var includeSelf = false;
    if(req.body.paidFor.includes(req.body.paidBy)){
        includeSelf = true
    }

    //Check if all users exist-
    req.body.paidFor.forEach(friend =>{
        User.findOne({Id: friend}).then(function(currUser){
            if(!currUser){
                res.status(404)
                res.setHeader("Access-Control-Allow-Origin", "http://localhost")
                res.send("Friend does not exist");
            }
        })
        .catch(function(err){
            console.log(err)
            res.status(500)
            res.setHeader("Access-Control-Allow-Origin", "http://localhost")
            res.send("Internal Server Error")
        })
    });
    User.findOne({Id: req.body.paidBy}).then(function(paidBy){
        if(!paidBy){
            res.status(404)
            res.setHeader("Access-Control-Allow-Origin", "http://localhost")
            res.send("User does not exist")
        } else {
            new Transaction({
                amount: req.body.amount,
                paidBy: req.body.paidBy,
                description: req.body.description,
                paidFor: req.body.paidFor,
                includeSelf: includeSelf
            }).save().then(function(result){
                console.log(result)
                var perPerson = req.body.amount/req.body.paidFor.length;
                
        
                res.status(200)
                res.setHeader("Access-Control-Allow-Origin", "http://localhost")
                res.send("New transaction successfully created!")
            })
            .catch(function(err){
                console.log(err)
                res.status(500)
                res.setHeader("Access-Control-Allow-Origin", "http://localhost")
                res.send("Internal Server Error")
            });
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