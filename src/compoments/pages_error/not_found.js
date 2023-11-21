import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class not_found extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <div className="relative overflow-hidden">
                <div className="relative grid h-screen place-content-center space-y-6 bg-neutral-950 p-[20px]">
                    <p className="text-center text-[40px] font-black text-neutral-50 hover:scale-105 duration-500 ease-in-out">
                        Page not found.
                    </p>
                    <p className="text-center text-neutral-400 hover:scale-105 duration-500 ease-in-out">
                        Please return 📺
                    </p>
                </div>
            </div>
        );
    }

}
export default withRouter(not_found);
