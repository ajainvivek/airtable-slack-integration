const { App, LogLevel } = require('@slack/bolt');
// const Airtable = require('airtable');
const { config } = require('dotenv');
const { WebClient } = require('@slack/web-api');
const { registerListeners } = require('./listeners');

/** Load environment variables */
config();

/** Initialize Airtable */
// const base = Airtable.configure({
//   endpointUrl: 'https://api.airtable.com',
//   apiKey: process.env.AIRTABLE_API_KEY,
// }).base(process.env.AIRTABLE_BASE_ID);

const web = new WebClient(process.env.SLACK_BOT_TOKEN);

/** Initialization */
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
  customRoutes: [
    {
      path: '/health-check',
      method: 'GET',
      handler: (req, res) => {
        res.writeHead(200);
        res.end('OK');
      },
    },
    // airtable webhook
    {
      path: '/airtable/webhook',
      method: 'POST',
      handler: (req, res) => {
        const data = [];
        req.on('data', (chunk) => {
          data.push(chunk);
        });
        req.on('end', () => {
          const body = JSON.parse(data);
          console.log(body);
          // send a message to the sales channel
          web.chat.postMessage({
            channel: 'C04ERECTNE8',
            text: 'New deal created',
          });
        });
        req.on('error', (err) => {
          console.log('Error: ', err);
        });
        res.writeHead(200);
        res.end('OK');
      },
    },
  ],
});

/** Register Listeners */
registerListeners(app);

/** Start Bolt App */
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running! ⚡️');
  } catch (error) {
    console.error('Unable to start App', error);
  }
})();
