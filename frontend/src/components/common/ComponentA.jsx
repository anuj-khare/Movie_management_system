import React from 'react';
import withToolTip from './../hoc/withToolTip';

function ComponentA(props) {
    return (
        <div style= { {border:'1px solid black',margin : '20px'} }>
            <h1> This is heading in component A </h1>
            {props.showToolTip && <span> this is tooltip </span>}
        </div>
    );
}

export default withToolTip(ComponentA);