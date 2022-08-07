const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// API key Model Definition
const studentSchema = new Schema({
    name: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    email: { type: String, required: true }
});

// Export Module/Schema
module.exports = mongoose.model('students', studentSchema);