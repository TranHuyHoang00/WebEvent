import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm, Image, Carousel } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
class stylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenFormCreate: false,
            isOpenFormDetail: false,
            isOpenFormEdit: false,
            dataStylist: { id: '1', name: 'BOBE', created_at: '2023-11-08', updated_at: '2023-11-09', img: [{ id: '1', value: '1.png' }, { id: '2', value: '2.png' }] },
            dataStylists: [
                { id: '1', name: 'BOBE', img: [{ id: '1', value: '1.png' }, { id: '2', value: '2.png' }] },
                { id: '2', name: 'XIOLO', img: [{ id: '1', value: '1.png' }, { id: '2', value: '2.png' }] },
                { id: '3', name: 'XIXAO', img: [{ id: '1', value: '1.png' }, { id: '2', value: '2.png' }] },
            ],
            idStylist: '',
        }
    }
    async componentDidMount() {
        await this.getListStylist();
    }
    getListStylist = async () => {
    }
    getStylist = async (id) => {
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.dataStylist };
        copyState[id] = event.target.value;
        this.setState({
            dataStylist: {
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
                await this.getStylist(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ isOpenFormEdit: value });
            } else {
                this.setState({ isOpenFormEdit: value, idStylist: id });
                await this.getStylist(id);
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
        let dataStylist = this.state.dataStylist;
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
                title: 'NAME', dataIndex: 'name',
                render: (NAME) => <a className=' font-[600]'>{NAME}</a>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'ACTION', width: 120,
                render: (_, record) => (
                    <Space size="middle">
                        <a onClick={() => this.openForm('detail', true, record.Stylist_code)}><AiFillEye /></a>
                        <a onClick={() => this.openForm('edit', true, record.Stylist_code)}><AiFillEdit /></a>
                        <Popconfirm title="DELETE ?" okType='default' onConfirm={() => this.handleDelete(record.Stylist_code)}>
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
                    <Divider>STYLIST</Divider>
                    <Table columns={columns} dataSource={this.state.dataStylists}
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
                            <Carousel autoplay >
                                {dataStylist && dataStylist.img.map((item, index) => {
                                    return (
                                        <>
                                            <div key={item.id} className='flex items-center justify-center'>
                                                <Image width={150} height={150} src={require(`../../../assets/images/${item.value}`).default} />
                                            </div>
                                        </>
                                    )
                                })}
                            </Carousel>
                        </div>
                        <div>
                            <label>Name<span ></span></label>
                            <Input value={dataStylist.name} disabled />
                        </div>
                        <div>
                            <label>Date created<span ></span></label>
                            <Input value={dataStylist.created_at} disabled />
                        </div>
                        <div>
                            <label>Date updated <span ></span></label>
                            <Input value={dataStylist.updated_at} disabled />
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
                            <Input value={dataStylist.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(stylist);