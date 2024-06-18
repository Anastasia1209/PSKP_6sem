const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')

const app = express()

app.use('/',(req,res,next) =>{
    res.send('Hello')
})

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname,'getCert','LAB.key')),
    cert: fs.readFileSync(path.join(__dirname,'getCert','LAB.crt'))
}, app)

sslServer.listen(3443, ()=> console.log('SSL server start on https://GAY:3443'))