const express= require('express');
const route = express.Router();
const {check, validationResult}=require('express-validator');
const Patient=require('../../models/Patient')
const auth = require('../../middleware/auth');
const User = require('../../models/User');
var fs = require('fs');
//get the patient data

//insert the patient data
//check with the middleware that the user is authenticated and validate data
route.post('/',[auth,
[
    check('ageData','Please pick up age from 5 to 70').isFloat({min:5,max:70})
]], async (req,res)=>{
    try {
        const errors= validationResult(req);
        if(!errors.isEmpty()){//express-validator function to check if empty
            return res.status(400).json({errors:errors.array()})
        }
        const user= await User.findById(req.user.id).select('-password');//to get the user details without password
        const newPatient= new Patient({
            doctor:user.id,
            gender: req.body.genderdropdown,
            age:req.body.ageData,
            language:req.body.languagedropdown,
            analysis:req.body.analysisData
        })//get the new patient data and create object
        const patient= await newPatient.save();
        return res.send(patient);
    } catch (error) {
        console.log(error.message)
        return res.status(500).send('Server error')
    }
    
})

//get the patient data by doctor id
//first check that the doctor is connected by the middleware
route.get('/',auth, async (req,res)=>{
    try {
         //get the doctor details
        const patientData= await Patient.find({doctor:req.user.id}).populate('doctor',['name']) //get the patient data
        if(!patientData.length){ //if patient details are not found
            return res.status(400).send({msg:'Patient details are not found!'})
        }
        return res.json(patientData);
    } catch (error) {
        console.log(error.message)
        return res.status(500).send('Server error')
    }
})

route.get('/inputs',async (req,res)=>{ //get the inputs data 
    try {
        fs.readFile('models/inputs.json', 'utf8', function (err, data) {
            if (err) throw err;
            data = JSON.parse(data);
            res.json(data);
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).send('Server error')
    }
})


module.exports = route;