import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Table, Space, Divider, Popconfirm, Spin, Dropdown, Image } from 'antd';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_menu: 1,
            data_selected: [],
        }
    }
    async componentDidMount() {
        this.props.get_list_device();
    }
    open_modal = async (name, value, id) => {
        this.props.set_data_device({});
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_device(data_selected); }
        await this.props.get_list_device();
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'AVATAR', dataIndex: 'user_id', responsive: ['md'], width: 120,
                render: (user_id) =>
                    <div className='flex items-center justify-center'>
                        <Image className='object-cover rounded-[5px]' width={80} height={80}
                            src={(user_id?.avatar == "" || user_id?.avatar == null) ? require(`@assets/images/avatar_none.jpg`).default : user_id?.avatar} />
                    </div>
                ,
            },
            {
                title: 'ARTIST', dataIndex: 'user_id', responsive: ['md'],
                render: (user_id) => <h1>{user_id.fullname}</h1>,
                sorter: (a, b) => a.user_id.fullname.localeCompare(b.user_id.fullname),
            },
            {
                title: 'DEVICE', dataIndex: 'push_token',
                sorter: (a, b) => a.push_token.localeCompare(b.push_token),
            },
            {
                title: 'ACTION', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
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
                            <Divider>DEVICE</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_devices}
                                    size="middle" bordered pagination={{ pageSize: 6 }} />
                            </div>
                        </div>
                    </div >
                </Spin>
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_devices: state.device.data_devices,
        data_device: state.device.data_device,
        is_loading: state.device.is_loading,
        is_result: state.device.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_device: () => dispatch(actions.get_list_device_redux()),
        get_device: (id) => dispatch(actions.get_device_redux(id)),
        edit_list_device: (id, data) => dispatch(actions.edit_list_device_redux(id, data)),
        delete_list_device: (id) => dispatch(actions.delete_list_device_redux(id)),
        set_data_device: (id) => dispatch(actions.set_data_device_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));