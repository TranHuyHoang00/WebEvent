import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { DatabaseOutlined, } from '@ant-design/icons';
import { Layout, Menu, Drawer } from 'antd';
import {
    AiFillGitlab, AiOutlineUser, AiOutlineQq, AiTwotoneSkin, AiFillIdcard,
    AiFillGold, AiOutlineFieldTime, AiFillUsb, AiOutlineContainer
} from "react-icons/ai";
import { withRouter } from 'react-router-dom';
import { get_data_local } from '../../auths/local_storage';
import HeaderDB from './layouts/header';
import ManagerUser from './managers/user/index';
import ManagerBrand from './managers/brand/index';
import ManagerStylist from './managers/stylist/index';
import ManagerChargeOf from './managers/charge_of/index';
import ManagerMakeupHair from './managers/makeup_hair/index';
import ManagerRole from './managers/role/index';
import ManagerTimeLocation from './managers/time_location/index';
import ManagerCalender from './managers/calender/index';
import ManagerDevice from './managers/device/index';
import LoginDB from './pages/login';
import NotLogged from './pages_error/not_logged';
import NotFound from './pages_error/not_found';
import Empty from './pages/empty';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            url: '/admin/',
            value: {},
            logged_in_db: false,
            is_form_drawer: false,

        }
    }
    async componentDidMount() {
        let data_db = get_data_local(process.env.REACT_APP_LOCALHOST_ACCOUNT_ADMIN);
        if (data_db) {
            this.setState({ logged_in_db: true })
        }
    }
    setCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }
    onClickPage = (value) => {
        this.props.history.push(`/admin/${value.key}`)
    }
    handle_login_db = () => {
        this.setState({ logged_in_db: true });
    }
    handle_logout_db = () => {
        this.setState({ logged_in_db: false });
    }
    open_drawer_form = () => {
        this.setState({ is_form_drawer: true })
    }
    close_DrawerForm = () => {
        this.setState({ is_form_drawer: false })
    }
    render() {
        const items = [
            {
                key: 'manager', icon: <DatabaseOutlined />, label: 'Manager', children: [
                    { key: '', icon: <AiOutlineContainer />, label: 'Calender' },
                    { key: 'time_location', icon: <AiOutlineFieldTime />, label: 'Time location' },
                    { key: 'stylist', icon: <AiTwotoneSkin />, label: 'Stylist' },
                    { key: 'makeup_hair', icon: <AiFillGitlab />, label: 'Makeup hair' },
                    { key: 'charge_of', icon: <AiOutlineQq />, label: 'Person in charge' },
                    { key: 'brand', icon: <AiFillIdcard />, label: 'Brand' },
                    { key: 'user', icon: <AiOutlineUser />, label: 'User' },
                    { key: 'role', icon: <AiFillGold />, label: 'Role' },
                    { key: 'device', icon: <AiFillUsb />, label: 'Device' },
                ],
            },
        ];
        let url = this.state.url;
        let logged_in_db = this.state.logged_in_db;
        return (

            <>
                {logged_in_db ?
                    <Layout hasSider style={{ minHeight: '100vh', }} >
                        <Layout.Sider theme='dark' className='overflow-y-auto h-screen md:block hidden'
                            collapsible collapsed={this.state.collapsed} breakpoint="lg"
                            onCollapse={() => this.setCollapsed()}>
                            <Menu theme='dark' mode="inline" items={items} defaultSelectedKeys={['manager']}
                                onClick={(value) => this.onClickPage(value)} />
                        </Layout.Sider>
                        <Drawer title="Menu" placement={'left'} width={250} className='md:hidden block'
                            onClose={() => this.close_DrawerForm()}
                            open={this.state.is_form_drawer}>
                            <Menu className='border p-[5px] shadow-sm rounded-[5px]'
                                theme="light" mode="inline" items={items} defaultSelectedKeys={['manager']}
                                onClick={(value) => this.onClickPage(value)} />
                        </Drawer>
                        <Layout className='overflow-auto h-screen'>
                            <HeaderDB open_drawer_form={this.open_drawer_form} handle_logout_db={this.handle_logout_db} />
                            <Layout.Content className='py-[10px]'>
                                <Switch>
                                    <Route exact path={`${url}`}><ManagerCalender /></Route>
                                    <Route exact path={`${url}user`}><ManagerUser /></Route>
                                    <Route exact path={`${url}brand`}><ManagerBrand /></Route>
                                    <Route exact path={`${url}stylist`}><ManagerStylist /></Route>
                                    <Route exact path={`${url}charge_of`}><ManagerChargeOf /></Route>
                                    <Route exact path={`${url}makeup_hair`}><ManagerMakeupHair /></Route>
                                    <Route exact path={`${url}role`}><ManagerRole /></Route>
                                    <Route exact path={`${url}time_location`}><ManagerTimeLocation /></Route>
                                    <Route exact path={`${url}device`}><ManagerDevice /></Route>
                                    <Route exact path={`${url}login`}><Empty /></Route>
                                    <Route ><NotFound /></Route>
                                </Switch>
                            </Layout.Content>
                        </Layout>
                    </Layout>
                    :
                    <>
                        <Switch>
                            <Route exact path={`${url}`}><NotLogged /></Route>
                            <Route exact path={`${url}login`}>
                                <LoginDB handle_login_db={this.handle_login_db} />
                            </Route>
                            <Route ><NotFound /></Route>
                        </Switch>
                    </>
                }
            </>
        );
    }

}
export default withRouter(index);
