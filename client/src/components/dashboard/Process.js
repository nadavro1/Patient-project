import React,{Fragment, useEffect, useState} from 'react'
import {Redirect} from  'react-router-dom';
import  {connect} from 'react-redux';
import { setAlert } from '../../actions/alert';
import { get_inputs, submitData } from '../../actions/inputes';
import Spinner from '../layout/spinner';

const Process=({setAlert,get_inputs,isAuthenticated,inputs:{gender,language,loading},submitData})=> {
    useEffect(() => {
        get_inputs();        
    }, [get_inputs])
    //set age
    const [formData,setFormData]= useState({
        ageData:''
    });
    const {ageData} = formData;
    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    //set anaylsts
    const [analysisData, setText] = useState('');
    //drop down list for gender
    const genderArr = []
    gender.forEach(gender=>{
        genderArr.push(gender.option)
    })
    const [genderdropdown, setgenderdropdown]= useState('')
    //drop down list for language
    const languageArr = []
    language.forEach(language=>{
        languageArr.push(language.option)
    })
    const [languagedropdown, setlanguagedropdown]= useState('')
    //on submiting the form
    const onSubmit= async e=>{
        e.preventDefault();
        if (languagedropdown==='') {
            setAlert("Please select language","danger",3000);
        }
        else if (genderdropdown==='') {
            setAlert("Please select gender","danger",3000);
        }
        else if (ageData==='') {
            setAlert("Please enter age","danger",3000);
        }
        else if (analysisData==='') {
            setAlert("Please enter analsysis","danger",3000);
        }
        else{
            submitData(genderdropdown, ageData, languagedropdown,analysisData);
        } 
    }
    
    if(!isAuthenticated){
        return  <Redirect to="/login"/>
    }
    return loading? <Spinner/>:
        <Fragment>
            <h1 className="large text-primary">Patient details</h1>
            <p className="lead"><i className="fas fa-user"></i> Please fill the details</p>
            <form className="form" onSubmit={e=> onSubmit(e)}>
                <div className="form-group">
                    <select placeholder="Select gender" name="genderdropdown" onChange={e => setgenderdropdown(e.target.value)}>
                        <option value=''>Select gender</option>
                       { gender.map(gender=>
                            <option key={gender.id} value={gender.option}>{gender.option}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <input type="number" placeholder="Age" name="ageData" 
                    value={ageData} onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <select placeholder="Select language" name="languagedropdown" onChange={e => setlanguagedropdown(e.target.value)}>
                        <option value=''>Select language</option>
                       { language.map(language=>
                            <option key={language.id} value={language.option}>{language.option}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Write an analysis"
                    value = {analysisData}
                    onChange={(e)=>{
                        setText(e.target.value);
                    }}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
        </Fragment>
    
}

const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated,
    inputs:state.inputs,
    state:state
})

export default connect(mapStateToProps,{setAlert,get_inputs,submitData})(Process);
