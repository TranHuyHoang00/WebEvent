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
    onClickPage = () => {
        this.props.history.push('/dashboard')
    }
    render() {
        return (
            <div className="relative overflow-hidden">
                <div className="relative grid h-screen place-content-center space-y-6 bg-neutral-950 p-[20px]">
                    <p className="text-center text-[40px] font-black text-neutral-50 hover:scale-105 duration-500 ease-in-out">
                        Page not found.
                    </p>
                    <p className="text-center text-neutral-400 hover:scale-105 duration-500 ease-in-out">
                        Please return to the home page.📺
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <div onClick={() => this.onClickPage()}
                            className="px-5 py-2.5 relative rounded-[10px] group overflow-hidden  bg-white text-black 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                            <div className="relative text-center group-hover:text-white font-[600]">
                                HOME
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default withRouter(not_found);
