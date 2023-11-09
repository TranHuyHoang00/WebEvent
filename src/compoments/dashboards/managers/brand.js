import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
class brand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenFormCreate: false,
            isOpenFormDetail: false,
            isOpenFormEdit: false,
            dataBrand: { id: '1', name: 'HENIKE', created_at: '2023-11-08', updated_at: '2023-11-09' },
            dataBrands: [
                { id: '1', name: 'HENIKE' },
                { id: '2', name: 'TIGER' },
                { id: '3', name: 'SAIGONXANH' },
            ],
            idBrand: '',
        }
    }
    async componentDidMount() {
        await this.getListBrand();
    }
    getListBrand = async () => {
    }
    getBrand = async (id) => {
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.dataBrand };
        copyState[id] = event.target.value;
        this.setState({
            dataBrand: {
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
                await this.getBrand(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ isOpenFormEdit: value });
            } else {
                this.setState({ isOpenFormEdit: value, idBrand: id });
                await this.getBrand(id);
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
        let result = this.Validation(this.state.dataBrand);
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
        let dataBrand = this.state.dataBrand;
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
                        <a onClick={() => this.openForm('detail', true, record.Brand_code)}><AiFillEye /></a>
                        <a onClick={() => this.openForm('edit', true, record.Brand_code)}><AiFillEdit /></a>
                        <Popconfirm title="DELETE ?" okType='default' onConfirm={() => this.handleDelete(record.Brand_code)}>
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
                    <Divider>BRAND</Divider>
                    <Table columns={columns} dataSource={this.state.dataBrands}
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
                            <Input value={dataBrand.name} disabled />
                        </div>
                        <div>
                            <label>Date created<span ></span></label>
                            <Input value={dataBrand.created_at} disabled />
                        </div>
                        <div>
                            <label>Date updated <span ></span></label>
                            <Input value={dataBrand.updated_at} disabled />
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
                            <Input value={dataBrand.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(brand);