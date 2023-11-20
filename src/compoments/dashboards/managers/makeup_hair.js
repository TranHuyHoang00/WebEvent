import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm, Image, Carousel } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
class makeup_hair extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open_create: false,
            open_detail: false,
            open_edit: false,
            dataMakeup_hair: {},
            dataMakeup_hairs: [
                { id: '1', makeup_name: 'HENIKEN', hair_name: 'OLO', img: [{ id: '1', value: '1.png' }, { id: '2', value: '2.png' }] },
                { id: '2', makeup_name: '333', hair_name: 'OLO', img: [{ id: '1', value: '1.png' }, { id: '2', value: '2.png' }] },
                { id: '3', makeup_name: 'TIGER', hair_name: 'OLO', img: [{ id: '1', value: '1.png' }, { id: '2', value: '2.png' }] },
                { id: '4', makeup_name: 'SAIGONXANH', hair_name: 'OLO', img: [] },
            ],
            idMakeup_hair: '',
        }
    }
    async componentDidMount() {
        await this.getListMakeup_hair();
    }
    getListMakeup_hair = async () => {
    }
    getMakeup_hair = async (id) => {
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.dataMakeup_hair };
        copyState[id] = event.target.value;
        this.setState({
            dataMakeup_hair: {
                ...copyState
            }
        });
    }
    openForm = async (name, value, id) => {
        if (name == 'create') { this.setState({ open_create: value }) }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ open_detail: value });
            } else {
                this.setState({ open_detail: value });
                await this.getMakeup_hair(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ open_edit: value });
            } else {
                this.setState({ open_edit: value, idMakeup_hair: id });
                await this.getMakeup_hair(id);
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
        let dataMakeup_hair = this.state.dataMakeup_hair;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', responsive: ['md'], width: 100,
                render: (ID) => <a className=' font-[600]'>{ID}</a>,
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'IMAGE', dataIndex: 'img', responsive: ['md'], width: 120,
                render: (img) => (
                    <>
                        {img.length !== 0 ?
                            <Carousel autoplay >
                                {img && img.map((item, index) => {
                                    return (
                                        <>
                                            <div key={item.id} className='flex items-center justify-center'>
                                                <Image width={80} height={80} src={require(`../../../assets/images/${item.value}`).default} />
                                            </div>
                                        </>
                                    )
                                })}
                            </Carousel>
                            :
                            <div className='flex items-center justify-center'>
                                <Image width={80} height={80} src={require(`../../../assets/images/None.jpg`).default} />
                            </div>
                        }

                    </>
                ),
            },
            {
                title: 'MAKE UP', dataIndex: 'makeup_name',
                render: (makeup_name) => <a className=' font-[600]'>{makeup_name}</a>,
                sorter: (a, b) => a.makeup_name.localeCompare(b.makeup_name),
            },
            {
                title: 'MAKE HAIR', dataIndex: 'hair_name',
                render: (hair_name) => <a className=' font-[600]'>{hair_name}</a>,
                sorter: (a, b) => a.hair_name.localeCompare(b.hair_name),
            },
            {
                title: 'ACTION', width: 120,
                render: (_, record) => (
                    <Space size="middle">
                        <a onClick={() => this.openForm('detail', true, record.Makeup_hair_code)}><AiFillEye /></a>
                        <a onClick={() => this.openForm('edit', true, record.Makeup_hair_code)}><AiFillEdit /></a>
                        <Popconfirm title="DELETE ?" okType='default' onConfirm={() => this.handleDelete(record.Makeup_hair_code)}>
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
                    <Divider>MAKE UP-HAIR</Divider>
                    <Table columns={columns} dataSource={this.state.dataMakeup_hairs}
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
                        <div>
                            <label>Make up<span className='text-red-500'> *</span></label>
                            <Input placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'name')} />
                        </div>
                        <div>
                            <label>Make hair<span className='text-red-500'> *</span></label>
                            <Input placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'name')} />
                        </div>
                    </div>
                </Modal>
                <Modal title="DETAIL" open={this.state.open_detail}
                    okText={'EXIT'} okType={'default'} cancelText={'CANCEL'}
                    onOk={() => this.openForm('detail', false, null)}
                    onCancel={() => this.openForm('detail', false, null)}
                    width={300}
                >
                    <div className='space-y-[10px]'>
                        <div>


                        </div>
                        <div>
                            <label>Make up<span ></span></label>
                            <Input value={dataMakeup_hair.name} disabled />
                        </div>
                        <div>
                            <label>Make hair<span ></span></label>
                            <Input value={dataMakeup_hair.name} disabled />
                        </div>
                        <div>
                            <label>Date created<span ></span></label>
                            <Input value={dataMakeup_hair.name} disabled />
                        </div>
                        <div>
                            <label>Date updated <span ></span></label>
                            <Input value={dataMakeup_hair.name} disabled />
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
                        <div>
                            <label>Name<span className='text-red-500'> *</span></label>
                            <Input value={dataMakeup_hair.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(makeup_hair);