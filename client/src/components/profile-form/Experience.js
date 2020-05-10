import React,{Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Map from "./Map";


const Experience = props => {
    const [fields, setFields] = useState({
       title:"" ,
       addr:{},
       from:"",
       to:"",
       desc:""
    });

    const {
        title,
        from,
        addr,
        to,
        desc
    } = fields;
    
    useEffect(()=>{
        props.onChange(fields);
    }, [title, from, to, addr, desc]);
    
  
    const [mapAddr, setMapAddr] = useState({});

    useEffect(()=>{
        setFields({...fields, addr:{...mapAddr}});
    }, [mapAddr])

    const onChange = e => {
        setFields({...fields, [e.target.name]:e.target.value});
    }
    const handleMapInput = res => {
        setMapAddr(res);
    }

    return (
        <Fragment>
            <div className="form-group">
                <input type="text" name="title" placeholder="*Title (Internship, Job, Events and others activities)" value={title} 
                onChange = {e => onChange(e)}
                required/>
            </div>

            <div className="form-group">
                <input type="number" name="from" placeholder="*Joining Year" value={from} 
                 onChange = {e => onChange(e)}
                required/>
            </div>
            <div className="form-group">
                <input type="number" name="to" placeholder="Leaving Year" value={to}
                 onChange = {e => onChange(e)}/>
            </div>
            <div className="form-group">
                <textarea type="text" name="desc" placeholder="Description" value={desc}
                onChange={e => onChange(e)}/>
            </div>
            <Map onEnter={handleMapInput} />
            
        </Fragment>
    )
}

Experience.propTypes = {
    onChange: PropTypes.func.isRequired

}

export default Experience
