import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
class time_location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenFormCreate: false,
            isOpenFormDetail: false,
            isOpenFormEdit: false,
            dataTime_location: {},
            dataTime_locations: [
                { id: '1', make_up_time: 'HENIKEN' },
                { id: '2', name: '333' },
                { id: '3', name: 'TIGER' },
                { id: '4', name: 'SAIGONXANH' },

            ],
            idTime_location: '',
        }
    }
    async componentDidMount() {
        await this.getListTime_location();
    }
    getListTime_location = async () => {
    }
    getTime_location = async (id) => {
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.dataTime_location };
        copyState[id] = event.target.value;
        this.setState({
            dataTime_location: {
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
                await this.getTime_location(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ isOpenFormEdit: value });
            } else {
                this.setState({ isOpenFormEdit: value, idTime_location: id });
                await this.getTime_location(id);
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
        return { code: 0 };
    }
    handleCreate = async () => {
    }
    handleEdit = async (id) => {
    }
    handleDelete = async (id) => {
    }
    render() {
        let dataTime_location = this.state.dataTime_location;
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
                        <a onClick={() => this.openForm('detail', true, record.Time_location_code)}><AiFillEye /></a>
                        <a onClick={() => this.openForm('edit', true, record.Time_location_code)}><AiFillEdit /></a>
                        <Popconfirm title="DELETE ?" okType='default' onConfirm={() => this.handleDelete(record.Time_location_code)}>
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
                    <Divider>Time_location</Divider>
                    <Table columns={columns} dataSource={this.state.dataTime_locations}
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
                            <Input value={dataTime_location.name} disabled />
                        </div>
                        <div>
                            <label>Date created<span ></span></label>
                            <Input value={dataTime_location.name} disabled />
                        </div>
                        <div>
                            <label>Date updated <span ></span></label>
                            <Input value={dataTime_location.name} disabled />
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
                            <Input value={dataTime_location.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(time_location);