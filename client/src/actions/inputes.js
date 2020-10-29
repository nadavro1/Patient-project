import axios from 'axios';
import { setAlert } from './alert';
import { SET_INPUTS, SET_ALERT, SUBMIT_PATIENT_SUCCESS, SUBMIT_PATIENT_FAILED } from './types';

export const get_inputs= ()=>async dispatch =>{//getting the inputs data for the select
    try {
        //first we see if there is already data for the patient
        try {
            const checkData= await axios.get('/api/patients/');
            console.log(checkData.data)
            if(checkData.data.length){//if there is data
                document.location.href="patient"
            }
        } catch (error) {
            console.log(error)
        }
        const {data}= await axios.get('/api/patients/inputs')
        dispatch({
            type:SET_INPUTS,
            payload:data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:SET_ALERT,
            payload:error.message
        })
    }
}

export const submitData= (genderdropdown, ageData, languagedropdown,analysisData) => async dispatch => {//submit patient data
    ageData=parseInt(ageData);
    const newPatient={
        genderdropdown,
        ageData,
        languagedropdown,
        analysisData
    }
    const config= {
        header:{
            'Content-Type':'application/json'
        }
    }
try {
    const res=  await axios.post('/api/patients',newPatient,config);
    dispatch({
        type: SUBMIT_PATIENT_SUCCESS,
        payload: res.data
    });
    document.location.href="patient"
} catch (error) {
    const errors= error.response.data.errors
    if(errors){
        errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
    }
    dispatch({
        type:SUBMIT_PATIENT_FAILED,
    });
} 
};
