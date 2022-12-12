const viewOpportunityMessage = require('../../user-interfaces/messages/view-opportunity');
const { viewOpportunity, getSalesRep } = require('../../../airtable/records');

const viewOpportunityCommand = async ({ ack, body, client }) => {
  try {
    await ack();
    const { channel_id, text } = body;

    // View opportunity details in Slack
    try {
      const opportunity = await viewOpportunity(text);
      let salesRep = {};
      if (opportunity.rep && opportunity.rep.length > 0) {
        salesRep = await getSalesRep(opportunity.rep[0]);
      }
      const view = viewOpportunityMessage(
        channel_id,
        {
          ...opportunity,
          salesRep,
          id: text,
        },
      );
      await client.chat.postMessage(view);
    } catch (error) {
      await client.chat.postMessage({
        channel: channel_id,
        text: 'There was an error while trying to view the opportunity :( Check opportunity ID and try again.',
      });
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { viewOpportunityCommand };
