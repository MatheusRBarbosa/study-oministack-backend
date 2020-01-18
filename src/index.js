const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const http = require('http')
const { setupWebSocker } = require('./websocket')

const app = express()
const server = http.Server(app)

setupWebSocker(server)

mongoose.connect('mongodb://admin:admin123@ds263448.mlab.com:63448/oministack', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.json())
app.use(cors())
app.use(routes)

server.listen(3333)