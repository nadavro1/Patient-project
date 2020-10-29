import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import inputs from './inputs';
import patient from './patient';

export default combineReducers({
    alert,
    auth,
    inputs,
    patient
});

