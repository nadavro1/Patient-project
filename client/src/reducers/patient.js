const { SET_PATIENT_DATA } = require("../actions/types");

const initialState={
    doctor:'',
    gender:'',
    language:'',
    age:null,
    analysis:'',
    error:{},
    loading:true
}

export default function(state= initialState, action){
    const {type,payload}= action
    switch (type) {
        case SET_PATIENT_DATA:
            return{
                ...state,
                gender:payload.gender,
                language:payload.language,
                age:payload.age,
                analysis:payload.analysis,
                doctor:payload.doctor.name,
                loading:false
            }
        default:
            return state;
    }
}