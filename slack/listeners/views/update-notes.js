const { updateOpportunityNotes } = require('../../../airtable/records');

// Update notes on existing opportunity
const updateNotesViewCallback = async ({ ack, view, body, client }) => {
  await ack();

  try {
    const formValues = view.state.values;
    const noteInputValue = formValues.block_notes.notes.value;
    try {
      await updateOpportunityNotes(body.view.private_metadata, noteInputValue);
      client.chat.postMessage({
        channel: body.user.id,
        text: `<@${body.user.id}> updated the following :sparkles: notes :sparkles:: \n\n ${noteInputValue}`,
      });
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { updateNotesViewCallback };
