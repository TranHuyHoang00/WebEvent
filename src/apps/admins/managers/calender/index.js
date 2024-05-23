import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Calendar, Spin, Modal, Divider, Tag, Table, Space, Popconfirm, Button, Avatar, Image, Select, message,
    Dropdown,
} from 'antd';
import { AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import Modal_detail from './modals/modal_detail';
import Modal_create from './modals/modal_create';
import Modal_edit from './modals/modal_edit';
import dayjs from 'dayjs';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date_select: '',
            data_filter: {
                user_id: 0,
                date: dayjs().format('DD-MM-YYYY'),
                type_date: 1,
            },
            type_menu: 1,
            data_selected: [],

            modal_create: false,
            modal_detail: false,
            modal_edit: false,
            modal_data_schedule_dates: false,
        }
    }
    async componentDidMount() {
        await this.props.get_list_schedule(this.state.data_filter);
        await this.props.get_list_user();
    }
    open_modal = async (name, value, id) => {
        if (name === 'modal_data_schedule_dates') { this.setState({ modal_data_schedule_dates: value }) }
        if (name === 'create') { this.setState({ modal_create: value }) }
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modal_detail: value, data_schedule: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.props.get_schedule(id);
            }
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modal_edit: value, data_schedule: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.props.get_schedule(id);
            }
        }
    }
    on_select_date = async (date, infor) => {
        let data_filter = this.state.data_filter;
        data_filter.date = dayjs(date).format('DD-MM-YYYY');
        if (infor.source === 'date') {
            data_filter.type_date = 2;
            this.setState({
                data_filter: data_filter,
                modal_data_schedule_dates: true,
                date_select: dayjs(date).format('DD-MM-YYYY'),
            })
            await this.props.get_list_schedule(data_filter);

        } else {
            data_filter.type_date = 1;
            this.setState({
                data_filter: data_filter,
            })
            await this.props.get_list_schedule(data_filter);
        }
    }
    on_select_artist = async (value) => {
        let data_filter = this.state.data_filter;
        data_filter.user_id = value;
        data_filter.type_date = 1;
        this.setState({ data_filter: data_filter });
        await this.props.get_list_schedule(data_filter);
    }
    calender_render = (current, infor) => {
        if (infor.type === 'date') return this.user_tag_render(this.get_data_to_date(current));
        if (infor.type === 'month') return this.user_tag_render(this.get_data_to_month(current));
        return infor.originNode;
    }
    user_tag_render = (list_data) => {
        return (
            <div className="space-y-[5px]">
                {list_data && list_data.map((item, index) => (
                    <li className='truncate text-white' key={item.id}>
                        <div className='flex items-center '>
                            <Avatar size={{ xs: 20, lg: 30 }} src={item?.user_id?.avatar} />
                            <Tag style={{ backgroundColor: `${item?.user_id?.color}`, }} className="text-white hidden lg:block truncate max-w-[60px]" severity="success" >
                                {item?.user_id?.fullname}
                            </Tag>
                        </div>
                    </li>
                ))}
            </div>
        );
    };
    get_data_to_date = (value) => {
        const date = dayjs(value).format('YYYY-MM-DD');
        const filtered_data = this.props.data_schedules.filter(item => {
            const show_date = item?.time_localtion_id?.show_date;
            return date === show_date;
        });
        return filtered_data;
    };
    get_data_to_month = (value) => {
        const date = dayjs(value).format('YYYY-MM');
        const filtered_data = this.props.data_schedules.filter(item => {
            const show_date = dayjs(item?.time_localtion_id?.show_date).format('YYYY-MM');
            return date === show_date;
        });
        return filtered_data;
    };
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_schedule(data_selected); }
        let data_filter = this.state.data_filter;
        await this.props.get_list_schedule(data_filter);
        let type_filter_date = data_filter;
        type_filter_date.type_date = 1;
        await this.props.get_list_schedule(type_filter_date);
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', responsive: ['md'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'AVATAR', dataIndex: 'user_id',
                render: (user_id) =>
                    <Image className='object-cover rounded-[5px]' width={50} height={50}
                        src={(user_id.avatar == "" || user_id.avatar == null) ? require(`@assets/images/avatar_none.jpg`).default : user_id.avatar} />
                ,
            },
            {
                title: 'ARTIST', dataIndex: 'user_id',
                render: (user_id) => <h1>{user_id.fullname}</h1>,
                sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            },
            {
                title: 'SHOW TIME', dataIndex: 'time_localtion_id', responsive: ['md'],
                render: (time_localtion_id) => <h1>{time_localtion_id.show_time}</h1>,
                sorter: (a, b) => a.time_localtion_id.show_time.localeCompare(b.time_localtion_id.show_time),
            },
            {
                title: 'ACTION', width: 120,
                render: (_, item) => (
                    <Space size="middle" >
                        <button onClick={() => this.open_modal('detail', true, item.id)}><AiFillEye /></button>
                        <button className='cursor-pointer' onClick={() => this.open_modal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },
        ];
        let data_users = this.props.data_users;
        const items = [
            { key: 1, label: 'Delete' },
        ];
        const data_selected = this.state.data_selected;
        const onchange_selected = (data_new) => {
            this.setState({ data_selected: data_new })
        };
        const row_selection = { data_selected, onChange: onchange_selected };
        let type_menu = this.state.type_menu;
        return (
            <>
                <Spin spinning={this.props.is_loading}>
                    <div className="m-[10px] p-[10px] border shadow-md bg-white">
                        <div className='px-[10px]'>
                            <Select
                                defaultValue={{ value: 0, label: 'All' }}
                                style={{ width: 150, }}
                                onChange={(value) => this.on_select_artist(value)}
                                options={[
                                    { label: 'All', value: 0 },
                                    ...data_users
                                        .filter((item) => item?.role?.name === 'artist')
                                        .map((item) => ({
                                            label: item.fullname,
                                            value: item.id,
                                        })),
                                ]} />
                        </div>
                        <Calendar fullscreen className='p-[10px] '
                            onSelect={(date, infor) => this.on_select_date(date, infor)}
                            cellRender={(current, infor) => this.calender_render(current, infor)}
                        />
                    </div>
                </Spin>

                {this.state.modal_create &&
                    <Modal_create modal_create={this.state.modal_create} open_modal={this.open_modal}
                        date_select={this.state.date_select} data_filter={this.state.data_filter} />
                }
                {this.state.modal_detail &&
                    <Modal_detail modal_detail={this.state.modal_detail} open_modal={this.open_modal}
                        date_select={this.state.date_select} />
                }
                {this.state.modal_edit &&
                    <Modal_edit modal_edit={this.state.modal_edit} open_modal={this.open_modal}
                        date_select={this.state.date_select} data_filter={this.state.data_filter} />
                }

                <Modal title={`SCHEDULE FOR DATE: ${this.state.date_select}`} open={this.state.modal_data_schedule_dates}
                    okText={"EXIT"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.open_modal("modal_data_schedule_dates", false)}
                    onCancel={() => this.open_modal("modal_data_schedule_dates", false)}
                    width={800}>
                    <div className="m-[10px] p-[10px] border shadow-md bg-white">
                        <div className='flex items-center justify-between space-x-[5px] '>
                            <Button
                                onClick={() => this.open_modal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Create
                                </Space>
                            </Button>
                            <div>
                                <Popconfirm disabled={(data_selected && data_selected.length === 0 ? true : false)}
                                    title={`Take action with these ${data_selected && data_selected.length} lines ?`}
                                    placement="bottomLeft" okType='default' onConfirm={() => this.handle_funtion_menu()}>
                                    <Dropdown.Button
                                        menu={{ items, onClick: (value) => { this.setState({ type_menu: parseInt(value.key) }) } }}  >
                                        <div>
                                            {type_menu === 1 && <span>Delete</span>}
                                            <span> {data_selected && data_selected.length === 0 ? '' : `(${data_selected.length})`}</span>
                                        </div>
                                    </Dropdown.Button>
                                </Popconfirm>
                            </div>
                        </div>
                        <Divider>SCHEDULE</Divider>
                        <Table rowSelection={row_selection} rowKey="id"
                            columns={columns} dataSource={this.props.data_schedule_dates}
                            size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
                    </div >
                </Modal>
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_schedules: state.schedule.data_schedules,
        data_schedule_dates: state.schedule.data_schedule_dates,
        data_schedule: state.schedule.data_schedule,
        is_loading: state.schedule.is_loading,
        is_result: state.schedule.is_result,

        data_users: state.user.data_users,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_schedule: (data) => dispatch(actions.get_list_schedule_redux(data)),
        get_schedule: (id) => dispatch(actions.get_schedule_redux(id)),
        delete_list_schedule: (id) => dispatch(actions.delete_list_schedule_redux(id)),
        set_data_schedule: (id) => dispatch(actions.set_data_schedule_redux(id)),

        get_list_user: () => dispatch(actions.get_list_user_redux()),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
