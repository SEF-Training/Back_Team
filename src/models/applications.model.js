const mongoose = require('mongoose');
const { Schema } = mongoose;
const { deleteUploadedFile } = require('../utils/deleteUploadedFile');

const applicationSchema = new Schema({
	name: { type: String, required: true },
	major: { type: String },

	mobileNumber: { type: Number },
	email: { type: String, required: true },
	exp: { type: Number, required: true },
	job: [{ type: mongoose.Types.ObjectId, ref: 'Job' }],
	cv: { type: String, required: true },
});

applicationSchema.pre('findOneAndUpdate', deleteUploadedFile);
applicationSchema.pre('findOneAndDelete', deleteUploadedFile);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
