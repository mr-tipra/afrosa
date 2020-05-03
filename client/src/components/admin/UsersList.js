import React, {useState, useEffect,  Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getAllUsers, getAllStudents, getAllAlumni} from "../../actions/admin";

import Spinner from "../layout/Spinner";
import ProfileItemAdmin from './ProfileItemAdmin';

const UsersList = ({admin, getAllUsers, getAllStudents, getAllAlumni,user}) => {


    const [query, setQuery] = useState({
    });

    const onChange = e => {
        if(e.target.name === "college_verified" && e.target.checked==false){
            setQuery({...query, [e.target.name]: undefined});
            return;
        }
        setQuery({...query, [e.target.name]: !e.target.checked});
    }

    useEffect(() => {
        if(user.role === 'student_relations')
            getAllStudents(query);
        else if(user.role === 'alumni_relations')
            getAllAlumni(query);
        else
            getAllUsers(query);
    },[query]);

    return (
        <section className="container">

            <div className="form">
                <input type="checkbox" 
                name="college_verified"
                defaultChecked={false}
                onChange = {onChange}/>
                <label className="p-1" htmlFor="college_verified">Only college unverified</label>
            </div>
            <div className="profiles-admin">
                {admin && admin.loading ? <Spinner /> :
                    admin.users.map(user => <ProfileItemAdmin user={user} key={user._id}/>)
                }
            </div>

        </section>
    )
}

UsersList.propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user:state.auth.user,
    admin: state.admin
});

export default connect(mapStateToProps, {getAllUsers, getAllStudents, getAllAlumni})(UsersList);
