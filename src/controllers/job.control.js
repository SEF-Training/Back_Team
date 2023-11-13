const Job = require('../models/job.model')
const asyncHandler = require('express-async-handler')

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
    res.status(200).json(await Job.find())
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