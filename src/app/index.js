const express = require('express')
const router = require('./../routing')
const bodyParser=require('body-parser')
const database = require('./../database')
const path = require('path')
var cors = require('cors')
const expressValidator=require('express-validator')
const app = express()

app.use(cors({
  origin:"http://localhost:4200"
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)

app.use(expressValidator())
app.use(express.static(__dirname+'./../../client/dist/client'))
exports.start = async () => {
  try {
    await database.connect()
    console.log('Connected to database')
    const port = 3000
    await app.listen(port)
    console.log(`Connected on port: ${port}`)
  } catch (error) {
    console.log('Something went wrong')
    console.log(error)
  }
}
