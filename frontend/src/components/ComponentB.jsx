import React from 'react';
import withToolTip from './hoc/withToolTip';

function ComponentB(props) {
    return (
        <div style={{border:'1px solid red',margin:'20 px'}}>
            <h1>This is Component B</h1>
            {props.showToolTip && <span>This is a tooltip</span>}
        </div>
    );
}
export default withToolTip(ComponentB); 