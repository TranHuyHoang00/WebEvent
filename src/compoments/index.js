import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Users from './users/index';
import Dashboards from './dashboards/index';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in_user: false,
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/home"><Users /></Route>
                    <Redirect from="/" exact to="/home" />

                    <Route path="/dashboard"><Dashboards /></Route>
                </Switch>
            </div>
        );
    }

}
export default withRouter(index);
