const { opportunityNotesActionCallback } = require('./opportunity-notes');

module.exports.register = (app) => {
  app.action('update_notes', opportunityNotesActionCallback);
};
