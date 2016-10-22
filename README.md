# bernH

Rename ```.env_example``` to ```.env``` and populate it with your keys get them on [Telegram](https://telegram.me/botfather) and [OpenWeatherMap](https://openweathermap.org/appid), then
```
npm install
npm run start
```

Query your bot on Telegram as
```
?{cityName}
```

For example:
```
?London
? LoNDon
?  San fRancIsCo
?villes du Québec
? Val-d'Or
```

bernH replies with temperature and sky description (clear, clouds etc...).

Its name is a pun Italians might get. :)

It is just a simple toy, it's not production ready. It uses [telegram-node-bot](https://github.com/naltox/telegram-node-bot).
