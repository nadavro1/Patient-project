import React,{useEffect,Fragment} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { get_patient_data } from '../../actions/patient'
import Spinner  from "../layout/spinner"

const PatientData=({isAuthenticated,patient:{gender,language,age,analysis,loading,doctor},get_patient_data})=>{
    useEffect(() => {
        get_patient_data()
    }, [get_patient_data])
    if(!isAuthenticated){
        return  <Redirect to="/login"/>
    }
    return loading ? <Spinner/> : 
    <Fragment>
           <h1 className='large text-primary'>Patient details</h1>
           <div className='profile bg-light'>
                <div>
                    <h2>Patient of {doctor}</h2>
                    <h3>Gender:</h3>
                    <p>{gender}</p>
                    <h3>Age:</h3>
                    <p>{age}</p>
                    <h3>Language:</h3>
                    <p>{language}</p>
                    <h3>Analysis:</h3>
                    <div className="post  p-1 my-1">
                        <p className="my-1">
                        {analysis}
                        </p>
                    </div>
                </div>
                
           </div>
        </Fragment>
    
}

const mapStateToProps= state=>({
    isAuthenticated: state.auth.isAuthenticated,
    patient:state.patient
})

export default connect(mapStateToProps,{get_patient_data})(PatientData)

