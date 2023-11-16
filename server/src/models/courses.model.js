const mongoose = require('mongoose');
const { enum_coursesStatus } = require('../config/enums');
const { deleteUploadedFile } = require('../utils/deleteUploadedFile');
const { Schema } = mongoose;

const courseSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter a course name'],
		},
		level: {
			type: Number,
			required: [true, 'please provide the course level'],
			// enum: enum_coursesLevels,
			// >0
		},
		status: {
			type: String,
			enum: enum_coursesStatus,
			required: [true, 'please provide the course level'],
			trim: true,
		},
		sessions: {
			type: Number,
			required: [true, 'please provide sessions number'],
		},
		languages: [
			{
				type: String,
				required: true,
				trim: true,
			},
		],
		requirements: String,
		assessments: String,
		introduction: String,
		materials: [
			{
				type: String,
			},
		],
		image: {
			type: String,
			trim: true,
		},
		certificate: {
			type: Boolean,
			required: [true, 'please provide if certificated'],
			default: true,
		},
		duration: {
			type: String,
			required: true,
		},
		start_date: {
			type: Date,
			required: [true, 'please select the start date'],
			default: Date.now(),
		},
		publish_date: {
			type: Date,
			default: Date.now(),
		},
		Instructor: {
			type: mongoose.Types.ObjectId,
			required: [true, 'Please enter an Instructor'],
			ref: 'User',
		},
		// enrolledStudents: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
		enrolledStudents: [
			{
				student: { type: mongoose.Types.ObjectId, ref: 'User' },
				status: String,
				score: Number,
			},
		],
		exams: [{ type: mongoose.Types.ObjectId, ref: 'Exam' }],
	},
	{ timestamps: true }
);

courseSchema.virtual('Courses', {
	ref: 'Courses',
	localField: '_id',
	foreignField: 'Instructor',
});

courseSchema.virtual('students', {
	ref: 'User',
	localField: 'enrolledStudents',
	foreignField: '_id',
});

courseSchema.virtual('exam', {
	ref: 'Exam',
	localField: 'exams',
	foreignField: '_id',
});

courseSchema.pre('findOneAndUpdate', deleteUploadedFile);
courseSchema.pre('findOneAndUpdate', deleteUploadedFile);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
