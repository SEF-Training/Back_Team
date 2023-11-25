const mongoose = require('mongoose');
const { deleteUploadedFile } = require('../utils/deleteUploadedFile');
const { Schema } = mongoose;

const certificateSchema = new Schema(
	{
		certificate_file: {
			type: String,
			trim: true,
			// required: [true, 'please provide certificate file'],
		},

		acquired_date: {
			type: Date,
			required: [true, 'please select the acquired date'],
			default: Date.now(),
		},
		course: {
			type: mongoose.Types.ObjectId,
			required: [true, 'Please provide a course'],
			ref: 'Course',
		},
		student: {
			type: mongoose.Types.ObjectId,
			required: [true, 'Please provide a student'],
			ref: 'User',
		},
		// upload_date: {
		// 	type: Date,
		// 	default: Date.now(),
		// },
	},
	{ timestamps: true }
);

certificateSchema.virtual('courses', {
	ref: 'Course',
	localField: 'Course',
	foreignField: '_id',
});

certificateSchema.virtual('students', {
	ref: 'User',
	localField: 'student',
	foreignField: '_id',
});

certificateSchema.pre('findOneAndUpdate', deleteUploadedFile);
certificateSchema.pre('findOneAndDelete', deleteUploadedFile);

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;