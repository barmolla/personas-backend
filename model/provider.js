const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ProviderSchema = Schema({
    name: String,
    description: String
})

module.exports = mongoose.model('Provider', ProviderSchema);