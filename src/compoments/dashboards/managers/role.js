import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
class role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenFormCreate: false,
            isOpenFormDetail: false,
            isOpenFormEdit: false,
            dataRole: { id: '1', name: 'Admin', created_at: '2023-11-08', updated_at: '2023-11-09' },
            dataRoles: [
                { id: '1', name: 'Admin' },
                { id: '2', name: 'Manager' },
                { id: '3', name: 'Artist' },
            ],
            idRole: '',
        }
    }
    async componentDidMount() {
        await this.getListRole();
    }
    getListRole = async () => {
    }
    getRole = async (id) => {
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.dataRole };
        copyState[id] = event.target.value;
        this.setState({
            dataRole: {
                ...copyState
            }
        });
    }
    openForm = async (name, value, id) => {
        if (name == 'create') { this.setState({ isOpenFormCreate: value }) }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ isOpenFormDetail: value });
            } else {
                this.setState({ isOpenFormDetail: value });
                await this.getRole(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ isOpenFormEdit: value });
            } else {
                this.setState({ isOpenFormEdit: value, idRole: id });
                await this.getRole(id);
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
        if (!data.name) {
            return { mess: "Name cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handleCreate = async () => {
        let result = this.Validation(this.state.dataRole);
        if (result.code == 0) {

        } else {
            toast.error(result.mess);
        }
    }
    handleEdit = async (id) => {
    }
    handleDelete = async (id) => {
    }
    render() {
        let dataRole = this.state.dataRole;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', responsive: ['md'], width: 100,
                render: (ID) => <a className=' font-[600]'>{ID}</a>,
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'NAME', dataIndex: 'name',
                render: (NAME) => <a className=' font-[600]'>{NAME}</a>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'ACTION', width: 120,
                render: (_, record) => (
                    <Space size="middle">
                        <a onClick={() => this.openForm('detail', true, record.Role_code)}><AiFillEye /></a>
                        <a onClick={() => this.openForm('edit', true, record.Role_code)}><AiFillEdit /></a>
                        <Popconfirm title="DELETE ?" okType='default' onConfirm={() => this.handleDelete(record.Role_code)}>
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
                    <Divider>ROLE</Divider>
                    <Table columns={columns} dataSource={this.state.dataRoles}
                        size="middle" bordered
                        pagination={{ pageSize: 6, }}
                        scroll={{ y: 300, x: 300, }} />
                </div>
                <Modal title="ADD NEW" open={this.state.isOpenFormCreate}
                    okText={'CONFIRM'} okType={'default'} cancelText={'CANCEL'}
                    onOk={() => this.handleCreate()}
                    onCancel={() => this.openForm('create', false)}
                    width={300} >
                    <div className='space-y-[10px]'>
                        <div>
                            <label>Name<span className='text-red-500'> *</span></label>
                            <Input placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'name')} />
                        </div>
                    </div>
                </Modal>
                <Modal title="DETAIL" open={this.state.isOpenFormDetail}
                    okText={'EXIT'} okType={'default'} cancelText={'CANCEL'}
                    onOk={() => this.openForm('detail', false, null)}
                    onCancel={() => this.openForm('detail', false, null)}
                    width={300}
                >
                    <div className='space-y-[10px]'>
                        <div>
                            <label>Name<span ></span></label>
                            <Input value={dataRole.name} disabled />
                        </div>
                        <div>
                            <label>Date created<span ></span></label>
                            <Input value={dataRole.created_at} disabled />
                        </div>
                        <div>
                            <label>Date updated <span ></span></label>
                            <Input value={dataRole.updated_at} disabled />
                        </div>
                    </div>
                </Modal>
                <Modal title="EDIT" open={this.state.isOpenFormEdit}
                    okText={'CONFIRM'} okType={'default'} cancelText={'CANCEL'}
                    onOk={() => this.handleEdit(this.state.idUser)}
                    onCancel={() => this.openForm('edit', false, null)}
                    width={300}
                >
                    <div className='space-y-[10px]'>
                        <div>
                            <label>Name<span className='text-red-500'> *</span></label>
                            <Input value={dataRole.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(role);