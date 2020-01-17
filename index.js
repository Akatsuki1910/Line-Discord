const express = require('express');
const PORT = process.env.PORT || 5000;
const line = require("@line/bot-sdk");
const Discord = require('discord.js');
const DiscordClient = new Discord.Client();
const token = process.env.DISCORD_TOKEN;

const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
};
const LineClient = new line.Client(config);

const myname = "LineDiscord";
const master = "akatsuki1910";

let LineGroupId = "";
let MessageChannel = "";

DiscordClient.on('message', message => {
  if(message.content === "!test") {
    author = message.author.username;
    if (author === master) {
        var dateStr = new Date().toLocaleString();
        message.channel.send({embed: {color: 2550000,description: dateStr + "\nThis is test text"}});
    }
  }else if(message.content === "!set"){
    MessageChannel = message.channel;
    MessageChannel.send("設定しました");
  }else{
    LineClient.pushMessage(LineGroupId, {
      type: "text",
      text: `${message.content}`
    });
  }
});

DiscordClient.login(token);

express()
  .set('views', __dirname + '/pages')
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .post("/test/", (req, res) => res.send(token))
  .post("/linediscord/", line.middleware(config), (req, res) => lineBot(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

function lineBot(req, res) {
  res.status(200).end();
  const events = req.body.events;
  for (let i = 0, l = events.length; i < l; i++) {
    const ev = events[i];
    echoman(ev);
  }
}

function echoman(ev) {
  if(ev.message.text == "!set"){
    LineGroupId = ev.source.groupId;
    LineClient.pushMessage(LineGroupId, {
      type: "text",
      text: "準備完了しました"
    });
  }
}