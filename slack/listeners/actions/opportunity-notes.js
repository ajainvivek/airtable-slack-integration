const updateNotesOpportunityModal = require('../../user-interfaces/modals/update-notes-opportunity');

//  Update opportunity notes
const opportunityNotesActionCallback = async ({ ack, client, body }) => {
  try {
    await ack();

    const { trigger_id, actions } = body;
    const { value } = actions[0];
    const { notes, id } = JSON.parse(value);

    const modal = updateNotesOpportunityModal({ prefilledNotes: notes, opportunityId: id });
    await client.views.open({
      trigger_id,
      view: modal,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { opportunityNotesActionCallback };
