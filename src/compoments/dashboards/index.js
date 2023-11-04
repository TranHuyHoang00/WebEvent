import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }

    render() {
        return (
            <>
                <div>DashBoard</div>
            </>
        );
    }

}
export default withRouter(index);
