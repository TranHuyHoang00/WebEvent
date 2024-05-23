import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Table, Space, Divider, Popconfirm, Spin, Dropdown } from 'antd';
import { AiFillEye } from "react-icons/ai";
import ModalDetail from './modals/modal_detail';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_menu: 1,
            data_selected: [],
            modal_detail: false,
        }
    }
    async componentDidMount() {
        this.props.get_list_time_location();
    }
    open_modal = async (name, value, id) => {
        this.props.set_data_time_location({});
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modal_detail: value, data_time_location: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.props.get_time_location(id);
            }
        }
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_time_location(data_selected); }
        await this.props.get_list_time_location();
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'SHOW DATE', dataIndex: 'show_date',
                sorter: (a, b) => a.show_date.localeCompare(b.show_date),
            },
            {
                title: 'SHOW TIME', dataIndex: 'show_time', responsive: ['sm'],
                sorter: (a, b) => a.show_time.localeCompare(b.show_time),
            },
            {
                title: 'LEAVE TIME', dataIndex: 'leave_time', responsive: ['md'],
                sorter: (a, b) => a.leave_time.localeCompare(b.leave_time),
            },
            {
                title: 'MAKEUP TIME', dataIndex: 'make_up_time', responsive: ['lg'],
                sorter: (a, b) => a.make_up_time.localeCompare(b.make_up_time),
            },
            {
                title: 'ACTION', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button onClick={() => this.open_modal('detail', true, item.id)}><AiFillEye /></button>
                    </Space >
                ),
            },

        ];
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
                <Spin size='large' spinning={this.props.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <div></div>
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
                            <Divider>TIME_LOCATION</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_time_locations}
                                    size="middle" bordered pagination={{ pageSize: 6 }} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modal_detail &&
                    <ModalDetail modal_detail={this.state.modal_detail}
                        open_modal={this.open_modal} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_time_locations: state.time_location.data_time_locations,
        data_time_location: state.time_location.data_time_location,
        is_loading: state.time_location.is_loading,
        is_result: state.time_location.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_time_location: () => dispatch(actions.get_list_time_location_redux()),
        get_time_location: (id) => dispatch(actions.get_time_location_redux(id)),
        edit_list_time_location: (id, data) => dispatch(actions.edit_list_time_location_redux(id, data)),
        delete_list_time_location: (id) => dispatch(actions.delete_list_time_location_redux(id)),
        set_data_time_location: (id) => dispatch(actions.set_data_time_location_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));