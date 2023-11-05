const Joi = require('joi');
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const userIdRegex = /^[0-9]{10}$/
module.exports = {
    createByAdminSchema: Joi.object({
        lastName: Joi.string().required().messages({
            'any.required': 'Last name is required.',
            'string.empty': 'Last name must not be empty.',
        }),
        firstName: Joi.string().required().messages({
            'any.required': 'First name is required.',
            'string.empty': 'First name must not be empty.',
        }),
        score: Joi.string().required().messages({
            'any.required': 'score is required.',
            'string.empty': 'score must not be empty.',
        }),
        accountStatus: Joi.string().valid('Active', 'Inactive').required().messages({
            'any.required': 'Account status is required.',
            'any.only': 'Account status must be either "Active" or "Inactive".'
        }),
        role: Joi.string().valid('Admin', 'Instructor', 'Student').required().messages({
            'any.required': 'Role is required.',
            'any.only': 'Invalid role. Allowed values are: Admin, Instructor, Student.'
        }),
        mobileNumber: Joi.number().integer().required().messages({
            'any.required': 'Mobile number is required.',
            'number.base': 'Mobile number must be a valid integer.',
        }),
        userId: Joi.string().pattern(userIdRegex).messages({
            'string.base': 'User ID must be a string.',
            'string.pattern': 'User ID must be a 10-digit number.'
        }),
        password: Joi.string().pattern(passwordRegex).required().messages({
            'any.required': 'Password is required.',
            'string.empty': 'Password must not be empty.',
            'string.pattern.base': 'Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.'
        })
    }),
    updateByAdminSchema: Joi.object({
        lastName: Joi.string().messages({
            'string.empty': 'Last name must not be empty.',
        }),
        firstName: Joi.string().messages({
            'string.empty': 'First name must not be empty.',
        }),
        score: Joi.string().messages({
            'string.empty': 'score must not be empty.',
        }),
        accountStatus: Joi.string().valid('Active', 'Inactive').messages({
            'any.only': 'Account status must be either "Active" or "Inactive".'
        }),
        role: Joi.string().valid('Admin', 'Editor', 'Instructor', 'Student').messages({
            'any.only': 'Invalid role. Allowed values are: Admin, Editor, Instructor, Student.'
        }),
        mobileNumber: Joi.number().integer().messages({
            'number.base': 'Mobile number must be a valid integer.',
        }),
        userId: Joi.string().pattern(userIdRegex).messages({
            'string.pattern': 'User ID must be a 10-digit number.'
        }),
        password: Joi.string().pattern(passwordRegex).messages({
            'string.pattern.base': 'Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.'
        })
    }),
    updateUserProfileSchema: Joi.object({
        city: Joi.string(),
        major: Joi.string(),
        about: Joi.string(),
        country: Joi.string(),
        university: Joi.string(),
        nationality: Joi.string(),
        age: Joi.number().integer().messages({
            'number.base': 'Age must be a valid integer.',
        }),
        graduationYear: Joi.number().integer().messages({
            'number.base': 'Graduation year must be a valid integer.',
        }),
        mobileNumber: Joi.number().integer().messages({
            'number.base': 'Mobile number must be a valid integer.',
        }),
    })
}