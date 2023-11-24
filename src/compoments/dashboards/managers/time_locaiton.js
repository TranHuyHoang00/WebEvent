import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm, Tooltip, DatePicker, TimePicker } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { get_list_time_location, create_time_location, get_time_location, delete_time_location, edit_time_location } from '../../../services/time_location_services';
class time_location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_create: false,
            modal_detail: false,
            modal_edit: false,
            data_time_location: {},
            data_time_locations: [],
            id_time_location: '',
        }
    }
    async componentDidMount() {
        await this.get_list_time_location();
    }
    get_list_time_location = async () => {
        try {
            let data = await get_list_time_location();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_time_locations: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    get_time_location = async (id) => {
        try {
            let data = await get_time_location(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_time_location: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.data_time_location };
        copyState[id] = event.target.value;
        this.setState({
            data_time_location: {
                ...copyState
            }
        });
    }

    openForm = async (name, value, id) => {
        if (name == 'create') { this.setState({ modal_create: value }) }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ modal_detail: value, data_time_location: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_time_location(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_time_location: {} });
            } else {
                this.setState({ modal_edit: value, id_time_location: id });
                await this.get_time_location(id);
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
        let show_time = new Date(data.show_time);
        let leave_time = new Date(data.leave_time);
        let make_up_time = new Date(data.make_up_time);
        if (!data.show_date) {
            return { mess: "Show date cannot be blank", code: 1 };
        }
        if (!data.show_time) {
            return { mess: "Show time cannot be blank", code: 1 };
        }
        if (!data.leave_time) {
            return { mess: "Leave time cannot be blank", code: 1 };
        }
        if (show_time >= leave_time) {
            return { mess: "Leave time must be greater than Show time", code: 1 };
        }
        if (!data.make_up_time) {
            return { mess: "Makeup time cannot be blank", code: 1 };
        }

        if (make_up_time >= show_time) {
            return { mess: "Makeup time must be greater than Show time", code: 1 };
        }
        if (!data.show_localtion) {
            return { mess: "Show localtion time cannot be blank", code: 1 };
        }
        if (!data.agency_name) {
            return { mess: "Agency name time cannot be blank", code: 1 };
        }
        if (!data.contact) {
            return { mess: "Contact  time cannot be blank", code: 1 };
        }
        if (!this.validatephone_numberNumber(data.contact)) {
            return { mess: "Contact wrong format", code: 1 };
        }
        return { code: 0 };
    }
    handleCreate = async () => {
        let result = this.Validation(this.state.data_time_location);
        if (result.code == 0) {
            try {
                let data = await create_time_location(this.state.data_time_location);
                if (data && data.data && data.data.success == 1) {
                    toast.success('Success')
                    await this.get_list_time_location();
                    this.setState({ modal_create: false, data_time_location: {} })
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
        let result = this.Validation(this.state.data_time_location);
        if (result.code == 0) {
            try {
                let data = await edit_time_location(id, this.state.data_time_location);
                if (data && data.data && data.data.success == 1) {
                    toast.success('Success')
                    await this.get_list_time_location();
                    this.setState({ modal_edit: false, data_time_location: {} })
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
            let data = await delete_time_location(id);
            if (data && data.data && data.data.success == 1) {
                toast.success('Success')
                await this.get_list_time_location();
            } else {
                toast.error('Error')
            }
        } catch (e) {
            toast.error('System error');
        }
    }
    format_time = (time) => {
        var time_raw = new Date(time);
        var hour = time_raw.getHours();
        var minute = time_raw.getMinutes();
        return `${hour}:${minute}`
    }
    render() {
        let data_time_location = this.state.data_time_location;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', responsive: ['md'], width: 100,
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'SHOW DATE', dataIndex: 'show_date',
                sorter: (a, b) => a.show_date.localeCompare(b.show_date),
            },
            {
                title: 'SHOW TIME', dataIndex: 'show_time',
                render: (time) => <h1>{this.format_time(time)}</h1>,
                sorter: (a, b) => a.show_time.localeCompare(b.show_time),
            },
            {
                title: 'LEAVE TIME', dataIndex: 'leave_time', responsive: ['md'],
                render: (time) => <h1>{this.format_time(time)}</h1>,
                sorter: (a, b) => a.leave_time.localeCompare(b.leave_time),
            },
            {
                title: 'MAKEUP TIME', dataIndex: 'make_up_time', responsive: ['md'],
                render: (time) => <h1>{this.format_time(time)}</h1>,
                sorter: (a, b) => a.make_up_time.localeCompare(b.make_up_time),
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
                    <Divider>TIME LOCATION</Divider>
                    <Table columns={columns} dataSource={this.state.data_time_locations}
                        size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
                </div >

                <Modal title="CREATE" open={this.state.modal_create}
                    okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handleCreate()}
                    onCancel={() => this.openForm("create", false)}
                    width={300}>
                    <div className="space-y-[10px]">
                        <div>
                            <label>Show date<span className="text-red-500"> *</span></label><br />
                            <input type='date'
                                onChange={(event) => this.handleOnchangeInput(event, 'show_date')}
                                className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Show time<span className="text-red-500"> *</span></label><br />
                            <input type='datetime-local'
                                onChange={(event) => this.handleOnchangeInput(event, 'show_time')}
                                className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Leave time<span className="text-red-500"> *</span></label><br />
                            <input type='datetime-local'
                                onChange={(event) => this.handleOnchangeInput(event, 'leave_time')}
                                className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Makeup time<span className="text-red-500"> *</span></label><br />
                            <input type='datetime-local'
                                onChange={(event) => this.handleOnchangeInput(event, 'make_up_time')}
                                className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Show localtion<span className="text-red-500"> *</span></label><br />
                            <Input placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'show_localtion')} />
                        </div>
                        <div>
                            <label>Agency name<span className="text-red-500"> *</span></label><br />
                            <Input placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'agency_name')} />
                        </div>
                        <div>
                            <label>Contact<span className="text-red-500"> *</span></label><br />
                            <Input placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'contact')} />
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
                            <label>Show date</label><br />
                            <input type='date' value={data_time_location.show_date}
                                disabled className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Show time</label><br />
                            <input type='datetime-local' value={data_time_location.show_time}
                                disabled className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Leave time</label><br />
                            <input type='datetime-local' value={data_time_location.leave_time}
                                disabled className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Makeup time</label><br />
                            <input type='datetime-local' value={data_time_location.make_up_time}
                                disabled className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Show localtion</label><br />
                            <Input value={data_time_location.show_localtion} disabled />
                        </div>
                        <div>
                            <label>Agency name</label><br />
                            <Input value={data_time_location.agency_name} disabled />
                        </div>
                        <div>
                            <label>Contact</label><br />
                            <Input value={data_time_location.contact} disabled />
                        </div>
                    </div>
                </Modal>

                <Modal title="EDIT" open={this.state.modal_edit} okText={"CONFIRM"}
                    okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handleEdit(this.state.id_time_location)}
                    onCancel={() => this.openForm("edit", false, null)}
                    width={300}>
                    <div className="space-y-[10px]">
                        <div>
                            <label>Show date<span className="text-red-500"> *</span></label><br />
                            <input type='date' value={data_time_location.show_date}
                                onChange={(event) => this.handleOnchangeInput(event, 'show_date')}
                                className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Show time<span className="text-red-500"> *</span></label><br />
                            <input type='datetime-local' value={data_time_location.show_time}
                                onChange={(event) => this.handleOnchangeInput(event, 'show_time')}
                                className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Leave time<span className="text-red-500"> *</span></label><br />
                            <input type='datetime-local' value={data_time_location.leave_time}
                                onChange={(event) => this.handleOnchangeInput(event, 'leave_time')}
                                className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Makeup time<span className="text-red-500"> *</span></label><br />
                            <input type='datetime-local' value={data_time_location.make_up_time}
                                onChange={(event) => this.handleOnchangeInput(event, 'make_up_time')}
                                className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Show localtion<span className="text-red-500"> *</span></label><br />
                            <Input value={data_time_location.show_localtion} placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'show_localtion')} />
                        </div>
                        <div>
                            <label>Agency name<span className="text-red-500"> *</span></label><br />
                            <Input value={data_time_location.agency_name} placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'agency_name')} />
                        </div>
                        <div>
                            <label>Contact<span className="text-red-500"> *</span></label><br />
                            <Input value={data_time_location.contact} placeholder='Cannot be blank'
                                onChange={(event) => this.handleOnchangeInput(event, 'contact')} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(time_location);