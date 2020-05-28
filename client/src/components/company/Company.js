import React, {useEffect, useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import axios from "axios";
import Spinner from "../layout/Spinner";
import {useHistory} from "react-router-dom";

import CompanyMember from "./CompanyMember";
const Company = props => {

    const history = useHistory();

    const [comp, setComp] = useState(null);
    useEffect(() => {
        axios.get(`/api/companies/${props.match.params.id}`)
        .then(res => {
            
            if(res.data.success)
                setComp(res.data.company);
            else
                history("/dashboard");
            console.log(res.data.company);
        }).catch(err=> {
            console.log(err);
        });

    }, []);

    return <Fragment>
            {comp === null?
            <Spinner/>:
            <div className="company container">
                <div className="company-header p-1">
                    <h2 className="text-primary lar">{comp.members[0].experience.company_name || comp.name}</h2>
                </div>

                <div className="company-members">
                    { comp.members.map(m => <CompanyMember key={m._id} member={m}/>)
                        // <CompanyMember member={m}/>
                    
                    }
                </div>
            </div>

            }
        </Fragment>
}

Company.propTypes = {

}

export default Company
