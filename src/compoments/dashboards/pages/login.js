import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { set_local_account } from '../../../auths/local_storage';
import { toast } from 'react-toastify';
import { Login } from '../../../services/login_services';
import { Input, Button } from 'antd';
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
                    let data_user = data.data.data;
                    if (data_user.user && data_user.user.role && data_user.user.role.name == 'Admin') {
                        set_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB, data.data.data);
                        this.props.history.push(`/dashboard`);
                        this.props.handleLogin_Index();
                    } else {
                        toast.error("Usename or password is incorrect")
                    }

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
            <div className='h-screen w-screen flex items-center justify-center bg-center sm:bg-cover bg-no-repeat bg-black'
                style={{ backgroundImage: `url(${bg})` }}>
                <div className='shadow-md border rounded-[5px] p-[10px] space-y-[20px]  bg-transparent text-white'>
                    <div className='text-center font-[600] text-[22px]'>
                        <label>ADMIN</label>
                    </div>
                    <div>
                        <label>Name<span className="text-red-500"> *</span></label>
                        <Input
                            onChange={(event) => this.handleOnChangeUsername(event)} />
                    </div>
                    <div>
                        <label>Password<span className="text-red-500"> *</span></label>
                        <Input.Password
                            onChange={(event) => this.handleOnChangePassWord(event)} />
                    </div>
                    <Button onClick={() => this.handleLogin()}
                        size='large' className='w-full bg-blue-500 text-white'>Login</Button>
                </div>
            </div>
        );
    }

}
export default withRouter(login);
