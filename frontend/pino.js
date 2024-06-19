const pino = require('pino');
import axios from 'axios';

// const fetch = async (obj) => {
//   const response = await axios.post('http://0.0.0.0:8000/api/logs/', obj);
// };

// ブラウザ向け設定
const logger = pino({
  level: 'info', // ログのレベルを設定 (例: info, error, warn)
  timestamp: pino.stdTimeFunctions.isoTime,
  browser: {
    transmit: {
      send: function (level, logEvent) {
        // ここでログを送信する処理を実装する
        console.log(`Sending log to server: ${logEvent.message}`);
        // サーバーにログを送信する処理を実装する
        // fetch({
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(logEvent),
        // }).catch(error => console.error('Failed to send log to server', error));
      },
    },
    // write: {
    //   level: 'info', // ローカルに書き込むログのレベルを設定
    //   timestamp: pino.stdTimeFunctions.isoTime,
    //   destination: '/logs/app.log', // ローカルに保存するファイルのパス
    // },
  },
});

module.exports = logger;
