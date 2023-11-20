import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { AiOutlineContainer } from "react-icons/ai";
import { get_local_account, remove_local_account } from '../../../auths/local_storage';
import { Avatar, Dropdown } from 'antd';
import { BiExit } from "react-icons/bi";
class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {},
        }
    }
    async componentDidMount() {
        let data_user = get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
        if (data_user) {
            this.setState({ data_user: data_user.data.user })
        }
    }
    onClickPage = (name) => {
        if (name == 'home') { this.props.history.push(`/home`) };
        if (name == 'profile') { this.props.history.push(`/home/profile`) };
    }
    onClickLogout = () => {
        this.props.handleLogout_Index();
        remove_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
        this.props.history.push(`/home/login`);
    }
    render() {
        let data_user = this.state.data_user;
        const items = [
            {
                label: <a onClick={() => this.onClickPage('profile')}
                    className='text-[16px] font-serif '>Profile</a>,
                key: '0',
                icon: <AiOutlineContainer />,
            },
            {
                label: <a onClick={() => this.onClickLogout()}
                    className='text-[16px] font-serif'>Logout</a>,
                key: '1',
                icon: <BiExit />,
            },
        ];
        return (
            <div className='space-x-[10px] px-[5px] sm:px-[60px] lg:px-[100px] flex items-center justify-between
             text-white border-b border-gray-900 '>
                <div className=''>
                    <img onClick={() => this.onClickPage('home')}
                        className='h-[70px] w-auto cursor-pointer hover:scale-105 duration-500 ease-in-out'
                        src='https://rebelsaintrecords.com/wp-content/themes/yootheme/cache/c3/1_5-removebg-preview-c32c9ec9.webp' />
                </div>
                <div className='hover:text-yellow-400  duration-500 ease-in-out'>
                    <Dropdown
                        menu={{ items }}
                        trigger={['click', 'hover']}>

                        <div className='space-x-[5px] cursor-pointer flex items-center justify-center'>
                            {data_user && data_user.avatar &&
                                < Avatar size={40} src={(data_user.avatar == "" || !data_user.avatar) ? require(`../../../assets/images/None.jpg`).default
                                    : require(`../../../assets/images/${data_user && data_user.avatar}`).default} />
                            }
                            <div className='truncate'>
                                {data_user && data_user.fullname}
                            </div>
                        </div>
                    </Dropdown>
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
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(header));
