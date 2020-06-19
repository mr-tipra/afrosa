import React,{Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import {getAllProfiles, getMoreProfiles} from "../../actions/profile";


//infinte scroll
import InfiniteScroll from "react-infinite-scroll-component";

const Profiles = props => {

    const [search, setSearch] = useState({
        name:"",
        role:"",
        batch:"",
        branch:"",
    });

    const [page, setPage] = useState(0);
    const count = 5;
    const [prevSize, setPrevSize] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    
    
    const years = [];

    for(let i=1975; i<=parseInt(new Date().getFullYear()); i++)
        years.push(i);

   

    useEffect(() => {
        
        //make query
        const query = {};
        query.page = page;
        query.count = count;
        if(search.batch !== "")
            query.batch = search.batch;
        if(search.role !== "")
            query.user_role = search.role;
        if(search.branch !== "")
            query.branch = search.branch;
        if(search.name !== "")
            query.name = search.name;

        props.getAllProfiles(query);
    }, [search]);

    const onChange = e => {
        setHasMore(true);
        setPrevSize(0);
        setPage(0);

        setSearch({...search, [e.target.name]:e.target.value, page:0});
    };
    const fetchNextPage = () => {
        //make query
        const query = {};
        query.page = page+1;
        setPage(page+1);
        query.count = count;
        if(search.batch !== "")
            query.batch = search.batch;
        if(search.role !== "")
            query.user_role = search.role;
        if(search.branch !== "")
            query.branch = search.branch;
        if(search.name !== "")
            query.name = search.name;
        
        props.getMoreProfiles(query);
    }

    return (
        <section className="container">
            <form className="form-search" onSubmit = {e => e.preventDefault() }>
                <div className="form-group">
                    <input type="text" name="name" placeholder="Search User By Name..." 
                    value={search.name} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <span className="form-text">Batch Year:</span>
                    <select value={search.batch} name="batch" onChange={onChange}>
                    {years.map(y => <option value={y} key={y}>{y}</option>)}
                    <option value="">All</option>
                    </select>
                </div>
                <div className="form-group">
                    <span className="form-text">Branch:</span>
                    <select name="branch" value={search.branch} onChange={onChange}>
                            <option value="cse">CSE</option>
                            <option value="me">ME</option>
                            <option value="ee">EE</option>
                            <option value="ec">EC</option>
                            <option value="ce">CE</option>
                            <option value="che">CHE</option>
                            <option value="">All</option>
                    </select>
                </div>

                <div className="form-group">
                    <span className="form-text">Search For:</span>
                    <select name="role" onChange={onChange}>
                        <option value="">All</option>
                        <option value="student">Students</option>
                        <option value="alumnus">Alumni</option>
                    </select>
                </div>
            </form>
            {props.profile.loading?
            <Spinner/>
            :
            <Fragment>
                <h1 className="large text-primary">Users</h1>
                <p className="lead">Connect with Students/Alumnus</p>
                <div className="profiles">
                    <InfiniteScroll
                    dataLength={props.profile.profiles.length}
                    next={fetchNextPage}
                    hasMore={hasMore}
                    >
                    {props.profile.profiles.length > 0 ?
                    (
                        props.profile.profiles.map(prof => (
                            <ProfileItem key={prof._id} profile={prof} />
                        ))
                    )
                    :
                    <h4 className="text-primary">No profiles found</h4>
                    }
                    </InfiniteScroll>
                </div>
            </Fragment>
        }
        </section>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile:state.profile
});

export default connect(mapStateToProps, {getAllProfiles, getMoreProfiles})(Profiles);
