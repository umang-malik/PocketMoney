const router     = require('express').Router()
const bodyParser = require('body-parser')
const User         = require('../models/userModel.js')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/', function(req, res){
    res.status(200)
    res.send("Hi")  
})

module.exports = router