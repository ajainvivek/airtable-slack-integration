const { App, LogLevel } = require('@slack/bolt');
const { config } = require('dotenv');
const { WebClient } = require('@slack/web-api');

/** Load environment variables */
config();

const { registerListeners } = require('./slack/listeners');
const { viewOpportunity, listWebhookPayloads, getSalesRep } = require('./airtable/records');
const opportunityStatusUpdated = require('./slack/user-interfaces/messages/opportunity-status-updated');

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
        req.on('end', async () => {
          const body = JSON.parse(data);
          const webhookPayloads = await listWebhookPayloads(body.webhook.id);
          const lastChange = webhookPayloads[webhookPayloads.length - 1];
          const changedRecord = lastChange.changedTablesById[process.env.AIRTABLE_TABLE_NAME];
          const changedRecordId = Object.keys(changedRecord.changedRecordsById)[0];
          const opportunity = await viewOpportunity(changedRecordId);
          let salesRep = {};
          if (opportunity.rep && opportunity.rep.length > 0) {
            salesRep = await getSalesRep(opportunity.rep[0]);
          }
          // send a message to the sales channel
          web.chat.postMessage(
            opportunityStatusUpdated(process.env.SLACK_SALES_CHANNEL_ID, {
              id: changedRecordId,
              salesRep,
              ...opportunity,
            }),
          );
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
