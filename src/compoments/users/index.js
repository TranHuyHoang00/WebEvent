import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Header from './layouts/header';
import Footer from './layouts/footer';
// import Home from './pages/home';
import Calendar from './pages/calendar/calendar';
import Schedule from './pages/schedule/schedule';
import Schedule_detail from './pages/schedule/schedule_detail';
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
            <div className='h-screen w-screen flex flex-col bg-black '>
                <Header />
                <Switch>
                    {/* <Route exact path="/home"><Home /></Route> */}
                    <Route exact path="/home/calendar"><Calendar /></Route>
                    <Route exact path="/home/schedule"><Schedule /></Route>
                    <Route exact path="/home/schedule/:id"><Schedule_detail /></Route>
                </Switch>
                <Footer />
            </div>
        );
    }

}
export default withRouter(index);
