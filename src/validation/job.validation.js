const Joi = require('joi')

const jobValidation = Joi.object({
    companyName:Joi.string()
    .required()
    .min(3)
    .max(20)
    .required({
        'any.required':'Please enter company name',
        'any.min': 'Course name must be between 3 and 50 characters',
		'any.mix': 'Course name must be between 3 and 50 characters',
    }),
      field: Joi.string()
      .required()
      .min(3)
      .max(20)
      .required({
          'any.required':'Please enter field name',
          'any.min': 'Course name must be between 3 and 50 characters',
          'any.mix': 'Course name must be between 3 and 50 characters',
      }) ,
      location:Joi.string()
      .required()
      .min(3)
      .max(50)
      .required({
          'any.required':'Please enter location',
          'any.min': 'Course name must be between 3 and 50 characters',
          'any.mix': 'Course name must be between 3 and 50 characters',
      }),
      aboutCompany:Joi.string()
      .required()
      .min(10)
      .max(500)
      .required({
          'any.required':'Please any thing about company ',
          'any.min': 'Course name must be between 3 and 50 characters',
          'any.mix': 'Course name must be between 3 and 50 characters',
      }),
    
      position:Joi.string()
      .required()
      .min(3)
      .max(20)
      .required({
          'any.required':'Please enter the position',
          'any.min': 'Course name must be between 3 and 50 characters',
          'any.mix': 'Course name must be between 3 and 50 characters',
      }),
      companyLogo: Joi.string()
      .required()
      .min(3)
      .max(20)
      .required({
          'any.required':'Please enter company name',
          'any.min': 'Course name must be between 3 and 50 characters',
          'any.mix': 'Course name must be between 3 and 50 characters',
      }),
      
      jobType:  Joi.string()
      .required()
      .min(3)
      .max(20)
      .required({
          'any.required':'Please enter job type',
          'any.min': 'Course name must be between 3 and 50 characters',
          'any.mix': 'Course name must be between 3 and 50 characters',
      }),
      jobDescription:  Joi.string()
      .required()
      .min(3)
      .max(20)
      .required({
          'any.required':'Please enter job description',
          'any.min': 'Course name must be between 3 and 50 characters',
          'any.mix': 'Course name must be between 3 and 50 characters',
      }),
      jobRequirements: Joi.string()
      .required()
      .min(3)
      .max(20)
      .required({
          'any.required':'Please enter job description',
          'any.min': 'Course name must be between 3 and 50 characters',
          'any.mix': 'Course name must be between 3 and 50 characters',
      }),
      link : Joi.string()
      .required()
      .min(3)
      .max(20)
      .required({
          'any.required':'Please enter link',
          'any.min': 'Course name must be between 3 and 50 characters',
          'any.mix': 'Course name must be between 3 and 50 characters',
      }),
    salary : Joi.number()
    .required()
    .min(3)
    .max(20)
    .required({
        'any.required':'Please enter the salary',
        'any.min': 'Course name must be between 3 and 50 characters',
        'any.mix': 'Course name must be between 3 and 50 characters',
    }),
      date:  Joi.string()
      .required()
      .min(3)
      .max(20)
      .required({
          'any.required':'Please enter the date',
          'any.min': 'Course name must be between 3 and 50 characters',
          'any.mix': 'Course name must be between 3 and 50 characters',
      }),
      isAvailable:  Joi.string()
      .required()
      .min(3)
      .max(20)
      .required({
          'any.required':'Please enter a state',
          'any.min': 'Course name must be between 3 and 50 characters',
          'any.mix': 'Course name must be between 3 and 50 characters',
      }),
})

module.exports = jobValidation