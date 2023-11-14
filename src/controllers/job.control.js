const Job = require('../models/job.model')
const asyncHandler = require('express-async-handler')

exports.createJob = asyncHandler(async (req , res)=>{
    const newJob = await Job.create(req.body);
    res.status(200).send({
        success : true ,
        message: 'New Job created successfully',
        data: newJob
    })

    
})

exports.getJob = asyncHandler(async(req,res)=>{

    const job = await Job.findById(req.params.id)
    if(!job){
        throw new Error ('Job not found')
    }
    res.status(200).send({
        success: true , 
        message:'Job found successfully',
        data: job
    })    
})

exports.getAllJobs = asyncHandler(async(req,res)=>{
    res.status(200).json(await Job.find())
});

exports.deleteJob = asyncHandler (async(req, res)=>{

    const job = await Job.findByIdAndDelete(req.para)

})

exports.updateJon  = asyncHandler (async(req,res)=>{
    const job = await Job.findByIdAndUpdate(req.params.id , req.body , {new : true})
    
    if(!job){
        throw new Error('Job not found')
    }
    res.status(200).send({
        success: true ,
        message:'Job updated successfully',
        data: job
    })

}) 


