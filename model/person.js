const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PersonSchema = Schema({
    name: String,
    surname: String,
    role: String, 
    dependsOn: String,
    project: String,
    provider: String,
    admissionDate: Date,
    egressDate: Date,
    dateOfBirth: Date,
    dni: Number
});

module.exports = mongoose.model('Person', PersonSchema);