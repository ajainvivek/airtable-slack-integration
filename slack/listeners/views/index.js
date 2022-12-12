const { updateNotesViewCallback } = require('./update-notes');

module.exports.register = (app) => {
  app.view('update_notes_view', updateNotesViewCallback);
};
