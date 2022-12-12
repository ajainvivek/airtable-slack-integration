// Update notes on existing opportunity
// UI for updating notes on existing opportunity

const { Modal, Blocks, Elements } = require('slack-block-builder');

const updateNotesOpportunity = ({ prefilledNotes, opportunityId }) => {
  const textArea = (notes) => Elements.TextInput({
    actionId: 'notes',
    placeholder: 'Enter notes',
    initialValue: notes,
    multiline: true,
  });

  return Modal({
    title: 'Update Notes',
    submit: 'Update',
    close: 'Cancel',
    callbackId: 'update_notes_view',
    privateMetaData: opportunityId,
  })
    .blocks(
      Blocks.Input({
        label: 'Notes',
        element: textArea(prefilledNotes),
        blockId: 'block_notes',
      }),
    ).buildToObject();
};

module.exports = updateNotesOpportunity;
