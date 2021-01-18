const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const SuperiorSchema = Schema({
    name: String,
    surname: String
})

module.exports = mongoose.model('Superior', SuperiorSchema);