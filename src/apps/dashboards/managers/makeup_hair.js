import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Space, Modal, Divider, Button, Input, Popconfirm, Tooltip, Image, Carousel, } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye, AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { get_list_makeup_hair, create_makeup_hair, get_makeup_hair, delete_makeup_hair, edit_makeup_hair } from '../../../services/makeup_hair_services';
class makeup_hair extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_create: false,
            modal_detail: false,
            modal_edit: false,
            data_makeup_hair: {},
            data_makeup_hairs: [],
            id_makeup_hair: '',
            data_images: [],
            is_update: false,
        }
    }
    async componentDidMount() {
        await this.get_list_makeup_hair();
    }
    get_list_makeup_hair = async () => {
        try {
            let data = await get_list_makeup_hair();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_makeup_hairs: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    get_makeup_hair = async (id) => {
        try {
            let data = await get_makeup_hair(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_makeup_hair: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.data_makeup_hair };
        copyState[id] = event.target.value;
        this.setState({
            is_update: true,
            data_makeup_hair: {
                ...copyState
            }
        });
    }
    openForm = async (name, value, id) => {
        if (name == 'create') { this.setState({ modal_create: value }) }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ modal_detail: value, data_makeup_hair: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_makeup_hair(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_makeup_hair: {}, is_update: false });
            } else {
                this.setState({ modal_edit: value, id_makeup_hair: id, is_update: false });
                await this.get_makeup_hair(id);
            }
        }
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    Validation = (data) => {
        if (!data.make_up) {
            return { mess: "Make up cannot be blank", code: 1 };
        }
        if (!data.make_hair) {
            return { mess: "Make hair cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handleCreate = async () => {
        let data_makeup_hair = this.state.data_makeup_hair;
        let data_images = this.state.data_images;
        data_makeup_hair.images = data_images;
        let result = this.Validation(data_makeup_hair);
        if (result.code == 0) {
            try {
                let data = await create_makeup_hair(data_makeup_hair);
                if (data && data.data && data.data.success == 1) {
                    toast.success('Success')
                    await this.get_list_makeup_hair();
                    this.setState({ data_makeup_hair: {}, modal_create: false, data_images: [] })

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
        let data_makeup_hair = this.state.data_makeup_hair;
        let data_images = this.state.data_images;
        if (this.state.is_update == false) {
            toast.success('Success')
            this.setState({ modal_edit: false, data_makeup_hair: {} })
        } else {
            data_makeup_hair.images = data_images;
            let result = this.Validation(data_makeup_hair);
            if (result.code == 0) {
                try {
                    let data = await edit_makeup_hair(id, data_makeup_hair);
                    if (data && data.data && data.data.success == 1) {
                        toast.success('Success')
                        await this.get_list_makeup_hair();
                        this.setState({ modal_edit: false, data_makeup_hair: {}, data_images: [] })
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

    }
    handleDelete = async (id) => {
        try {
            let data = await delete_makeup_hair(id);
            if (data && data.data && data.data.success == 1) {
                toast.success('Success')
                await this.get_list_makeup_hair();
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
    onChangeImageEdit = (image) => {
        const file = image.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                let data_images = this.state.data_images;
                let data_makeup_hair = this.state.data_makeup_hair;
                let obj = { value: reader.result }
                data_images.push(obj);
                data_makeup_hair.images.push(obj);
                this.setState({
                    is_update: true,
                    data_makeup_hair: data_makeup_hair,
                    data_images: data_images
                })
            };
            reader.readAsDataURL(file);
        }
    }
    handleDeleteImageEdit = (index, id) => {
        let data_images = this.state.data_images;
        let data_makeup_hair = this.state.data_makeup_hair;

        data_makeup_hair.images.splice(index, 1);
        if (id !== undefined) {

            if (data_makeup_hair.delete_images) {
                data_makeup_hair.delete_images.push(id);
            } else {
                data_makeup_hair.delete_images = [id]
            }
        } else {
            let objectsWithoutId = data_makeup_hair.images.filter(obj => obj.id);
            let countWithoutId = objectsWithoutId.length;
            data_images.splice(index - countWithoutId, 1);
        }
        this.setState({
            is_update: true,
            data_images: data_images,
            data_makeup_hair: data_makeup_hair
        })
    }
    render() {
        let data_makeup_hair = this.state.data_makeup_hair;
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
                title: 'MAKE UP', dataIndex: 'make_up',
                sorter: (a, b) => a.make_up.localeCompare(b.make_up),
            },
            {
                title: 'MAKE HAIR', dataIndex: 'make_hair',
                sorter: (a, b) => a.make_hair.localeCompare(b.make_hair),
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
                    <Divider>MAKEUP HAIR</Divider>
                    <Table columns={columns} dataSource={this.state.data_makeup_hairs}
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
                            <div className='flex items-center justify-center'>
                                <button ><AiOutlineDoubleLeft /></button>
                                <div className='h-[170px] w-[150px] '>
                                    <Carousel arrows autoplay dotPosition='top'>
                                        {data_images && data_images.map((item, index) => {
                                            return (
                                                <div key={index} className='flex items-center justify-center'>
                                                    <div className='text-center border'>
                                                        <Image width={150} height={150} className='object-cover rounded-[5px]'
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
                            <label>Make up<span className="text-red-500"> *</span></label>
                            <Input value={data_makeup_hair.make_up} placeholder="Make up cannot be blank"
                                onChange={(event) => this.handleOnchangeInput(event, "make_up")} />
                        </div>
                        <div>
                            <label>Make hair<span className="text-red-500"> *</span></label>
                            <Input value={data_makeup_hair.make_hair} placeholder="Make hair cannot be blank"
                                onChange={(event) => this.handleOnchangeInput(event, "make_hair")} />
                        </div>
                    </div>
                </Modal>
                <Modal title="DETAIL" open={this.state.modal_detail}
                    okText={"EXIT"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.openForm("detail", false, null)}
                    onCancel={() => this.openForm("detail", false, null)}
                    width={300}>
                    <div className="space-y-[10px]">
                        {data_makeup_hair && data_makeup_hair.images && data_makeup_hair.images.length !== 0 ?
                            <div className='space-y-[5px]'>
                                <label>Image</label>
                                <div className='flex items-center justify-center'>
                                    <button ><AiOutlineDoubleLeft /></button>
                                    <div className='h-[150px] w-[150px] '>
                                        <Carousel arrows autoplay >
                                            {data_makeup_hair && data_makeup_hair.images && data_makeup_hair.images.map((item, index) => {
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
                            <label>Make up<span></span></label>
                            <input value={data_makeup_hair.make_up} disabled className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                        <div>
                            <label>Make hair<span></span></label>
                            <input value={data_makeup_hair.make_hair} disabled className='border w-full rounded-[5px] p-[5px]' />
                        </div>
                    </div>
                </Modal>

                <Modal title="EDIT" open={this.state.modal_edit} okText={"CONFIRM"}
                    okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handleEdit(this.state.id_makeup_hair)}
                    onCancel={() => this.openForm("edit", false, null)}
                    width={300}>
                    <div className="space-y-[10px]">
                        <div className='space-y-[5px]'>
                            <label>Image</label>
                            <div className='flex items-center justify-center'>
                                <button ><AiOutlineDoubleLeft /></button>
                                <div className='h-[170px] w-[150px] '>
                                    <Carousel arrows autoplay dotPosition='top'>
                                        {data_makeup_hair && data_makeup_hair.images && data_makeup_hair.images.map((item, index) => {
                                            return (
                                                <div key={index} className='flex items-center justify-center'>
                                                    <div className='text-center'>
                                                        <Image width={150} height={150} className='object-cover rounded-[5px] '
                                                            src={item.value} />
                                                        <Tooltip title="Delete">
                                                            <button onClick={() => this.handleDeleteImageEdit(index, item.id)} className='text-white bg-red-600 px-[5px] h-[20px] rounded-[5px]'><AiFillDelete /></button>
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
                                onChange={(image) => this.onChangeImageEdit(image)}
                            />
                            <label htmlFor="load_file"
                                className=' border rounded-[5px] px-[10px] py-[3px] cursor-pointer shadow-md'>
                                Add image
                            </label>
                        </div>
                        <div>
                            <label>MAKE UP<span className="text-red-500"> *</span></label>
                            <Input value={data_makeup_hair.make_up}
                                onChange={(event) => this.handleOnchangeInput(event, "make_up")} />
                        </div>
                        <div>
                            <label>MAKE HAIR<span className="text-red-500"> *</span></label>
                            <Input value={data_makeup_hair.make_hair}
                                onChange={(event) => this.handleOnchangeInput(event, "make_hair")} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(makeup_hair);