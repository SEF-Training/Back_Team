const Job = require('../models/job.model')
const asyncHandler = require('express-async-handler')
const {paginate}  =require('../utils/pagination')
exports.createJob = asyncHandler(async (req, res) => {
    const newJob = await Job.create(req.body);
    if (!newJob) {
        return res.status(500).send({
            success: false,
            message: 'Failed to create a new job'
        });
    }

    return res.status(200).send({
        success: true,
        message: 'New Job created successfully',
        data: newJob
    });
});

exports.getJob = asyncHandler(async(req,res)=>{

    const job = await Job.findById(req.params.id)
    if(!job){
        return   res.status(404).send({
            success: false ,
            message:'Job Not Found',
            data: job
        }) 
        }
   return res.status(200).send({
        success: true , 
        message:'Job found successfully',
        data: job
    })    
})

exports.getAllJobs = asyncHandler(async(req,res)=>{
    const {error , data , pagination} = await paginate(Job , req)
    if(error) return res.status(404).json({success: false, error})
     res.status(200).json({success: true, pagination  , data})
});

exports.deleteJob = asyncHandler (async(req, res)=>{

    console.log(req.params.id);
    const job = await Job.findByIdAndDelete(req.params.id)
    if(!job){
        return   res.status(404).send({
            success: false ,
            message:'Job Not Found',
            data: job
        }) 
       }
       return res.status(200).send({
        success: true ,
        message:'Job deleted successfully',
        data: job
    })

})

exports.updateJob  = asyncHandler (async(req,res)=>{
    const job = await Job.findByIdAndUpdate(req.params.id , req.body , {new : true})
    if(req.file) req.body.companyLogo = `/jobs/${req.file.filename}`
    
    if(!job){
       return res.status(404).send({
            success: false ,
            message:'Job Not Found',
            data: job
        })
        }
   return res.status(200).send({
        success: true ,
        message:'Job updated successfully',
        data: job
    })

}) 