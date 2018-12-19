const router     = require('express').Router()
const bodyParser = require('body-parser')
const expensesUser       = require('../models/expensesUserModel.js')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Handler to check if userId is send along with api request
const checkUserId = function(req, res, next){
    if(!req.body.id){
        res.status(400)
        res.setHeader("Access-Control-Allow-Origin", "http://localhost")
        res.send("User Id not sent!")
    } else {
        next()
    }
}

// Endpoint for adding a new user.
router.post('/newUser', checkUserId, function(req, res){
    new expensesUser({
        Id  : req.body.id,
        name: req.body.name
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


// Endpoint for adding a new expense.
router.post('/add', checkUserId, function(req, res){
   expensesUser.findOne({Id: req.body.id}).then(function(userObj){
        if(userObj && req.body.amount && req.body.category){
            console.log(userObj['expenses'])
            expensesUser.findOneAndUpdate({Id: req.body.id},{$push:{expenses:{
                category: req.body.category,
                amount: req.body.amount,
                comment: (req.body.comment===undefined)?"":(req.body.comment)
            }}}).then(function(idUser){
                expensesUser.findOneAndUpdate({Id: req.body.id},{$set:{expenditure : userObj.expenditure + req.body.amount}}).then(function(idUser){
                    console.log("New item")
                    res.status = 200
                    res.setHeader("Access-Control-Allow-Origin", "http://localhost")
                    res.send("New item added");
                })
            })
        } else {
            res.status = 404
            res.setHeader("Access-Control-Allow-Origin", "http://localhost")
            res.send("User not found or field missing");
        }
   }).catch(function(err){
    console.log(err)
    res.status(500)
    res.send("Internal Server Error")
    })
});

//Endpoint for viewing a user's expenses.
router.post('/view', checkUserId, function(req, res){
    expensesUser.findOne({Id: req.body.id}).then(function(currUser){
        if(currUser){
            res.status(200)
            res.setHeader("Access-Control-Allow-Origin", "http://localhost")
            res.send(currUser)
        }
        else{
            res.status(404)
            res.setHeader("Access-Control-Allow-Origin", "http://localhost")
            res.send("User does not exist")
        }
    }).catch(function(err){
        console.log(err)
        res.status(500)
        res.setHeader("Access-Control-Allow-Origin", "http://localhost")
        res.send("Internal Server Error")
    })
})    

module.exports = router
