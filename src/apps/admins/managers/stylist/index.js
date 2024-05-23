import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Table, Space, Divider, Popconfirm, Spin, Dropdown, Image } from 'antd';
import { AiFillEye } from "react-icons/ai";
import ModalDetail from './modals/modal_detail';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
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
        this.props.get_list_stylist();
    }
    open_modal = async (name, value, id) => {
        this.props.set_data_stylist({});
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modal_detail: value, data_stylist: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.props.get_stylist(id);
            }
        }
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_stylist(data_selected); }
        await this.props.get_list_stylist();
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'IMAGE', dataIndex: 'images', responsive: ['md'], width: 120,
                render: (images) => (
                    <>
                        {images.length !== 0 ?
                            <Carousel autoPlay showArrows={false} showThumbs={false} >
                                {images && images.map((item, index) => {
                                    return (
                                        <div key={item.id} className='flex items-center justify-center '>
                                            <Image width={80} height={80} className='object-cover rounded-[5px] '
                                                src={item.value} />
                                        </div>
                                    )
                                })}
                            </Carousel>
                            :
                            <div className='flex items-center justify-center'>
                                <Image width={80} height={80} className='object-cover rounded-[5px] '
                                    src={require(`@assets/images/avatar_none.jpg`).default} />
                            </div>
                        }

                    </>
                ),
            },
            {
                title: 'NAME', dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
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
                            <Divider>STYLIST</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_stylists}
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
        data_stylists: state.stylist.data_stylists,
        data_stylist: state.stylist.data_stylist,
        is_loading: state.stylist.is_loading,
        is_result: state.stylist.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_stylist: () => dispatch(actions.get_list_stylist_redux()),
        get_stylist: (id) => dispatch(actions.get_stylist_redux(id)),
        edit_list_stylist: (id, data) => dispatch(actions.edit_list_stylist_redux(id, data)),
        delete_list_stylist: (id) => dispatch(actions.delete_list_stylist_redux(id)),
        set_data_stylist: (id) => dispatch(actions.set_data_stylist_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));