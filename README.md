# Line-Discord

LINEとDiscord間を行き来します  
Forkしてお使いください

## 必要なもの
- LINEのbot
- Discordのbot
- 動かすためのサーバー(herokuでも出来ます)

## すること
```
npm install

heroku config:set SECRET_KEY=XXXX --app line-discord-akatsuki1910
heroku config:set ACCESS_TOKEN=XXXX --app line-discord-akatsuki1910
heroku config:set DISCORD_TOKEN=XXXX --app line-discord-akatsuki1910
```

## 使用方法
1. LINEとDiscordのbotを使用したい鯖に入れる
2. LINEで```!set```とうつ
3. Discordの使用したいチャンネルで```!set```とうつ
4. できあがり
