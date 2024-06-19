const pino = require('pino');

// ブラウザ向け設定
const logger = pino({
  level: 'info', // ログのレベルを設定 (例: info, error, warn)
  timestamp: pino.stdTimeFunctions.isoTime,
  browser: {
    transmit: {
      send: function (level, logEvent) {
        // ここでログを送信する処理を実装する
        console.log(`Sending log to server: ${logEvent.message}`);
      },
    },
  },
});

module.exports = logger;
