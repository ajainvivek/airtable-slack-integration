const lodash = require('lodash');
const axios = require('axios');
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

// list webhook payloads
const listWebhookPayloads = async (webhookId) => {
  const response = await axios.get(
    `https://api.airtable.com/v0/bases/${process.env.AIRTABLE_BASE_ID}/webhooks/${webhookId}/payloads`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    },
  );
  return response.data.payloads;
};

module.exports = { viewOpportunity, updateOpportunityNotes, getSalesRep, listWebhookPayloads };
