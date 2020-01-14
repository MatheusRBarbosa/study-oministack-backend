const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()

mongoose.connect('mongodb://admin:admin123@ds263448.mlab.com:63448/oministack', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.json())
app.use(routes)

app.listen(3000)