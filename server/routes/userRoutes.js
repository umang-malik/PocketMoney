const router       = require('express').Router()
const bodyParser   = require('body-parser')
const User         = require('../models/userModel.js')
const Transactions = require('../models/userModel.js')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Handler to check if userId is senf along with api request
const checkUserId = function(req, res, next){
    if(!req.body.id){
        res.status(400)
        res.send("User Id not sent!")
    } else {
        next()
    }
}

// Endpoint for making a new user
router.post('/new', checkUserId, function(req, res){
    new User({
        Id  : req.body.id,
        Name: req.body.name
    }).save().then(function(result){
        res.status(200)
        res.send("New user successfuly created!")
    })
    .catch(function(err){
        console.log(err)
        res.status(500)
        res.send("Internal Server Error")
    })
})

// Endpoint for retreiving user's friends details
router.post('/friends', checkUserId, function(req, res){
    User.findOne({Id: req.body.id}).then(function(currUser){
        if(currUser){
            res.status(200)
            res.send(currUser['friends'])
        }
        else{
            res.status(404)
            res.send("User does not exist")
        }
    })
    .catch(function(err){
        console.log(err)
        res.status(500)
        res.send("Internal Server Error")
    })
})

// Endpoint for retreiving user's transaction id's details
router.post('/transactions', checkUserId, function(req, res){
    User.findOne({Id: req.body.id}).then(function(currUser){
        if(currUser){
            Transactions.find({
                '_id': { $in: currUser['transactions']}
            }, function(err, docs){
                if(err){
                    console.log(err)
                    res.status(500)
                    res.send("Internal Server Error")
                } else{
                    res.status(200)
                    res.send(docs)
                }
            })
        }
        else{
            res.status(404)
            res.send("User does not exist")
        }
    })
    .catch(function(err){
        console.log(err)
        res.status(500)
        res.send("Internal Server Error")
    })
})

module.exports = router