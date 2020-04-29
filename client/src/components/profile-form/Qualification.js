import React,{Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'


const Qualification = props => {
    const [fields, setFields] = useState({
       qualification:"",
       institute:"",
       from :"",
       to:'',
       desc:""
    });

    const [isFilled, setIsFilled] = useState(false);

    const {
        qualification,
        institute,
        from,
        to,
        desc
    } = fields;
    
    const onChange = e => {
        setFields({...fields, [e.target.name]:e.target.value});
        if(fields.qualification !== "" && fields.institute !== "" && fields.from !== "")
        setIsFilled(true);
        else
        setIsFilled(false);
    }
    
    useEffect(()=>{
        props.onChange({isFilled, fields});
    }, [ isFilled, fields]);
    
    return (
        <Fragment>
            <div className="form-group">
                <input type="text" name="qualification" placeholder="*Qualification" value={qualification} 
                onChange = {e => onChange(e)}
                required/>
            </div>
            <div className="form-group">
                <input type="text" name="institute" placeholder="*College/School" value={institute}
                 onChange = {e => onChange(e)} 
                required/>
            </div>
            <div className="form-group">
                <input type="number" name="from" placeholder="*Beginning Year" value={from} 
                 onChange = {e => onChange(e)}
                required/>
            </div>
            <div className="form-group">
                <input type="number" name="to" placeholder="Completing Year" value={to}
                 onChange = {e => onChange(e)}/>
            </div>
            <div className="form-group">
                <textarea type="text" name="desc" placeholder="Description" value={desc}
                onChange={e => onChange(e)}/>
            </div>            
        </Fragment>
    )
}

Qualification.propTypes = {
    onChange: PropTypes.func.isRequired

}

export default Qualification
