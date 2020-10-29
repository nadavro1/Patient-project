import React from 'react'
import {Route,Switch} from 'react-router-dom';
import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import PrivateRouting from './PrivateRouting';
import Process from '../dashboard/Process';
import PatientData from '../dashboard/PatientData';
const Routes = props => {
    return (
        <section className='container'>
        <Alert/>
          <Switch>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <PrivateRouting exact  path='/process' component={Process}/>
            <PrivateRouting exact  path='/patient' component={PatientData}/>
          </Switch>
        </section>

    )
}

export default Routes
