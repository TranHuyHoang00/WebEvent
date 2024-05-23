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
        this.props.get_list_charge_of();
    }
    open_modal = async (name, value, id) => {
        this.props.set_data_charge_of({});
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modal_detail: value, data_brand: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.props.get_charge_of(id);
            }
        }
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_charge_of(data_selected); }
        await this.props.get_list_charge_of();
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'NAME', dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'PHONE', dataIndex: 'phone', responsive: ['sm'],
                sorter: (a, b) => a.phone.localeCompare(b.phone),
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
                            <Divider>PERSON IN CHARGE</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_charge_ofs}
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
        data_charge_ofs: state.charge_of.data_charge_ofs,
        data_charge_of: state.charge_of.data_charge_of,
        is_loading: state.charge_of.is_loading,
        is_result: state.charge_of.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_charge_of: () => dispatch(actions.get_list_charge_of_redux()),
        get_charge_of: (id) => dispatch(actions.get_charge_of_redux(id)),
        edit_list_charge_of: (id, data) => dispatch(actions.edit_list_charge_of_redux(id, data)),
        delete_list_charge_of: (id) => dispatch(actions.delete_list_charge_of_redux(id)),
        set_data_charge_of: (id) => dispatch(actions.set_data_charge_of_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));