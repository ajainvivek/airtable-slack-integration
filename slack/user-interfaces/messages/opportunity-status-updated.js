const { Message, Section, Actions, Divider, Button, Image } = require('slack-block-builder');

// Opportunity status updated
// UI for when an opportunity status is updated

const opportunityStatusUpdated = (channel, opportunity) => {
  console.log('opportunityStatusUpdated', opportunity);
  const {
    id,
    salesStage,
    signedContractValue,
    name,
    salesRep,
    probability,
    notes,
  } = opportunity;

  if (salesStage === 'Closed-Won') {
    // Celebrate!
    return Message({
      text: 'Congratulations! opportunity closed won!',
      channel,
    })
      .blocks(
        // celebration gif
        Image({
          imageUrl: 'https://media2.giphy.com/media/U4DswrBiaz0p67ZweH/giphy.gif',
          altText: 'celebration',
        }),
        // congrats message
        Section({
          text: `Congratulations <*${salesRep.Name}*>! Opportunity *${name}* won! 🎉🎉🎉🎉`,
        }),
        Section({
          text: `*Signed Contract Value:*\n${signedContractValue || 'N/A'}$`,
        }),
        Divider(),
        Actions().elements(
          // Open link to opportunity in Airtable
          Button({
            text: 'Open in Airtable',
            url: `https://airtable.com/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}/${opportunity.id}`,
          }),
        ),
      ).buildToObject();
  }
  return Message({
    text: 'Opportunity Status Updated',
    channel,
  })
    .blocks(
      Section({
        text: '🗣️ *Opportunity status updated!*',
      }),
      Section({
        text: `*Opportunity ID:*\n${id}`,
      }),
      Section({
        text: `*Name*\n${name}`,
      }),
      Section({
        text: `*Sales Rep:*\n${salesRep.Name}`,
      }),
      Section({
        text: `*Sales Stage:*\n${salesStage}`,
      }),
      Section({
        text: `*Probability:*\n${probability}%`,
      }),
      Section({
        text: `*Notes:*\n${notes}`,
      }),
      Divider(),
      Actions().elements(
        // Update notes
        Button({
          text: 'Update Notes',
          actionId: 'update_notes',
          value: JSON.stringify({
            id,
            notes,
          }),
        }),
        // Open link to opportunity in Airtable
        Button({
          text: 'Open in Airtable',
          url: `https://airtable.com/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}/${opportunity.id}`,
        }),
      ),
    ).buildToObject();
};

module.exports = opportunityStatusUpdated;
