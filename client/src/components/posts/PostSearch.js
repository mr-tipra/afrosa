import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

const PostSearch = ({onDataChange}) => {
    
    const [searchData, setSearchData] = useState({
        tags:"",
        name:""
    });

    const onChange = e => {
         setSearchData({...searchData, [e.target.name]: e.target.value});        
    }

    useEffect(() => {
        onDataChange(searchData);
    }, [searchData])

    return (

        <form className="form-search" onSubmit ={e => e.preventDefault()}>

            <div className="form-group">
                <input value={searchData.tags || ''} onChange={onChange} type="text" name="tags"
                placeholder="Search by tags..."/>
            </div>

            <div className="form-group">
                <input value={searchData.name || ''} onChange={onChange} type="text" name="name"
                placeholder="Search by user name..."/>
            </div>
        </form>
    )
}

PostSearch.propTypes = {

}

export default PostSearch
