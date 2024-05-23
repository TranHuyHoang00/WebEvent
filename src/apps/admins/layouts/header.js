import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { get_data_local, remove_data_local, set_data_local } from '@auths/local_storage';
import { Avatar, Dropdown, Space } from 'antd';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import AvatarNone from '@assets/images/avatar_none1.png'
class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {},
            dark_mode: '',
        }
    }
    async componentDidMount() {
        let data_user = await get_data_local(process.env.REACT_APP_LOCALHOST_ACCOUNT_ADMIN);
        let dark_mode = await get_data_local(process.env.REACT_APP_LOCALHOST_DARK_MODE);
        if (data_user) {
            if (!dark_mode) {
                dark_mode = { data: false };
                set_data_local(process.env.REACT_APP_LOCALHOST_DARK_MODE, false);
            } else {
                document.documentElement.classList.toggle('dark', dark_mode.data);
            }
            this.props.set_dark_mode(dark_mode.data);
            this.setState({ data_user: data_user.data.user, dark_mode: dark_mode.data });
        }
    }
    handle_logout = () => {
        this.props.handle_logout_db();
        remove_data_local(process.env.REACT_APP_LOCALHOST_ACCOUNT_ADMIN);
        this.props.history.push(`/admin/login`);
    }
    handle_dark_mode = (value) => {
        this.setState({ dark_mode: value });
        set_data_local(process.env.REACT_APP_LOCALHOST_DARK_MODE, value);
        this.props.set_dark_mode(value);
        document.documentElement.classList.toggle('dark', value);
    }
    render() {
        let data_user = this.state.data_user;
        const items = [
            {
                label: <span onClick={() => this.handle_logout()}>Logout</span>,
                key: 1,
                icon: <LogoutOutlined />,
            },
        ];
        return (
            <div className='sticky top-0 z-50 shadow-sm h-auto mx-[10px]'>
                <div className='flex items-center justify-between w-full h-full py-[5px] px-[20px] bg-white dark:bg-black'>
                    <Space >
                        <MenuOutlined className='md:hidden block text-[20px] text-black dark:text-white ' onClick={() => this.props.open_drawer_form()} />
                        <Space>
                            <div onClick={() => { this.props.history.push(`/`); }}>
                                <h1 className='cursor-pointer text-[22px] font-[500] text-black dark:text-white'>ADMIN</h1>
                            </div>
                        </Space>
                    </Space>
                    <Space>
                        <Dropdown menu={{ items }} placement='bottomRight' className='cursor-pointer'>
                            <Space>
                                <Avatar src={AvatarNone} size={40} />
                                <div className='max-w-[70px] truncate'>
                                    <h1 className='font-medium text-gray-900 dark:text-white'>{data_user && data_user.fullname}</h1>
                                </div>
                            </Space>
                        </Dropdown>
                    </Space>
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
        set_dark_mode: (value) => dispatch(actions.set_dark_mode_redux(value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(header));
