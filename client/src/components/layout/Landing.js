import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const Landing = ({isAuth}) => {
    if(isAuth)  return (<Redirect to='/process'/>)

    return (
        <section className="landing">
        <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Patient system</h1>
         
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
      </section>
    )
}
const mapStateToProps=state=>({
  isAuth:state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing);