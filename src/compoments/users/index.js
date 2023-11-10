import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Header from './layouts/header';
import Footer from './layouts/footer';
// import Home from './pages/home';
import Calendar from './pages/calendar/calendar';
import Schedule from './pages/schedule/schedule';
import Schedule_detail from './pages/schedule/schedule_detail';
import Profile from './pages/profile/profile';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
    }
    handleLogout_Index_C = () => {
        this.props.handleLogout_Index();
    }
    render() {
        return (
            <div className='h-screen w-screen flex flex-col bg-black '>
                <Header handleLogout_Index_C={this.handleLogout_Index_C} />
                <Switch>
                    <Route exact path="/home"><Calendar /></Route>
                    <Route exact path="/home/schedule/:date"><Schedule /></Route>
                    <Route exact path="/home/schedule/detail/:id"><Schedule_detail /></Route>
                    <Route exact path="/home/profile"><Profile /></Route>
                </Switch>
                <Footer />
            </div>
        );
    }

}
export default withRouter(index);
