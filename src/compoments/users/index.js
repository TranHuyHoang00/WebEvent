import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { get_local_account } from '../../auths/local_storage';
import Header from './layouts/header';
import Footer from './layouts/footer';
import Calendar from './pages/calendar/calendar';
import Schedule from './pages/schedule/schedule';
import Schedule_detail from './pages/schedule/schedule_detail';
import Profile from './pages/profile/profile';

import Login_user from '../users/pages/login/login';
import Not_logged from './pages_error/not_logged';
import Not_found from './pages_error/not_found';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in_user: false,
            url: '/home/',

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
        let url = this.state.url;
        let logged_in_user = this.state.logged_in_user;
        return (
            <div className='h-screen w-screen flex flex-col bg-black '>

                {logged_in_user == true ?
                    <>
                        <Header handleLogout_Index={this.handleLogout_Index} />
                        <Switch>
                            <Route exact path={`${url}`}><Calendar /></Route>
                            <Route exact path={`${url}schedule/:type/:date`}><Schedule /></Route>
                            <Route exact path={`${url}schedule/:type/:date/:id`}><Schedule_detail /></Route>
                            <Route exact path={`${url}/profile`}><Profile /></Route>
                            <Route ><Not_found /></Route>
                        </Switch>
                        <Footer />
                    </>
                    :
                    <>
                        <Switch>
                            <Route exact path={`${url}`}><Not_logged /></Route>
                            <Route exact path={`${url}schedule/:type/:date`}><Not_logged /></Route>
                            <Route exact path={`${url}schedule/:type/:date/:id`}><Not_logged /></Route>
                            <Route exact path={`${url}profile`}><Not_logged /></Route>
                            <Route exact path={`${url}login`}>
                                <Login_user handleLogin_Index={this.handleLogin_Index} />
                            </Route>
                            <Route ><Not_found /></Route>
                        </Switch>
                    </>
                }
            </div>
        );
    }

}
export default withRouter(index);
