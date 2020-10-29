const { SET_INPUTS,SUBMIT_PATIENT_FAILED,SUBMIT_PATIENT_SUCCESS } = require("../actions/types");

const initialState={
    gender:[],
    language:[],
    loading:true,
    error:{}
}

export default function(state= initialState, action){
    const {type,payload}= action
    switch (type) {
        case SET_INPUTS:
            return{
                ...state,
                gender:payload.gender,
                language:payload.language,
                loading:false
            }
        case SUBMIT_PATIENT_SUCCESS:
            return{
                ...state,
                loading:false,
                // posts:[payload,...state.inputs]
            }
        case SUBMIT_PATIENT_FAILED:
            return{
                ...state,
                error:payload,
                loading:false
            }
        default:
            return state;
    }
}