import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => { 
        getCurrentProfile();
    }, []);
    
    return profile && loading === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead"><i className="fas fa-user"></i> Welcome { user && user.name } </p>
        { profile !== null ? (
        <Fragment> 
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
        </Fragment>) : 
        (<Fragment>
            <p>You have not yet setup a profile, please add some information.</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
            </Link> 
        </Fragment> )}
        </Fragment> ;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);