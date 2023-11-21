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
        let data_user = get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        if (data_user) {
            this.setState({ data_user: data_user.data.user })
        }
    }
    onClickLogout = () => {
        this.props.handleLogout_Index();
        remove_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        this.props.history.push(`/dashboard/login`);
    }
    render() {
        let data_user = this.state.data_user;
        const items = [
            {
                label: <a onClick={() => this.onClickLogout()}
                    className='text-[16px] font-serif'>Logout</a>,
                key: '1',
                icon: <BiExit />,
            },
        ];
        return (
            <div className='flex items-center justify-between'>
                <div className='hover:text-red-600 font-[500] duration-500 ease-in-out'>
                    <Dropdown
                        menu={{ items }}
                        trigger={['click', 'hover']}>
                        <div className='space-x-[5px] cursor-pointer flex items-center justify-center'>
                            < Avatar size={40}
                                src={(data_user.avatar == "" || !data_user.avatar || data_user.avatar == null) ? require(`../../../assets/images/None.jpg`).default
                                    : data_user.avatar} />
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
