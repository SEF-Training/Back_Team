const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {enum_jobStatus} = require('../config/enums')
const jobSchema = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  field: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  aboutCompany: {
    type: String,
    required: true,
    trim: true,
  },

  position: {
    type: String,
    required: true,
    trim: true,
  },
  companyLogo: {
    type: String,
    trim: true,
  },
  
  jobType: {
    type: String,
    required: true,
    enum:enum_jobStatus,
    trim: true,
  },
  jobDescription: {
    type: String,
    required: true,
    trim: true,
  },
  jobRequirements: {
    type: String,
    required: true,
    trim: true,
  },
  link :{
    type:String,
    required:true,
    trim : true,
} ,
salary: [
  {
    from: {
      type: Number,
      required: true,
      trim: true,
    },
    to: {
      type: Number,
      required: true,
      trim: true,
    },
  },
],

  date: {
    type: Date,
    required: true,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    trim: true,
  },
});


const Job = mongoose.model('Job', jobSchema)
module.exports = Job;