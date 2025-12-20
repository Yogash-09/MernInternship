const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollno: {
    type: Number,
    unique: true,
    required: true        
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,      
    trim: true         
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
