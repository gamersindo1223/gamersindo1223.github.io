const express = require('express')
const Discord = require('discord.js')
const path = require('path')

const html = `<!DOCTYPE html>

<html>
    <body>
        <form method="POST" action="http://localhost:3000/form">
            <form>
                <label for="first-name">First name:</label><br>
                <input type="text" id="first-name" name="first-name"><br>
                <label for="last-name">Last name:</label><br>
                <input type="text" id="last-name" name="last-name"><br>
                <label for="discord usertag">discord usertag:</label><br>
                <input type="text" id="discord usertag" name="discord usertag">
                <input type="submit">
              </form>
        </form>
    </body>
</html>`

async function handleRequest(request) {
  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  })
}
addEventListener("fetch", event => {
    return event.respondWith(handleRequest(event.request))
  })
const app = express()
//https://discord.com/api/webhooks//
const webhook = new Discord.WebhookClient("851984962760081419", "lUFWWdJu8PPxyyuIhpw2iBzyiHtOYFj-LJYLMxKgnQjUIHqBwGQ-Rkq6RW7TQrMug34N")

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
    res.send("your info has been interviewed")
})

app.listen(3000, () => {
    console.log(`App listening on http://localhost:3000`)
}) 