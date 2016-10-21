'use strict';

const Env = require('node-env-file');
const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

Env(__dirname + '/.env');

const TextCommand = Telegram.TextCommand;
const tg = new Telegram.Telegram(process.env.TELEGRAM_KEY, {
    workers: 2,
    webAdmin: {
        port: 7777,
        host: "0.0.0.0"
    }
});

let axios = require('axios');

class PingController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    pingHandler($) {
        $.sendMessage('pong ck');
    }

    get routes() {
        return {
            'pingCommand': 'pingHandler'
        }
    }
}

class StartController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    start($) {
        let mString = $.message.text.substring(1);
        // http://stackoverflow.com/questions/11757013/regular-expressions-for-city-name
        let re = new RegExp("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$");

        if (mString.length && re.test(mString.replace(/^\s+|\s+$/g, ''))) {
            axios.get('http://api.openweathermap.org/data/2.5/forecast/city', {
                params: {
                    q: mString,
                    APPID: process.env.OPENWEATHERMAP_KEY
                }
            })
                .then(function (response) {
                    // console.log($);  // $.message.text
                    $.sendMessage(`${Math.floor(response.data.list[0].main.temp - 273.15)} °C, ${response.data.list[0].weather[0].description}`);
                })
                .catch(function (error) {
                    $.sendMessage('Never heard it, dude...');
                });
        }
    }

    get routes() {
        return {
            'startHandler': 'start'
        }
    }
}

tg.router
    .when(
        new TextCommand('ping', 'pingCommand '),
        new PingController()
    );

tg.router
    .when(
        new TextCommand('?', 'startHandler'),
        new StartController()
    );
