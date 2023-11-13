const Joi = require("joi");
const { enum_jobStatus } = require("../config/enums");

const jobValidation = Joi.object({
  companyName: Joi.string().required().min(3).max(20).required({
    "any.required": "Please enter company name",
    "any.min": "Job name must be between 3 and 50 characters",
    "any.mix": "Job name must be between 3 and 50 characters",
  }),
  field: Joi.string().required().min(3).max(20).required({
    "any.required": "Please enter field name",
    "any.min": "Job name must be between 3 and 50 characters",
    "any.mix": "Job name must be between 3 and 50 characters",
  }),
  location: Joi.string().required().min(3).max(50).required({
    "any.required": "Please enter location",
    "any.min": "Job name must be between 3 and 50 characters",
    "any.mix": "Job name must be between 3 and 50 characters",
  }),
  aboutCompany: Joi.string().required().min(10).max(500).required({
    "any.required": "Please any thing about company ",
    "any.min": "Job name must be between 3 and 50 characters",
    "any.mix": "Job name must be between 3 and 50 characters",
  }),

  position: Joi.string().required().min(3).max(20).required({
    "any.required": "Please enter the position",
    "any.min": "Job name must be between 3 and 50 characters",
    "any.mix": "Job name must be between 3 and 50 characters",
  }),
  companyLogo: Joi.string().required().min(3).max(20).required({
    "any.required": "Please enter company name",
    "any.min": "Job name must be between 3 and 50 characters",
    "any.mix": "Job name must be between 3 and 50 characters",
  }),

  jobType: Joi.string()
    .valid(...enum_jobStatus)
    .required()
    .trim()
    .messages({
      "any.required": "Please provide a status for this Job",
      "any.only": `Must be one of the following values: ${enum_jobStatus}`,
    }),
  jobDescription: Joi.string().required().min(3).max(20).required({
    "any.required": "Please enter job description",
    "any.min": "Job name must be between 3 and 50 characters",
    "any.mix": "Job name must be between 3 and 50 characters",
  }),
  jobRequirements: Joi.string().required().min(3).max(20).required({
    "any.required": "Please enter job description",
    "any.min": "Job name must be between 3 and 50 characters",
    "any.mix": "Job name must be between 3 and 50 characters",
  }),
  link: Joi.string().required().min(3).max(20).required({
    "any.required": "Please enter link",
    "any.min": "Job name must be between 3 and 50 characters",
    "any.mix": "Job name must be between 3 and 50 characters",
  }),
  salary: Joi.array()
    .items(
      Joi.object({
        from: Joi.number().required().min(3).max(20).messages({
          "any.required": 'Please enter the "from" salary',
          "number.min": "From salary must be between 3 and 20",
          "number.max": "From salary must be between 3 and 20",
        }),
        to: Joi.number().required().min(3).max(20).messages({
          "any.required": 'Please enter the "to" salary',
          "number.min": "To salary must be between 3 and 20",
          "number.max": "To salary must be between 3 and 20",
        }),
      })
    )
    .required()
    .messages({
      "any.required": "Please enter at least one salary range",
    }),
  date: Joi.string().required().min(3).max(20).required({
    "any.required": "Please enter the date",
    "any.min": "Job name must be between 3 and 50 characters",
    "any.mix": "Job name must be between 3 and 50 characters",
  }),
  isAvailable: Joi.string().required().min(3).max(20).required({
    "any.required": "Please enter a state",
    "any.min": "Job name must be between 3 and 50 characters",
    "any.mix": "Job name must be between 3 and 50 characters",
  }),
});

module.exports = jobValidation;
