import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { DatabaseOutlined, } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {
    AiFillGitlab, AiOutlineUser, AiOutlineQq, AiTwotoneSkin, AiFillAppstore, AiFillGithub, AiFillIdcard,
    AiFillGold, AiOutlineFieldTime, AiFillCarryOut, AiOutlineContainer
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
        }
    }
    async componentDidMount() {
        let data_db = get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        if (data_db) {
            this.setState({ logged_in_db: true })
        }
    }
    getItem = (label, key, icon, children, type) => {
        return { key, icon, children, label, type };
    }
    setCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }
    onClickPage = (value) => {
        this.props.history.push(`/dashboard/${value.key}`)
    }
    handleLogin_Index = () => {
        this.setState({ logged_in_db: true });
    }
    handleLogout_Index = () => {
        this.setState({ logged_in_db: false });
    }
    render() {
        const items = [
            this.getItem('Manager', 'table', <DatabaseOutlined />,
                [
                    this.getItem('Calender', '', <AiOutlineContainer />),
                    this.getItem('Time location', 'time_location', <AiOutlineFieldTime />),
                    this.getItem('Stylist', 'stylist', <AiTwotoneSkin />),
                    this.getItem('Makeup hair', 'makeup_hair', <AiFillGitlab />),
                    this.getItem('Person in charge', 'charge_of', <AiOutlineQq />),
                    this.getItem('Brand', 'brand', <AiFillIdcard />),
                    this.getItem('User', 'user', <AiOutlineUser />),
                    this.getItem('Role', 'role', <AiFillGold />),
                ]
            ),
        ];
        const items1 = [
            this.getItem('Menu', 'menu', <AiFillAppstore />, [
                this.getItem('Manager', 'table', <DatabaseOutlined />,
                    [
                        this.getItem('Calender', '', <AiOutlineContainer />),
                        this.getItem('Time location', 'time_location', <AiOutlineFieldTime />),
                        this.getItem('Stylist', 'stylist', <AiTwotoneSkin />),
                        this.getItem('Makeup hair', 'makeup_hair', <AiFillGitlab />),
                        this.getItem('Person in charge', 'charge_of', <AiOutlineQq />),
                        this.getItem('Brand', 'brand', <AiFillIdcard />),
                        this.getItem('User', 'user', <AiFillGithub />),
                        this.getItem('Role', 'role', <AiFillGold />),
                    ],
                    'group'
                ),
            ]),
        ];
        const { Header, Content, Footer, Sider } = Layout;
        let url = this.state.url;
        let logged_in_db = this.state.logged_in_db;
        return (
            <>
                {logged_in_db == true ?
                    <Layout style={{ minHeight: '100vh', }} >
                        <Sider className='sm:block hidden'
                            collapsible collapsed={this.state.collapsed} onCollapse={(value) => this.setCollapsed(value)}>
                            <div className='text-center text-white py-[10px] bg-[#002140] shadow-md'>
                                <label className='font-[600] text-[17px] font-serif'>ADMIN</label>
                            </div>
                            <Menu theme="dark" mode="inline" items={items} defaultSelectedKeys={['table']}
                                onClick={(value) => this.onClickPage(value)} />
                        </Sider>
                        <Layout>
                            <Header className='bg-white shadow-md flex items-center justify-between'>
                                <div >
                                    <Menu className='sm:hidden block'
                                        mode="horizontal" items={items1} defaultSelectedKeys={['menu']}
                                        onClick={(value) => this.onClickPage(value)} />
                                </div>
                                <HeaderDB handleLogout_Index={this.handleLogout_Index} />
                            </Header>
                            <Content className='py-[10px]'>
                                <Switch>
                                    <Route exact path={`${url}`}><ManagerCalender /></Route>
                                    <Route exact path={`${url}user`}><ManagerUser /></Route>
                                    <Route exact path={`${url}brand`}><ManagerBrand /></Route>
                                    <Route exact path={`${url}stylist`}><ManagerStylist /></Route>
                                    <Route exact path={`${url}charge_of`}><ManagerChargeOf /></Route>
                                    <Route exact path={`${url}makeup_hair`}><ManagerMakeup_hair /></Route>
                                    <Route exact path={`${url}role`}><ManagerRole /></Route>
                                    <Route exact path={`${url}time_location`}><ManagerTime_location /></Route>

                                    <Route exact path={`${url}login`}><Empty /></Route>
                                    <Route ><Empty /></Route>
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                    :
                    <>
                        <Switch>
                            <Route exact path={`${url}`}><Not_logged /></Route>
                            <Route exact path={`${url}login`}>
                                <Login_DB handleLogin_Index={this.handleLogin_Index} />
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
