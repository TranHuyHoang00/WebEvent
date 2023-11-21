import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm, Tooltip, Image, Carousel, } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye, AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { get_list_stylist, create_stylist, get_stylist, delete_stylist, edit_stylist } from '../../../services/stylist_services';
class stylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_create: false,
            modal_detail: false,
            modal_edit: false,
            data_stylist: {},
            data_stylists: [],
            id_stylist: '',
            data_images: [],
        }
    }
    async componentDidMount() {
        await this.get_list_stylist();
    }
    get_list_stylist = async () => {
        try {
            let data = await get_list_stylist();
            console.log(data);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_stylists: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    get_stylist = async (id) => {
        try {
            let data = await get_stylist(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_stylist: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.data_stylist };
        copyState[id] = event.target.value;
        this.setState({
            data_stylist: {
                ...copyState
            }
        });
    }
    openForm = async (name, value, id) => {
        if (name == 'create') { this.setState({ modal_create: value }) }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ modal_detail: value, data_stylist: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_stylist(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_stylist: {} });
            } else {
                this.setState({ modal_edit: value, id_stylist: id });
                await this.get_stylist(id);
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
        let data_stylist = this.state.data_stylist;
        let data_images = this.state.data_images;
        data_stylist.images = data_images;
        let result = this.Validation(data_stylist);
        if (result.code == 0) {
            try {
                let data = await create_stylist(data_stylist);
                if (data && data.data && data.data.success == 1) {
                    toast.success('Success')
                    await this.get_list_stylist();
                    this.setState({ modal_create: false, data_stylist: {} })
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
        let result = this.Validation(this.state.data_stylist);
        if (result.code == 0) {
            try {
                let data = await edit_stylist(id, this.state.data_stylist);
                if (data && data.data && data.data.success == 1) {
                    toast.success('Success')
                    await this.get_list_stylist();
                    this.setState({ modal_edit: false, data_stylist: {} })
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
            let data = await delete_stylist(id);
            if (data && data.data && data.data.success == 1) {
                toast.success('Success')
                await this.get_list_stylist();
            } else {
                toast.error('Error')
            }
        } catch (e) {
            toast.error('System error');
        }
    }
    onChangeImage = (image) => {
        const file = image.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                let data_images = this.state.data_images;
                let obj = { value: reader.result }
                data_images.push(obj);
                this.setState({
                    data_images: data_images
                })
            };
            reader.readAsDataURL(file);
        }
    }
    handleDeleteImage = (index) => {
        let data_images = this.state.data_images;
        data_images.splice(index, 1);
        this.setState({ data_images: data_images })
    }
    render() {
        let data_stylist = this.state.data_stylist;
        let data_images = this.state.data_images;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', responsive: ['md'], width: 100,
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'IMAGE', dataIndex: 'images', responsive: ['md'], width: 120,
                render: (images) => (
                    <>
                        {images.length !== 0 ?
                            <Carousel autoplay >
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
                                    src={require(`../../../assets/images/None.jpg`).default} />
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
                    <Divider>STYLIST</Divider>
                    <Table columns={columns} dataSource={this.state.data_stylists}
                        size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
                </div >
                <Modal title="CREATE" open={this.state.modal_create}
                    okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handleCreate()}
                    onCancel={() => this.openForm("create", false)}
                    width={300}>
                    <div className="space-y-[10px]">
                        <div className='space-y-[5px]'>
                            <label>Image</label>
                            <div className='flex items-center justify-center border py-[10px] rounded-[5px]'>
                                <button ><AiOutlineDoubleLeft /></button>
                                <div className='h-[220px] w-[200px] '>
                                    <Carousel arrows autoplay dotPosition='top'>
                                        {data_images && data_images.map((item, index) => {
                                            return (
                                                <div key={index} className='flex items-center justify-center'>
                                                    <div className='text-center'>
                                                        <Image width={200} height={200} className='object-cover rounded-[5px] '
                                                            src={item.value} />
                                                        <Tooltip title="Delete">
                                                            <button onClick={() => this.handleDeleteImage(index)} className='text-white bg-red-600 px-[5px] h-[20px] rounded-[5px]'><AiFillDelete /></button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </Carousel>
                                </div>
                                <button ><AiOutlineDoubleRight /></button>
                            </div>
                        </div>
                        <div className='text-center pt-[10px]'>
                            <input id="load_file" type="file" accept="image/*" hidden
                                onChange={(image) => this.onChangeImage(image)}
                            />
                            <label htmlFor="load_file"
                                className=' border rounded-[5px] px-[10px] py-[3px] cursor-pointer shadow-md'>
                                Add image
                            </label>
                        </div>
                        <div>
                            <label>Name<span className="text-red-500"> *</span></label>
                            <Input value={data_stylist.name} placeholder="Cannot be blank"
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
                        {data_stylist && data_stylist.images && data_stylist.images.length !== 0 ?
                            <div className='space-y-[5px]'>
                                <label>Image</label>
                                <div className='flex items-center justify-center'>
                                    <button ><AiOutlineDoubleLeft /></button>
                                    <div className='h-[150px] w-[150px] '>
                                        <Carousel arrows autoplay >
                                            {data_stylist && data_stylist.images && data_stylist.images.map((item, index) => {
                                                return (
                                                    <div key={item.id} className='flex items-center justify-center'>
                                                        <Image width={150} height={150} className='object-cover rounded-[5px] '
                                                            src={item.value} />
                                                    </div>
                                                )
                                            })}
                                        </Carousel>
                                    </div>
                                    <button ><AiOutlineDoubleRight /></button>
                                </div>
                            </div>
                            :
                            <div className='flex items-center justify-center'>
                                <Image width={150} height={150} className='object-cover rounded-[5px] '
                                    src={require(`../../../assets/images/None.jpg`).default} />
                            </div>
                        }
                        <div>
                            <label>Name<span></span></label>
                            <Input value={data_stylist.name} disabled />
                        </div>
                    </div>
                </Modal>

                <Modal title="EDIT" open={this.state.modal_edit} okText={"CONFIRM"}
                    okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handleEdit(this.state.id_stylist)}
                    onCancel={() => this.openForm("edit", false, null)}
                    width={300}>
                    <div className="space-y-[10px]">
                        <div>
                            <label>Name<span className="text-red-500"> *</span></label>
                            <Input value={data_stylist.name}
                                onChange={(event) => this.handleOnchangeInput(event, "name")} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(stylist);