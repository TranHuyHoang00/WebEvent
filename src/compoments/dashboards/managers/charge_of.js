import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
class charge_of extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenFormCreate: false,
            isOpenFormDetail: false,
            isOpenFormEdit: false,
            dataCharge_of: { id: '1', name: 'Trần Huy Hoàng', created_at: '2023-11-08', updated_at: '2023-11-09' },
            dataCharge_ofs: [
                { id: '1', name: 'Trần Huy Hoàng' },
                { id: '2', name: 'Vũ Trung An' },
            ],
            idCharge_of: '',
        }
    }
    async componentDidMount() {
        await this.getListCharge_of();
    }
    getListCharge_of = async () => {
    }
    getCharge_of = async (id) => {
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.dataCharge_of };
        copyState[id] = event.target.value;
        this.setState({
            dataCharge_of: {
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
                await this.getCharge_of(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ isOpenFormEdit: value });
            } else {
                this.setState({ isOpenFormEdit: value, idCharge_of: id });
                await this.getCharge_of(id);
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
        let result = this.Validation(this.state.dataCharge_of);
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
        let dataCharge_of = this.state.dataCharge_of;
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
                        <a onClick={() => this.openForm('detail', true, record.Charge_of_code)}><AiFillEye /></a>
                        <a onClick={() => this.openForm('edit', true, record.Charge_of_code)}><AiFillEdit /></a>
                        <Popconfirm title="DELETE ?" okType='default' onConfirm={() => this.handleDelete(record.Charge_of_code)}>
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
                    <Divider>PERSON IN CHARGE</Divider>
                    <Table columns={columns} dataSource={this.state.dataCharge_ofs}
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
                            <Input value={dataCharge_of.name} disabled />
                        </div>
                        <div>
                            <label>Date created<span ></span></label>
                            <Input value={dataCharge_of.created_at} disabled />
                        </div>
                        <div>
                            <label>Date updated <span ></span></label>
                            <Input value={dataCharge_of.updated_at} disabled />
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
                            <Input value={dataCharge_of.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(charge_of);