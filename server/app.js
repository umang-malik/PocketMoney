const express           = require('express')
const mongoose          = require('mongoose')
const userRoutes        = require('./routes/userRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const expensesRoutes = require('./routes/expensesRoutes')
const keys              = require('./config/keys')

mongoose.promise = global.promise
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const app = express();

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, function(err) {
    if(err) {
      throw err
      process.exit(0)
    }

    console.log('connected to mongodb')
})

// set up routes
app.use('/api/user', userRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/expenses/', expensesRoutes)

// Testing the api
app.get('/api', function(req, res){
    res.status(200)
    res.send("Hello from SpliEasy API!")
})

const port = process.env.port || 3000

app.listen(port, function(){
  console.log("App listening on port " + port)
})