import axios from 'axios';
const { SET_PATIENT_DATA,SET_ALERT } = require("./types");

export const get_patient_data=()=>async dispatch =>{//getting the patient data 
    try {
        const {data}= await axios.get('/api/patients/');
        dispatch({
            type:SET_PATIENT_DATA,
            payload:data[0]
        })
    } catch (error) {
        dispatch({
            type:SET_ALERT,
            payload:error.message
        })
    }
}
