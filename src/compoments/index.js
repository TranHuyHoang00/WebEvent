import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { get_local_account } from '../auths/local_storage';
import Users from './users/index';
import Dashboards from './dashboards/index';
import Login_user from './users/pages/login/login';

import Not_logged from './pages_error/not_logged';
import Not_found from './pages_error/not_found';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in_user: false,
        }
    }
    async componentDidMount() {
        let data_user = get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
        if (data_user) {
            this.setState({ logged_in_user: true })
        }
    }
    handleLogin_Index = () => {
        this.setState({ logged_in_user: true });
    }
    handleLogout_Index = () => {
        this.setState({ logged_in_user: false });
    }
    render() {
        let logged_in_user = this.state.logged_in_user;
        return (
            <div>
                <Switch>
                    {logged_in_user == false ?
                        <>
                            <Route exact path="/login_user">
                                <Login_user handleLogin_Index={this.handleLogin_Index} />
                            </Route>
                            <Route path="/home"><Not_logged /></Route>
                            <Redirect from="/" exact to="/home" />
                        </>
                        :
                        <>
                            <Route path="/home">
                                <Users handleLogout_Index={this.handleLogout_Index} />
                            </Route>
                            <Redirect exact from="/" to="/home" />
                            {/* <Route><Not_found /></Route> */}
                        </>

                    }
                    <Route path="/dashboard"><Dashboards /></Route>
                </Switch>
            </div>
        );
    }

}
export default withRouter(index);
