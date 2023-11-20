import React, { Component } from 'react';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm, Image, Select } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get_list_user, create_user, get_user, delete_user, edit_user } from '../../../services/user_services';
import { get_list_role } from '../../../services/role_services';

class user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open_create: false,
            open_detail: false,
            open_edit: false,
            data_user: {},
            data_users: [],
            id_user: '',
            data_roles: [],
        }
    }
    async componentDidMount() {
        await this.get_list_user();
        await this.get_list_role();
    }
    get_list_user = async () => {
        try {
            let data = await get_list_user();
            if (data && data.data && data.data.success == 1) {
                console.log(data.data.data);
                this.setState({ data_users: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    get_list_role = async () => {
        try {
            let data = await get_list_role();
            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                let data_new = [];
                for (const i of data_raw) {
                    const role = {};
                    role.value = i.id;
                    role.label = i.name;
                    data_new.push(role);
                }
                this.setState({ data_roles: data_new })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    get_user = async (id) => {
        try {
            let data = await get_user(id);
            if (data && data.data && data.data.success == 1) {
                console.log(data.data.data);
                this.setState({ data_user: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.data_user };
        copyState[id] = event.target.value;
        this.setState({
            data_user: {
                ...copyState
            }
        });
    }
    handleOnChangeRole = (role) => {
        this.setState({
            data_user: {
                ...this.state.data_user,
                role_id: role,
            }
        })
    }
    handleImageChange = (image) => {
        const file = image.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    image_show: true,
                    data_user: {
                        ...this.state.data_user,
                        avatar: reader.result
                    }
                })
            };
            reader.readAsDataURL(file);
        }
    }
    openForm = async (name, value, id) => {
        if (name == 'create') { this.setState({ open_create: value }) }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ open_detail: value, data_user: {} });
            } else {
                this.setState({ open_detail: value });
                await this.get_user(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ open_edit: value, data_user: {} });
            } else {
                this.setState({ open_edit: value, id_user: id });
                await this.get_user(id);
            }
        }
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    isCheckSpace = (value) => {
        return (/\s/).test(value);
    }
    Validation = (data) => {
        let data_users = this.state.data_users;
        for (const i of data_users) {
            if (i.username == data.username && this.state.open_create == true) {
                return { mess: "Username already exists ", code: 1 };
            };
        }
        if (!data.username) {
            return { mess: "Username cannot be blank", code: 1 };
        }
        if (this.isCheckSpace(data.username) == true) {
            return { mess: "Username contains spaces", code: 1 };
        }
        if (!data.password) {
            return { mess: "Password cannot be blank", code: 1 };
        }
        if (this.isCheckSpace(data.password) == true) {
            return { mess: "Password contains spaces", code: 1 };
        }
        if (!data.fullname) {
            return { mess: "Fullname cannot be blank", code: 1 };
        }
        if (!data.role_id) {
            return { mess: "Role cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handleCreate = async () => {
        let result = this.Validation(this.state.data_user);
        if (result.code == 0) {
            try {
                let data = await create_user(this.state.data_user);
                if (data && data.data && data.data.success == 1) {
                    toast.success('Success')
                    await this.get_list_user();
                    this.setState({ open_create: false, data_user: {} })
                } else {
                    toast.error('Error')
                }
            } catch (e) {
                toast.error('System Error');
            }
        } else {
            toast.error(result.mess);
        }
    }
    handleEdit = async (id) => {
        let result = this.Validation(this.state.data_user);
        if (result.code == 0) {
            try {
                let data = await edit_user(id, this.state.data_user);
                if (data && data.data && data.data.success == 1) {
                    toast.success('Success')
                    await this.get_list_user();
                    this.setState({ open_edit: false, data_user: {} })
                } else {
                    toast.error('Error')
                }
            } catch (e) {
                toast.error('System error');
            }
        } else {
            toast.error(result.mess);
        }
    }
    handleDelete = async (id) => {
        try {
            let data = await delete_user(id);
            if (data && data.data && data.data.success == 1) {
                toast.success('Success')
                await this.get_list_user();
            } else {
                toast.error('Error')
            }
        } catch (e) {
            toast.error('System error');
        }
    }
    render() {
        let data_user = this.state.data_user;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', responsive: ['md'], width: 100,
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'AVATAR', dataIndex: 'avatar', responsive: ['md'], width: 120,
                render: (avatar) =>
                    <div className='flex items-center justify-center'>
                        <Image className='object-cover' width={80} height={80}
                            src={(avatar == "" || avatar == null) ? require(`../../../assets/images/None.jpg`).default : avatar} />
                    </div>
                ,
            },
            {
                title: 'FULLNAME', dataIndex: 'fullname', responsive: ['md'],
                sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            },
            {
                title: 'USERNAME', dataIndex: 'username',
                sorter: (a, b) => a.username.localeCompare(b.username),
            },
            {
                title: 'ROLE', dataIndex: 'role', responsive: ['md'],
                render: (role) =>
                    <h1>{role && role.name}</h1>
            },
            {
                title: 'ACTION', width: 100,
                render: (_, record) => (
                    <Space size="middle">
                        <a onClick={() => this.openForm('detail', true, record.id)}><AiFillEye /></a>
                        <a onClick={() => this.openForm('edit', true, record.id)}><AiFillEdit /></a>
                        <Popconfirm title="Are you sure you want to delete?" okType='default' onConfirm={() => this.handleDelete(record.id)}>
                            <a><AiFillDelete /></a>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];
        return (
            <>
                <div className='m-[10px] p-[10px] border shadow-md bg-white'>
                    <Button onClick={() => this.openForm('create', true)}
                        type='default' size='middle' className='bg-black text-white'>
                        ADD NEW
                    </Button>
                    <Divider>ACCOUNT</Divider>
                    <Table columns={columns} dataSource={this.state.data_users}
                        size="middle" bordered
                        pagination={{ pageSize: 7, }}
                        scroll={{ y: 300, x: 300, }} />
                </div>
                <Modal title="ADD NEW" open={this.state.open_create}
                    okText={'CONFIRM'} okType={'default'} cancelText={'CANCEL'}
                    onOk={() => this.handleCreate()}
                    onCancel={() => this.openForm('create', false)}
                    width={300} >
                    <div className='space-y-[10px]'>
                        <div className='flex items-center justify-center'>
                            <Image width={140} height={140} src={this.state.data_user.avatar}
                                className='border-[2px] border-black object-cover rounded-full' />
                        </div>
                        <div className='text-center'>
                            <input id="load_file" type="file" accept="image/*" hidden
                                onChange={(image) => this.handleImageChange(image)}
                            />
                            <label htmlFor="load_file"
                                className=' border rounded-[5px] px-[10px] py-[3px] cursor-pointer '>
                                Change
                            </label>
                        </div>
                        <div>
                            <label>Username<span className='text-red-500'> *</span></label>
                            <Input placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'username')} />
                        </div>
                        <div>
                            <label>Password<span className='text-red-500'> *</span></label>
                            <Input.Password placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'password')} />
                        </div>
                        <div>
                            <label>Fullname<span className='text-red-500'> *</span></label>
                            <Input placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'fullname')} />
                        </div>
                        <div>
                            <label>Role<span className='text-red-500'> *</span></label><br />
                            <Select className='w-full'
                                onChange={(event) => this.handleOnChangeRole(event, 'role_id')}
                                options={this.state.data_roles}
                            />
                        </div>
                    </div>
                </Modal>
                <Modal title="DETAIL" open={this.state.open_detail}
                    okText={'CONFIRM'} okType={'default'} cancelText={'CANCEL'}
                    onOk={() => this.openForm('detail', false, null)}
                    onCancel={() => this.openForm('detail', false, null)}
                    width={300}
                >
                    <div className='space-y-[10px]'>
                        <div className='flex items-center justify-center'>
                            <Image width={140} height={140}
                                className='border-[2px] border-black object-cover rounded-full'
                                src={(data_user.avatar == "" || data_user.avatar == null) ? require(`../../../assets/images/None.jpg`).default : data_user.avatar} />
                        </div>
                        <div>
                            <label>Username</label>
                            <Input value={data_user.username} disabled />
                        </div>
                        <div>
                            <label>Fullname</label>
                            <Input value={data_user.fullname} disabled />
                        </div>
                        <div>
                            <label>Role</label><br />
                            <Input value={data_user.role && data_user.role.name} disabled />
                        </div>
                    </div>
                </Modal>
                <Modal title="EDIT" open={this.state.open_edit}
                    okText={'CONFIRM'} okType={'default'} cancelText={'CANCEL'}
                    onOk={() => this.handleEdit(this.state.idUser)}
                    onCancel={() => this.openForm('edit', false, null)}
                    width={300}
                >
                    <div className='space-y-[10px]'>
                        <div className='flex items-center justify-center'>
                            <Image width={140} height={140} src={this.state.data_user.avatar}
                                className='border-[2px] border-black object-cover rounded-full' />
                        </div>
                        <div className='text-center'>
                            <input id="load_file" type="file" accept="image/*" hidden
                                onChange={(image) => this.handleImageChange(image)}
                            />
                            <label htmlFor="load_file"
                                className=' border rounded-[5px] px-[10px] py-[3px] cursor-pointer '>
                                Change
                            </label>
                        </div>
                        <div>
                            <label>Username</label>
                            <Input value={data_user.username} disabled
                                onChange={(event) => this.handleOnchangeInput(event, 'username')} />
                        </div>
                        <div>
                            <label>Password<span className='text-red-500'> *</span></label>
                            <Input.Password value={data_user.password}
                                onChange={(event) => this.handleOnchangeInput(event, 'password')} />
                        </div>
                        <div>
                            <label>Fullname<span className='text-red-500'> *</span></label>
                            <Input value={data_user.fullname}
                                onChange={(event) => this.handleOnchangeInput(event, 'fullname')} />
                        </div>
                        <div>
                            <label>Role</label><br />
                            <Input value={data_user.role && data_user.role.name} disabled />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(user);