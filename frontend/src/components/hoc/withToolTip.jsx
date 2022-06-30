import React from 'react';
import { Component } from './../common/withRouter';

//This is your higher order component

function withToolTip(Component) {
    return class withToolTip extends React.Component{
        state = {  showToolTip : false }

        mouseOver = () => {
            this.setState({showToolTip : true})
        }
        //2 methods
        mouseOut = () => {
            this.setState({showToolTip : false})
        }
        

        
        render(){
            return (
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                    <Component showToolTip={this.state.showToolTip}/>
                </div>
            )
            }
    }
}

export default withToolTip;