import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Dashboards from './dashboards/index';
import Page_Not_Found from './pages_error/not_found';
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
            <div>
                <Switch>
                    <Route path="/dashboard"><Dashboards /></Route>
                    <Redirect from="/" exact to="/dashboard" />
                    <Route ><Page_Not_Found /></Route>
                </Switch>
            </div>
        );
    }

}
export default withRouter(index);
