import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm, Tooltip } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { get_list_brand, create_brand, get_brand, delete_brand, edit_brand } from '../../../services/brand_services';
class brand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_create: false,
            modal_detail: false,
            modal_edit: false,
            data_brand: {},
            data_brands: [],
            id_brand: '',
        }
    }
    async componentDidMount() {
        await this.get_list_brand();
    }
    get_list_brand = async () => {
        try {
            let data = await get_list_brand();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_brands: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    get_brand = async (id) => {
        try {
            let data = await get_brand(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_brand: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.data_brand };
        copyState[id] = event.target.value;
        this.setState({
            data_brand: {
                ...copyState
            }
        });
    }
    openForm = async (name, value, id) => {
        if (name == 'create') { this.setState({ modal_create: value }) }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ modal_detail: value, data_brand: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_brand(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_brand: {} });
            } else {
                this.setState({ modal_edit: value, id_brand: id });
                await this.get_brand(id);
            }
        }
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    Validation = (data) => {
        if (!data.name) {
            return { mess: "Name cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handleCreate = async () => {
        let result = this.Validation(this.state.data_brand);
        if (result.code == 0) {
            try {
                let data = await create_brand(this.state.data_brand);
                if (data && data.data && data.data.success == 1) {
                    toast.success('Success')
                    await this.get_list_brand();
                    this.setState({ modal_create: false, data_brand: {} })
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
        let result = this.Validation(this.state.data_brand);
        if (result.code == 0) {
            try {
                let data = await edit_brand(id, this.state.data_brand);
                if (data && data.data && data.data.success == 1) {
                    toast.success('Success')
                    await this.get_list_brand();
                    this.setState({ modal_edit: false, data_brand: {} })
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
            let data = await delete_brand(id);
            if (data && data.data && data.data.success == 1) {
                toast.success('Success')
                await this.get_list_brand();
            } else {
                toast.error('Error')
            }
        } catch (e) {
            toast.error('System error');
        }
    }
    render() {
        let data_brand = this.state.data_brand;
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
                    <Divider>BRAND</Divider>
                    <Table columns={columns} dataSource={this.state.data_brands}
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
                            <Input value={data_brand.name} placeholder="Cannot be blank"
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
                            <input value={data_brand.name} disabled className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                    </div>
                </Modal>

                <Modal title="EDIT" open={this.state.modal_edit} okText={"CONFIRM"}
                    okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handleEdit(this.state.id_brand)}
                    onCancel={() => this.openForm("edit", false, null)}
                    width={300}>
                    <div className="space-y-[10px]">
                        <div>
                            <label>Name<span className="text-red-500"> *</span></label>
                            <Input value={data_brand.name}
                                onChange={(event) => this.handleOnchangeInput(event, "name")} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(brand);