const express = require('express');
const PORT = process.env.PORT || 5000;
const line = require("@line/bot-sdk");
const Discord = require('discord.js');
const DiscordClient = new Discord.Client();
const token = process.DISCORD_TOKEN;

const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
};
const LineClient = new line.Client(config);

express()
  .set('views', __dirname + '/pages')
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .post("/test/", (req, res) => res.json({ test: "test" }))
  .post("/linediscord/", line.middleware(config), (req, res) => lineBot(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

function lineBot(req, res) {
  res.status(200).end();
  const events = req.body.events;
  for (let i = 0, l = events.length; i < l; i++) {
    const ev = events[i];
    echoman(ev);
  }
  console.log("OK");
}

async function echoman(ev) {
  const pro =  await LineClient.getProfile(ev.source.userId);
  return LineClient.replyMessage(ev.replyToken, {
    type: "text",
    text: `${pro.displayName}さん、今「${ev.message.text}」って言いました？`
  });
}

var myname = "LineDiscord";
var master = "akatsuki1910";

DiscordClient.on('message', message => {
    if(message.content === "!test") {
        author = message.author.username;
        if (author === master) {
            var dateStr = new Date().toLocaleString();
            message.channel.send({embed: {color: 2550000,description: dateStr + "\nThis is test text"}});
        }
    }
});

DiscordClient.login(token);