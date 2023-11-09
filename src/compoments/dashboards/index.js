import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { DatabaseOutlined, } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {
    AiFillGitlab, AiOutlineUser, AiOutlineQq, AiTwotoneSkin, AiFillAppstore, AiFillGithub, AiFillIdcard,
    AiFillGold
} from "react-icons/ai";
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get_local_account } from '../../auths/local_storage';
import HeaderDB from './layouts/header';
import ManagerUser from './managers/user';
import ManagerBrand from './managers/brand';
import ManagerStylist from './managers/stylist';
import ManagerChargeOf from './managers/charge_of';
import ManagerMakeup_hair from './managers/makeup_hair';
import ManagerRole from './managers/role';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            url: '/dashboard/',
            isLogin: false,
            isFirewall: false,
            isCheckPassFireWall: false,
            passFireWall: '',
            value: {},
        }
    }
    async componentDidMount() {
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
    render() {
        const items = [
            this.getItem('Manager', 'table', <DatabaseOutlined />,
                [
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
        return (
            <div>

                <Layout style={{ minHeight: '100vh', }} >
                    <Sider className='sm:block hidden'
                        collapsible collapsed={this.state.collapsed} onCollapse={(value) => this.setCollapsed(value)}>
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
                            <HeaderDB />
                        </Header>
                        <Content className='py-[10px]'>
                            <Switch>
                                <Route exact path={`${url}user`}><ManagerUser /></Route>
                                <Route exact path={`${url}brand`}><ManagerBrand /></Route>
                                <Route exact path={`${url}stylist`}><ManagerStylist /></Route>
                                <Route exact path={`${url}charge_of`}><ManagerChargeOf /></Route>
                                <Route exact path={`${url}makeup_hair`}><ManagerMakeup_hair /></Route>
                                <Route exact path={`${url}role`}><ManagerRole /></Route>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }

}
export default withRouter(index);
