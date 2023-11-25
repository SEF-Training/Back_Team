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
			// min: 1,
			// max: 10,
			// >0
		},
		status: {
			type: String,
			enum: enum_coursesStatus,
			required: [true, 'please provide the course level'],
			trim: true,
			lowercase: true,
		},
		sessions: {
			type: Number,
			required: [true, 'please provide sessions number'],
		},
		language: {
			type: String,
			required: [true, 'please provide course language'],
			trim: true,
		},
		requirements: String,
		assessments: String,
		introduction: String,
		materials: String,
		image: {
			type: String,
			trim: true,
		},
		certificate: {
			type: String,
			required: [true, 'please provide certificate role'],
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
		isPublished: {
			type: Boolean,
			default: false,
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

courseSchema.virtual('instructor', {
	ref: 'User',
	localField: 'Instructor',
	foreignField: '_id',
});

// courseSchema.virtual('students', {
// 	ref: 'User',
// 	localField: 'enrolledStudents.student',
// 	foreignField: '_id',
// });

courseSchema.virtual('exam', {
	ref: 'Exam',
	localField: 'exams',
	foreignField: 'course',
});

courseSchema.pre('findOneAndUpdate', deleteUploadedFile);
courseSchema.pre('findOneAndDelete', deleteUploadedFile);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
