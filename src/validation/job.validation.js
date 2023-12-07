const Joi = require("joi");
const { enum_jobStatus } = require("../config/enums");


const createJobValidation = Joi.object({
  companyName: Joi.string().required().min(3).max(50).required({
    "any.required": "Please enter company name",
    "any.min": "company name must be between 3 and 50 characters",
    "any.mix": "company name must be between 3 and 50 characters",
  }),
  field: Joi.string().required().min(3).max(50).required({
    "any.required": "Please enter field name",
    "any.min": "field must be between 3 and 50 characters",
    "any.mix": "field must be between 3 and 50 characters",
  }),
  location: Joi.string().required().min(3).max(50).required({
    "any.required": "Please enter location",
    "any.min": "location must be between 3 and 50 characters",
    "any.mix": "location must be between 3 and 50 characters",
  }),
  aboutCompany: Joi.string().required().min(10).max(500).required({
    "any.required": "Please any thing about company ",
    "any.min": "About company must be between 3 and 50 characters",
    "any.mix": "About company must be between 3 and 50 characters",
  }),

  position: Joi.string().required().min(3).max(50).required({
    "any.required": "Please enter the position",
    "any.min": "position must be between 3 and 50 characters",
    "any.mix": "position must be between 3 and 50 characters",
  }),
  companyLogo: Joi.string(),


  jobType: Joi.string()
    .valid(...enum_jobStatus)
    .required()
    .trim()
    .messages({
      "any.required": "Please provide a job type for ",
      "any.only": `Must be one of the following values: ${enum_jobStatus}`,
    }),
  jobDescription: Joi.string().required().min(3).max(50).required({
    "any.required": "Please enter job description",
    "any.min": "Job description must be between 3 and 50 characters",
    "any.mix": "Job description must be between 3 and 50 characters",
  }),
  jobRequirements: Joi.string().required().min(3).max(50).required({
    "any.required": "Please enter job description",
    "any.min": "Job requirements must be between 3 and 50 characters",
    "any.mix": "Job requirements must be between 3 and 50 characters",
  }),
  link: Joi.string().required().min(3).max(50).required({
    "any.required": "Please enter link",
    "any.min": "link must be between 3 and 50 characters",
    "any.mix": "link must be between 3 and 50 characters",
  }),
  currency: Joi.string().required().min(3).max(20).required({
    "any.required": "Please enter currency",
    "any.min": "currency must be between 3 and 20 characters",
    "any.mix": "currency must be between 3 and 20 characters",
  }),
  skills: Joi.string().required().min(3).max(50).required({
    "any.required": "Please enter skills",
    "any.min": "skills must be between 3 and 50 characters",
    "any.mix": "skills must be between 3 and 50 characters",
  }),
  salary: Joi.array()
    .items(
      Joi.object({
        from: Joi.number().required().min(100).max(200000).messages({
          "any.required": 'Please enter the "from" salary',
          "number.min": "From salary must be between 100 and 200000",
          "number.max": "From salary must be between 100 and 200000",
        }),
        to: Joi.number().required().min(100).max(200000).messages({
          "any.required": 'Please enter the "to" salary',
          "number.min": "To salary must be between 100 and 200000",
          "number.max": "To salary must be between 100 and 200000",
        }),
      })
    )
    .required()
    .messages({
      "any.required": "Please enter at least one salary range",
    }),
  // date: Joi.string().min(3).max(50).message({
  //   "any.min": "Job name must be between 3 and 50 characters",
  //   "any.mix": "Job name must be between 3 and 50 characters",
  // }),
  isAvailable: Joi.boolean().default(false)
});

const updateJobValidation = Joi.object({
  companyName: Joi.string().min(3).max(50).message({
    "any.min": "company name must be between 3 and 50 characters",
    "any.mix": "company name must be between 3 and 50 characters",
  }),
  field: Joi.string().min(3).max(50).message({
    "any.min": "field must be between 3 and 50 characters",
    "any.mix": "field must be between 3 and 50 characters",
  }),
  location: Joi.string().min(3).max(50).message({
    "any.min": "location must be between 3 and 50 characters",
    "any.mix": "location must be between 3 and 50 characters",
  }),
  aboutCompany: Joi.string().min(10).max(500).message({
    "any.min": "About company must be between 3 and 50 characters",
    "any.mix": "About company must be between 3 and 50 characters",
  }),

  position: Joi.string().min(3).max(50).message({
    "any.min": "position must be between 3 and 50 characters",
    "any.mix": "position must be between 3 and 50 characters",
  }),
  companyLogo: Joi.string(),
  

  jobType: Joi.string()
    .valid(...enum_jobStatus)
    
    .trim()
    .messages({
       "any.only": `Must be one of the following values: ${enum_jobStatus}`,
    }),
  jobDescription: Joi.string().min(3).max(50).message({
     "any.min": "jobDescription must be between 3 and 50 characters",
    "any.mix": "jobDescription must be between 3 and 50 characters",
  }),
  jobRequirements: Joi.string().min(3).max(50).message({
     "any.min": "Job requirements must be between 3 and 50 characters",
    "any.mix": "Job requirements must be between 3 and 50 characters",
  }),
  link: Joi.string().min(3).max(50).message({
     "any.min": "link must be between 3 and 50 characters",
    "any.mix": "link must be between 3 and 50 characters",
  }),
  salary: Joi.array()
    .items(
      Joi.object({
        from: Joi.number().min(100).max(200000).messages({
           "number.min": "From salary must be between 100 and 200000",
          "number.max": "From salary must be between 100 and 200000",
        }),
        to: Joi.number().min(100).max(200000).messages({
           "number.min": "To salary must be between 100 and 200000",
          "number.max": "To salary must be between 100 and 200000",
        }),
      })
    )
    
    .messages({
     }),
  // date: Joi.string().min(3).max(50).message({
  //    "any.min": "Job name must be between 3 and 50 characters",
  //   "any.mix": "Job name must be between 3 and 50 characters",
  // }),
  // isAvailable: Joi.string().min(3).max(50).message({
  //    "any.min": "Job name must be between 3 and 50 characters",
  //   "any.mix": "Job name must be between 3 and 50 characters",
  // }),
});

module.exports = {createJobValidation,updateJobValidation};
