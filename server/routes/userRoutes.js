const router       = require('express').Router()
const bodyParser   = require('body-parser')
const User         = require('../models/userModel.js')
const Transaction = require('../models/transactionModel.js')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Handler to check if userId is send along with api request
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
        res.setHeader("Access-Control-Allow-Origin", "http://localhost")
        res.send("New user successfuly created!")
    })
    .catch(function(err){
        console.log(err)
        res.status(500)
        res.setHeader("Access-Control-Allow-Origin", "http://localhost")
        res.send("Internal Server Error")
    })
})

// Endpoint for retreiving user's friends details
router.post('/friends', checkUserId, function(req, res){
    User.findOne({Id: req.body.id}).then(function(currUser){
        if(currUser){
            res.status(200)
            res.setHeader("Access-Control-Allow-Origin", "http://localhost")
            res.send(currUser['friends'])
        }
        else{
            res.status(404)
            res.setHeader("Access-Control-Allow-Origin", "http://localhost")
            res.send("User does not exist")
        }
    })
    .catch(function(err){
        console.log(err)
        res.status(500)
        res.setHeader("Access-Control-Allow-Origin", "http://localhost")
        res.send("Internal Server Error")
    })
})

// Endpoint for retreiving user's friends details
router.post('/addFriend', checkUserId, function(req, res){
    User.findOne({Id: req.body.id}).then(function(currUser){
        if(currUser){
            var friendToAdd = req.body.friendName
            User.findOne({"Name": friendToAdd}).then(function(friendUser){
                if(friendUser && currUser!=friendUser){
                    currUser['friends'].push({
                        "Id": friendUser['Id'],
                        "Name": friendUser['Name'],
                        "currBalance": 0
                    })
                    friendUser['friends'].push({
                        "Id": currUser['Id'],
                        "Name": currUser['Name'],
                        "currBalance": 0
                    })
                    User.findOneAndUpdate({Id: currUser['Id']},{$set:{friends: currUser['friends']}}).then(function(result){
                        User.findOneAndUpdate({Id: friendUser['Id']},{$set:{friends: friendUser['friends']}}).then(function(resut){
                            res.status(200)
                            res.setHeader("Access-Control-Allow-Origin", "http://localhost")
                            res.send("Succesfully Added A friend")
                        })
                    })
                } else{
                    res.status(400)
                    res.setHeader("Access-Control-Allow-Origin", "http://localhost")
                    res.send("No Such User Exists!")
                }

            })
        }
        else{
            res.status(404)
            res.setHeader("Access-Control-Allow-Origin", "http://localhost")
            res.send("User does not exist")
        }
    })
    .catch(function(err){
        console.log(err)
        res.status(500)
        res.setHeader("Access-Control-Allow-Origin", "http://localhost")
        res.send("Internal Server Error")
    })
})

// Endpoint for retreiving user's transaction id's details
router.post('/transactions', checkUserId, function(req, res){
    User.findOne({Id: req.body.id}).then(function(currUser){
        if(currUser){
            var transactionIdArr = []
            for(var i=0; i<currUser['transactions'].length;i++){
                transactionIdArr.push(currUser['transactions'][i]['transactionId'])
            }
            console.log(transactionIdArr)
            Transaction.find({
                '_id': { $in: transactionIdArr}
            }, function(err, docs){
                if(err){
                    console.log(err)
                    res.status(500)
                    res.setHeader("Access-Control-Allow-Origin", "http://localhost")
                    res.send("Internal Server Error")
                } else{
                    res.status(200)
                    res.setHeader("Access-Control-Allow-Origin", "http://localhost")
                    console.log(docs)
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
        res.setHeader("Access-Control-Allow-Origin", "http://localhost")
        res.send("Internal Server Error")
    })
})

module.exports = router