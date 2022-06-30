import React from 'react';

const Input = ({label,name,value,error,type,onChange}) => {
    return (
        <div className="mb-3">
            <label htmlFor={name}>{label}</label>
            <input type={type} className="form-control" 
            id={name} 
            aria-describedby="emailHelp" 
            placeholder= {label}
            onChange={onChange}
            name={name}
            value= { value }
            />
            { error &&
            <div className="className alert alert-danger">
            {error}
            </div>
            }
        </div>
    );
};

Input.defaultProps = {
    type : 'text'
}

export default Input;