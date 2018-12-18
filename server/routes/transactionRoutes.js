const router     = require('express').Router()
const bodyParser = require('body-parser')
const User         = require('../models/userModel.js')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Handler to validate transaction api request
const transactionReqHandler = function(req, res, next){
    if(req.body.amount == undefined || (!req.body.paidBy) || (!req.body.paidFor) ){
        res.status(400)
        res.send("User Id not sent!")
    } else {
        next()
    }
}

// Endpoint for making a new transaction
router.post('/new', transactionReqHandler, function(req, res){
    
    
})

module.exports = router