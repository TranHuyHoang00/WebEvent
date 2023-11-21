import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible, } from "react-icons/ai";
import { set_local_account } from '../../../auths/local_storage';
import { toast } from 'react-toastify';
import { Login } from '../../../services/login_services';
import bg from '../../../assets/images/bg1.jpg';
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_password: false,
            password: '',
            username: '',
        }
    }
    async componentDidMount() {
    }
    onClickPage = () => {
        this.props.history.push('/home');
    }
    onClickShowPassword = () => {
        this.setState({ show_password: !this.state.show_password })
    }
    handleOnChangePassWord = (event) => {
        this.setState({ password: (event.target.value).replace(/\s/g, '') })
    }
    handleOnChangeUsername = (event) => {
        this.setState({ username: (event.target.value).replace(/\s/g, '') })
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    Validation = (username, password) => {
        if (this.isCheckEmpty(username) == 0) {
            return { mess: "Username cannot be blank", code: 1 };
        }
        if (this.isCheckEmpty(password) == 0) {
            return { mess: "Password cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handleLogin = async () => {
        let result = this.Validation(this.state.username, this.state.password);
        if (result.code == 0) {
            try {
                let data = await Login(this.state.username, this.state.password);
                if (data && data.data && data.data.success == 1) {
                    set_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB, data.data.data);
                    this.props.history.push(`/dashboard`);
                    this.props.handleLogin_Index();
                } else {
                    toast.error("Usename or password is incorrect")
                }
            } catch (e) {
                toast.error("Usename or password is incorrect")
            }
        } else {
            toast.error(result.mess);
        }
    }
    render() {
        return (
            <div className='h-screen w-screen flex items-center justify-center bg-center sm:bg-cover bg-no-repeat'
                style={{ backgroundImage: `url(${bg})` }}>
                <div className='space-y-[20px] p-[20px] '>
                    <div className='flex items-center justify-center '>
                        <img onClick={() => this.onClickPage()}
                            className='h-[120px] w-auto cursor-pointer hover:scale-105 duration-500 ease-in-out'
                            src='https://rebelsaintrecords.com/wp-content/themes/yootheme/cache/c3/1_5-removebg-preview-c32c9ec9.webp' />
                    </div>
                    <div className='space-y-[30px] text-white'>
                        <div className='text-[18px]'>
                            <div className=''>
                                <label>Username </label>
                            </div>
                            <div className=''>
                                <input onChange={(event) => this.handleOnChangeUsername(event)}
                                    className="border-b-[2px] p-[5px] w-full
                        bg-transparent  text-center focus:border-b-[2px] focus:ring-0 focus:outline-none focus:border-[#4acec7fa] hover:border-[#4acec7fa]" />

                            </div>
                        </div>
                        <div className=' text-[18px]'>
                            <div className=''>
                                <label>Password </label>
                            </div>
                            <div className='relative '>
                                <input onChange={(event) => this.handleOnChangePassWord(event)}
                                    type={this.state.show_password == false ? "password" : "text"} className="border-b-[2px] p-[5px] w-full
                        bg-transparent  text-center focus:border-b-[2px] focus:ring-0 focus:outline-none focus:border-[#4acec7fa] hover:border-[#4acec7fa]" />
                                {this.state.show_password == false ?
                                    <span onClick={() => this.onClickShowPassword()}
                                        className='absolute right-0 top-[10px] text-white cursor-pointer'><AiFillEye /></span>
                                    :
                                    <span onClick={() => this.onClickShowPassword()}
                                        className='absolute right-0 top-[10px] text-white cursor-pointer'><AiFillEyeInvisible /></span>
                                }
                            </div>
                        </div>
                    </div>
                    <div onClick={() => this.handleLogin()}
                        className="px-5 py-2.5 relative rounded-[10px] group overflow-hidden  bg-white text-black 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                        <div className="relative text-center group-hover:text-white font-[600]">
                            LOGIN
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default withRouter(login);
