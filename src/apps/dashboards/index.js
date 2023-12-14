import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { DatabaseOutlined, } from '@ant-design/icons';
import { Layout, Menu, Drawer } from 'antd';
import {
    AiFillGitlab, AiOutlineUser, AiOutlineQq, AiTwotoneSkin, AiFillIdcard,
    AiFillGold, AiOutlineFieldTime, AiFillUsb, AiOutlineContainer
} from "react-icons/ai";
import { withRouter } from 'react-router-dom';
import { get_local_account } from '../../auths/local_storage';
import HeaderDB from './layouts/header';
import ManagerUser from './managers/user';
import ManagerBrand from './managers/brand';
import ManagerStylist from './managers/stylist';
import ManagerChargeOf from './managers/charge_of';
import ManagerMakeup_hair from './managers/makeup_hair';
import ManagerRole from './managers/role';
import ManagerTime_location from './managers/time_locaiton';
import ManagerCalender from './managers/calender/calender';
import ManagerDevice from './managers/device';
import Login_DB from './pages/login';
import Not_logged from './pages_error/not_logged';
import Not_found from './pages_error/not_found';
import Empty from './pages/empty';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            url: '/dashboard/',
            value: {},
            logged_in_db: false,
            is_form_drawer: false,

        }
    }
    async componentDidMount() {
        let data_db = get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        if (data_db) {
            this.setState({ logged_in_db: true })
        }
    }
    setCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }
    onClickPage = (value) => {
        this.props.history.push(`/dashboard/${value.key}`)
    }
    handleLogin_DB = () => {
        this.setState({ logged_in_db: true });
    }
    handleLogout_DB = () => {
        this.setState({ logged_in_db: false });
    }
    openDrawerForm = () => {
        this.setState({ is_form_drawer: true })
    }
    closeDrawerForm = () => {
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
                {logged_in_db == true ?

                    <Layout hasSider style={{ minHeight: '100vh', }} >
                        <Layout.Sider className='overflow-y-auto h-screen md:block hidden'
                            collapsible collapsed={this.state.collapsed} breakpoint="lg"
                            onCollapse={() => this.setCollapsed()}>
                            <Menu theme="dark" mode="inline" items={items} defaultSelectedKeys={['manager']}
                                onClick={(value) => this.onClickPage(value)} />
                        </Layout.Sider>
                        <Drawer title="Menu" placement={'left'} width={250} className='md:hidden block'
                            onClose={() => this.closeDrawerForm()}
                            open={this.state.is_form_drawer}>
                            <Menu className='border p-[5px] shadow-sm rounded-[5px]'
                                theme="light" mode="inline" items={items} defaultSelectedKeys={['manager']}
                                onClick={(value) => this.onClickPage(value)} />
                        </Drawer>
                        <Layout className='overflow-auto h-screen'>
                            <Layout.Header className='sticky top-0 z-50 border-b shadow-sm bg-white'>
                                <HeaderDB openDrawerForm={this.openDrawerForm} handleLogout_DB={this.handleLogout_DB} />
                            </Layout.Header>
                            <Layout.Content className='py-[10px]'>
                                <Switch>
                                    <Route exact path={`${url}`}><ManagerCalender /></Route>
                                    <Route exact path={`${url}user`}><ManagerUser /></Route>
                                    <Route exact path={`${url}brand`}><ManagerBrand /></Route>
                                    <Route exact path={`${url}stylist`}><ManagerStylist /></Route>
                                    <Route exact path={`${url}charge_of`}><ManagerChargeOf /></Route>
                                    <Route exact path={`${url}makeup_hair`}><ManagerMakeup_hair /></Route>
                                    <Route exact path={`${url}role`}><ManagerRole /></Route>
                                    <Route exact path={`${url}time_location`}><ManagerTime_location /></Route>
                                    <Route exact path={`${url}device`}><ManagerDevice /></Route>
                                    <Route exact path={`${url}login`}><Empty /></Route>
                                    <Route ><Not_found /></Route>
                                </Switch>
                            </Layout.Content>
                        </Layout>
                    </Layout>
                    :
                    <>
                        <Switch>
                            <Route exact path={`${url}`}><Not_logged /></Route>
                            <Route exact path={`${url}login`}>
                                <Login_DB handleLogin_DB={this.handleLogin_DB} />
                            </Route>
                            <Route ><Not_found /></Route>
                        </Switch>
                    </>
                }
            </>
        );
    }

}
export default withRouter(index);
