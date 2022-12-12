const Airtable = require('airtable');

// Airtable Base
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

module.exports = base;
