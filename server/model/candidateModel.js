const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required:true,
 
  },

  dateOfBirth: {
    type:String,
    required:true,
  },
  
  workExperience: String,
  resumeTitle: String,
  currentLocation: String,
  postalAddress: String,
  currentEmployer: String,
  currentDesignation: String,
  
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
