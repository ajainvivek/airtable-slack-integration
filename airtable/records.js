const lodash = require('lodash');
const base = require('./base');

// View existing deal
const viewOpportunity = async (opportunityId) => {
  const opportunity = await base.table(process.env.AIRTABLE_TABLE_NAME).find(opportunityId);
  // convert all fields to camelCase
  const fields = lodash.mapKeys(opportunity.fields, (value, key) => lodash.camelCase(key));
  return fields;
};

// Get sales rep
const getSalesRep = async (salesRepId) => {
  const salesRep = await base.table(process.env.AIRTABLE_TABLE_NAME).find(salesRepId);
  return salesRep.fields;
};

// Update notes on existing deal
const updateOpportunityNotes = async (opportunityId, notes) => {
  const opportunity = await base.table(process.env.AIRTABLE_TABLE_NAME).update(opportunityId, {
    Notes: notes,
  });
  return opportunity;
};

module.exports = { viewOpportunity, updateOpportunityNotes, getSalesRep };
