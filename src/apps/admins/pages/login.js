import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { set_data_local } from '@auths/local_storage';
import { Login } from '@services/login_services';
import { message, Spin } from 'antd';
import bg from '@assets/images/bg.jpg';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: '',
            is_loading: false,
            is_show_password: false,
        }
    }
    async componentDidMount() {
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    onchange_password = (event) => {
        this.setState({ password: (event.target.value).replace(/\s/g, '') })
    }
    onchange_username = (event) => {
        this.setState({ username: (event.target.value).replace(/\s/g, '') })
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    validation = (username, password) => {
        this.handle_loading(true);
        if (this.isCheckEmpty(username) === 0) {
            return { mess: "Username must not be left blank !", code: 1 };
        }
        if (this.isCheckEmpty(password) === 0) {
            return { mess: "Password must not be left blank !", code: 1 };
        }
        return { code: 0 };
    }
    handle_login = async () => {
        let result = this.validation(this.state.username, this.state.password);
        if (result.code === 0) {
            try {
                let data = await Login(this.state.username, this.state.password);
                if (data && data.data && data.data.success === 1) {
                    set_data_local(process.env.REACT_APP_LOCALHOST_ACCOUNT_ADMIN, data.data.data);
                    this.props.history.push(`/admin`);
                    this.props.handle_login_db();
                }
                else {
                    message.error("Username or password is incorrect !")
                }
            } catch (e) {
                message.error("Username or password is incorrect !")
            }
        } else {
            message.error(result.mess);
        }
        this.handle_loading(false);
    }
    handle_show_password = () => {
        this.setState({ is_show_password: !this.state.is_show_password })
    }
    render() {
        return (
            <div className="h-screen w-screen font-sans bg-no-repeat bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${bg})` }}>
                <div className="leading-loose">
                    <div className=" m-4 p-[20px] md:p-[40px] bg-gray-600 rounded shadow-xl space-y-[15px] w-[350px] sm:w-[400px]">
                        <p className="text-white font-medium text-center text-[22px] ">ADMIN</p>
                        <div className="space-y-[5px]">
                            <label className="block  text-sm text-white" for="email">Username</label>
                            <input onChange={(event) => this.onchange_username(event)}
                                className="w-full px-[10px] py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                                type="text" id="username" aria-label="username" required />
                        </div>
                        <div className="space-y-[5px]">
                            <label className="block text-sm text-white">Password</label>
                            <div className='relative'>
                                <input className="w-full px-[10px] py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                                    id="password" arial-label="password" required
                                    type={this.state.is_show_password === false ? 'password' : 'text'} onChange={(event) => this.onchange_password(event)} />
                                <div onClick={() => this.handle_show_password()}
                                    className='absolute top-[12px] right-[12px] cursor-pointer'>
                                    {this.state.is_show_password === false ?
                                        <AiFillEye className='text-gray-700' />
                                        :
                                        <AiFillEyeInvisible className='text-gray-700' />
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="pt-[10px]">
                            <Spin spinning={this.state.is_loading}>
                                <button disabled={this.state.is_loading} onClick={() => this.handle_login()}
                                    className="px-4 py-[10px] w-full flex justify-center font-medium text-white tracking-wider bg-gray-900 hover:bg-gray-800 rounded" type="submit">
                                    LOGIN
                                </button>
                            </Spin>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default withRouter(login);
