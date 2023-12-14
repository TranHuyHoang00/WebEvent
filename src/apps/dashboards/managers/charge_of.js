import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm, Tooltip } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { get_list_charge_of, create_charge_of, get_charge_of, delete_charge_of, edit_charge_of } from '../../../services/charge_of_services';
class charge_of extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_create: false,
            modal_detail: false,
            modal_edit: false,
            data_charge_of: {},
            data_charge_ofs: [],
            id_charge_of: '',
        }
    }
    async componentDidMount() {
        await this.get_list_charge_of();
    }
    get_list_charge_of = async () => {
        try {
            let data = await get_list_charge_of();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_charge_ofs: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    get_charge_of = async (id) => {
        try {
            let data = await get_charge_of(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_charge_of: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.data_charge_of };
        copyState[id] = event.target.value;
        this.setState({
            data_charge_of: {
                ...copyState
            }
        });
    }
    openForm = async (name, value, id) => {
        if (name == 'create') { this.setState({ modal_create: value }) }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ modal_detail: value, data_charge_of: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_charge_of(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_charge_of: {} });
            } else {
                this.setState({ modal_edit: value, id_charge_of: id });
                await this.get_charge_of(id);
            }
        }
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    validatephone_numberNumber = (phone_number) => {
        const re = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;
        return re.test(phone_number);
    }
    Validation = (data) => {
        if (!data.name) {
            return { mess: "Name cannot be blank", code: 1 };
        }
        if (!data.phone) {
            return { mess: "Contact  time cannot be blank", code: 1 };
        }
        if (!this.validatephone_numberNumber(data.phone)) {
            return { mess: "Phone wrong format", code: 1 };
        }
        return { code: 0 };
    }
    handleCreate = async () => {
        let result = this.Validation(this.state.data_charge_of);
        if (result.code == 0) {
            try {
                let data = await create_charge_of(this.state.data_charge_of);
                if (data && data.data && data.data.success == 1) {
                    toast.success('Success')
                    await this.get_list_charge_of();
                    this.setState({ modal_create: false, data_charge_of: {} })
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
        let result = this.Validation(this.state.data_charge_of);
        if (result.code == 0) {
            try {
                let data = await edit_charge_of(id, this.state.data_charge_of);
                if (data && data.data && data.data.success == 1) {
                    toast.success('Success')
                    await this.get_list_charge_of();
                    this.setState({ modal_edit: false, data_charge_of: {} })
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
            let data = await delete_charge_of(id);
            if (data && data.data && data.data.success == 1) {
                toast.success('Success')
                await this.get_list_charge_of();
            } else {
                toast.error('Error')
            }
        } catch (e) {
            toast.error('System error');
        }
    }
    render() {
        let data_charge_of = this.state.data_charge_of;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', responsive: ['md'], width: 100,
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'NAME', dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'PHONE', dataIndex: 'phone',
                sorter: (a, b) => a.phone.localeCompare(b.phone),
            },
            {
                title: 'ACTION', width: 120,
                render: (_, item) => (
                    <Space size="middle" >
                        <Tooltip title="Detail"><a onClick={() => this.openForm('detail', true, item.id)}><AiFillEye /></a></Tooltip>
                        <Tooltip title="Edit"><a onClick={() => this.openForm('edit', true, item.id)}><AiFillEdit /></a></Tooltip>
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
                        type="default" size="middle" className="bg-[#001529] text-white">
                        CREATE
                    </Button>
                    <Divider>PERSON IN CHARGE</Divider>
                    <Table columns={columns} dataSource={this.state.data_charge_ofs}
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
                            <Input value={data_charge_of.name} placeholder="Cannot be blank"
                                onChange={(event) => this.handleOnchangeInput(event, "name")} />
                        </div>
                        <div>
                            <label>Phone<span className="text-red-500"> *</span></label><br />
                            <Input placeholder='Cannot be blank' value={data_charge_of.phone}
                                onChange={(event) => this.handleOnchangeInput(event, 'phone')} />
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
                            <input value={data_charge_of.name} disabled className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Phone<span></span></label>
                            <input value={data_charge_of.phone} disabled className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                    </div>
                </Modal>

                <Modal title="EDIT" open={this.state.modal_edit} okText={"CONFIRM"}
                    okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handleEdit(this.state.id_charge_of)}
                    onCancel={() => this.openForm("edit", false, null)}
                    width={300}>
                    <div className="space-y-[10px]">
                        <div>
                            <label>Name<span className="text-red-500"> *</span></label>
                            <Input value={data_charge_of.name}
                                onChange={(event) => this.handleOnchangeInput(event, "name")} />
                        </div>
                        <div>
                            <label>Phone<span className="text-red-500"> *</span></label><br />
                            <Input placeholder='Cannot be blank' value={data_charge_of.phone}
                                onChange={(event) => this.handleOnchangeInput(event, 'phone')} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(charge_of);