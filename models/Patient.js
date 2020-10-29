const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new mongoose.Schema({
    doctor:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    gender:{
        type: String,
        enum : ['Male','Female'],
        default: 'Male',
        required: true
    },
    age:{
        type: Number,
        min: 5,
        max: 70,
        default: 5,
        required: true
    },
    language:{
        type: String,
        enum : ['English','Hebrew','Spanish'],
        default: 'English',
        required: true
    },
    analysis:{
        type: String,
        required: true
    }
})

module.exports= Patient= mongoose.model('patient',PatientSchema);
