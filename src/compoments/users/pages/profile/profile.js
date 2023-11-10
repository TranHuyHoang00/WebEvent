import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <div className='bg-black flex-grow flex items-center justify-center font-serif'>
                ok
            </div>
        );
    }

}
export default withRouter(profile);
