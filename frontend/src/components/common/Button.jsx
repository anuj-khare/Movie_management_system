import React from 'react';

function Button({label}) {
    return (
        <button type="submit" className="btn btn-primary">{label}</button>
    );
}

export default Button;