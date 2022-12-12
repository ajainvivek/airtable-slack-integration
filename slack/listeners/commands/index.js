const { viewOpportunityCommand } = require('./view-opportunity');

module.exports.register = (app) => {
  app.command('/crm-view-opportunity', viewOpportunityCommand);
};
