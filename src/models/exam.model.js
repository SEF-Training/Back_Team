const mongoose = require('mongoose');
const { Schema } = mongoose;
const { deleteUploadedFile } = require('../utils/deleteUploadedFile');
const { enum_examsStatus } = require('../config/enums');

const examSchema = new Schema({
	course: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Course',
	},
	link: {
		type: String,
		required: [true, 'please provide the exam link'],
		trim: true,
	},

	date: {
		type: Date,
		required: [true, 'please provide the exam date'],
	},
	duration: {
		type: String,
		required: [true, 'please provide the exam duration time'],
	},
	photo: String, // image

	status: { type: String, enum: enum_examsStatus },

	Instructor: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

examSchema.virtual('courses', {
	ref: 'Course',
	localField: 'course',
	foreignField: 'exams',
});

examSchema.pre('findOneAndUpdate', deleteUploadedFile);
examSchema.pre('findOneAndDelete', deleteUploadedFile);

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
