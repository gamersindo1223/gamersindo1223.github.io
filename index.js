const express = require('express')
const Discord = require('discord.js')
const path = require('path')
require('dotenv').config();

const app = express()
//https://discord.com/api/webhooks//
const id = process.env["client"]
const token = process.env["TOKEN"]
const webhook = new Discord.WebhookClient(id , token)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.post('/form', (req, res) => {
    let mapped = Object.entries(req.body).map(c => {
        return {
            [c[0]]: c[1]
        }
    })
    let mappedString = mapped.map(c => `${Object.keys(c)[0]}\n> ${c[Object.keys(c)[0]]}`)
    webhook.send(mappedString.join("\n"))
})
app.listen(3000, () => {
    console.log(`App listening on http://localhost:3000`)
}) 