const { Message, Section, Actions, Divider, Button } = require('slack-block-builder');

const viewOpportunity = (channel, opportunity) => {
  const {
    id,
    name,
    salesStage,
    salesRep,
    lastContact,
    expectedCloseDate,
    forecastValue,
    probability,
    priority = false,
    notes = '',
  } = opportunity;

  console.log('opportunity', opportunity);

  return Message({
    text: 'Opportunity Details',
    channel,
  })
    .blocks(
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
        text: `*Forecast Value:*\n${forecastValue}$`,
      }),
      Section({
        text: `*Stage:*\n${salesStage}`,
      }),
      Section({
        text: `*Probability:*\n${probability}%`,
      }),
      Section({
        text: `*Priority:*\n${priority ? 'Yes' : 'No'}`,
      }),
      Section({
        text: `*Notes:*\n${notes}`,
      }),
      Section({
        text: `*Expected Close Date:*\n${expectedCloseDate}`,
      }),
      Section({
        text: `*Last Contact:*\n${lastContact}`,
      }),
      Divider(),
      Actions().elements(
        Button({
          text: 'Update Notes',
          actionId: 'update_notes',
          value: id,
        }),
      ),
    ).buildToObject();
};

module.exports = viewOpportunity;
