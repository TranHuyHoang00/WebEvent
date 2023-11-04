import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Header from './layouts/header';
import Footer from './layouts/footer';
import Home from './pages/home';
import Login from './pages/login';
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
            <div className='h-screen w-screen flex items-center justify-center bg-black'>
                <div className='h-full w-full'>
                    <Header />
                    <Switch>
                        <Route exact path="/home"><Home /></Route>
                        <Route path="/home/login"><Login /></Route>
                    </Switch>
                    <Footer />
                </div>
            </div>
        );
    }

}
export default withRouter(index);
