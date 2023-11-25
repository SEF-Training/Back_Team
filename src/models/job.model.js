const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {enum_jobStatus} = require('../config/enums');
const { deleteUploadedFile } = require("../utils/deleteUploadedFile");

const jobSchema = new Schema({
	companyName: {
		type: String,
		trim: true,
	},
	field: {
		type: String,
		trim: true,
	},
	location: {
		type: String,
		trim: true,
	},
	aboutCompany: {
		type: String,
		trim: true,
	},

	position: {
		type: String,
		trim: true,
	},
	companyLogo: {
		type: String,
		trim: true,
	},

	jobType: {
		type: String,
		enum: enum_jobStatus,
		trim: true,
	},
	jobDescription: {
		type: String,
		trim: true,
	},
	jobRequirements: {
		type: String,
		trim: true,
	},
	link: {
		type: String,
		required: true,
		trim: true,
	},
	salary: [
		{
			from: {
				type: Number,
				trim: true,
			},
			to: {
				type: Number,
				trim: true,
			},
		},
	],

	date: {
		type: Date,
		trim: true,
	},
	isAvailable: {
		type: Boolean,
		trim: true,
	},
	applications: [{ type: mongoose.Types.ObjectId, ref: 'Application' }],
});

jobSchema.virtual('application', {
	ref: 'Application',
	localField: 'applications',
	foreignField: 'job',
});


jobSchema.pre('findOneAndDelete' ,deleteUploadedFile )
jobSchema.pre('findOneAndUpdate' ,deleteUploadedFile )

const Job = mongoose.model('Job', jobSchema)
module.exports = Job;