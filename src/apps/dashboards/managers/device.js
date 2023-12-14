import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm, Tooltip, Image } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { get_list_device, delete_device } from '../../../services/device_services';
class device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_create: false,
            modal_detail: false,
            modal_edit: false,
            data_device: {},
            data_devices: [],
            id_device: '',
        }
    }
    async componentDidMount() {
        await this.get_list_device();
    }
    get_list_device = async () => {
        try {
            let data = await get_list_device();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_devices: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    get_device = async (id) => {

    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.data_device };
        copyState[id] = event.target.value;
        this.setState({
            data_device: {
                ...copyState
            }
        });
    }
    openForm = async (name, value, id) => {
        if (name == 'create') { this.setState({ modal_create: value }) }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ modal_detail: value, data_device: {} });
            } else {
                this.setState({ modal_detail: value });
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_device: {} });
            } else {
                this.setState({ modal_edit: value, id_device: id });
            }
        }
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    Validation = (data) => {
        return { code: 0 };
    }
    handleCreate = async () => {

    }
    handleEdit = async (id) => {
    }
    handleDelete = async (id) => {
        try {
            let data = await delete_device(id);
            if (data && data.data && data.data.success == 1) {
                toast.success('Success')
                await this.get_list_device();
            } else {
                toast.error('Error')
            }
        } catch (e) {
            toast.error('System error');
        }
    }
    render() {
        let data_device = this.state.data_device;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', responsive: ['md'], width: 100,
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'AVATAR', dataIndex: 'user_id', responsive: ['md'], width: 120,
                render: (user_id) =>
                    <div className='flex items-center justify-center'>
                        <Image className='object-cover rounded-[5px]' width={80} height={80}
                            src={(user_id && user_id.avatar == "" || user_id && user_id.avatar == null) ? require(`../../../assets/images/None.jpg`).default : user_id && user_id.avatar} />
                    </div>
                ,
            },
            {
                title: 'ARTIST', dataIndex: 'user_id', responsive: ['md'],
                render: (user_id) => <h1>{user_id && user_id.fullname}</h1>,
                sorter: (a, b) => a.user_id.fullname.localeCompare(b.user_id.fullname),
            },
            {
                title: 'DEVICE', dataIndex: 'push_token',
                sorter: (a, b) => a.push_token.localeCompare(b.push_token),
            },
            {
                title: 'ACTION', width: 120,
                render: (_, item) => (
                    <Space size="middle" >
                        {/* <Tooltip  title="Detail"><a  onClick={() => this.openForm('detail', true, item.id)}><AiFillEye /></a></Tooltip>
                        <Tooltip  title="Edit"><a onClick={() => this.openForm('edit', true, item.id)}><AiFillEdit /></a></Tooltip> */}
                        <Popconfirm title="Are you sure you want to DELETE?" placement="right"
                            okType='default' onConfirm={() => this.handleDelete(item.id)}>
                            <Tooltip title="Delete"> <a><AiFillDelete /></a></Tooltip>
                        </Popconfirm>
                    </Space >
                ),
            },
        ];
        return (
            <>
                <div className="m-[10px] p-[10px] border shadow-md bg-white">
                    <Button onClick={() => this.openForm("create", true)}
                        type="default" size="middle" className="bg-[#001529] text-white" disabled>
                        CREATE
                    </Button>
                    <Divider>DEVICE</Divider>
                    <Table columns={columns} dataSource={this.state.data_devices}
                        size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
                </div >

                <Modal title="CREATE" open={this.state.modal_create}
                    okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handleCreate()}
                    onCancel={() => this.openForm("create", false)}
                    width={300}>
                    <div className="space-y-[10px]">
                        <div>
                            <label>Name<span className="text-red-500"> *</span></label>
                            <Input value={data_device.name} placeholder="Cannot be blank"
                                onChange={(event) => this.handleOnchangeInput(event, "name")} />
                        </div>
                    </div>
                </Modal>

                <Modal title="DETAIL" open={this.state.modal_detail}
                    okText={"EXIT"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.openForm("detail", false, null)}
                    onCancel={() => this.openForm("detail", false, null)}
                    width={300}>
                    <div className="space-y-[10px]">
                        <div>
                            <label>Name<span></span></label>
                            <input value={data_device.name} disabled className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                    </div>
                </Modal>

                <Modal title="EDIT" open={this.state.modal_edit} okText={"CONFIRM"}
                    okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handleEdit(this.state.id_device)}
                    onCancel={() => this.openForm("edit", false, null)}
                    width={300}>
                    <div className="space-y-[10px]">
                        <div>
                            <label>Name<span className="text-red-500"> *</span></label>
                            <Input value={data_device.name}
                                onChange={(event) => this.handleOnchangeInput(event, "name")} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(device);