import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiFillDelete } from "react-icons/ai";
import { Image, Divider, Carousel, Modal, Input, Tooltip } from 'antd';
import { get_list_user, get_user } from '../../../../../services/user_services';
import { create_brand } from '../../../../../services/brand_services';
import { create_stylist } from '../../../../../services/stylist_services';
import { create_makeup_hair } from '../../../../../services/makeup_hair_services';
import { create_charge_of } from '../../../../../services/charge_of_services';
import { create_time_location, } from '../../../../../services/time_location_services';
import { create_schedule } from '../../../../../services/schedule_services';

class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {},
            data_users: [],
            data_brand: {},
            data_stylist: {},
            data_images_stylist: [],
            data_makeup_hair: {},
            data_images_makeup_hair: [],
            data_charge_of: {},
            data_time_location: {},
            data_schedule: {},
        }
    }
    async componentDidMount() {
        this.setState({
            data_time_location: {
                ...this.state.data_time_location,
                show_date: this.props.date_select,
            }
        })
        await this.get_list_user();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.date_select !== this.props.date_select) {
            this.setState({
                data_time_location: {
                    ...this.state.data_time_location,
                    show_date: this.props.date_select,
                }
            })
        }
    }
    // Schedule
    handleOnchangeInput = async (event, id) => {
        let copyState = { ...this.state.data_schedule };
        copyState[id] = event.target.value;
        this.setState({
            data_schedule: {
                ...copyState
            }
        });
        if (id == 'user_id') { await this.get_user(event.target.value); }
        if (id == 'makeup_hair_id') { await this.get_makeup_hair(event.target.value); }

    }
    validatephone_numberNumber = (phone_number) => {
        const re = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;
        return re.test(phone_number);
    }
    Validation = (data) => {
        if (!data.user_id) {
            return { mess: "Please select Artist", code: 1 };
        }
        let data_brand = this.state.data_brand;
        if (!data_brand.name) {
            return { mess: "Name of brand cannot be blank", code: 1 };
        }
        let data_stylist = this.state.data_stylist;
        if (!data_stylist.name) {
            return { mess: "Name of stylist cannot be blank", code: 1 };
        }
        let data_makeup_hair = this.state.data_makeup_hair;
        if (!data_makeup_hair.make_up) {
            return { mess: "Make up  cannot be blank", code: 1 };
        }
        if (!data_makeup_hair.make_hair) {
            return { mess: "Make hair cannot be blank", code: 1 };
        }
        let data_charge_of = this.state.data_charge_of;
        if (!data_charge_of.name) {
            return { mess: "Name of Person in charge cannot be blank ", code: 1 };
        }
        if (!data_charge_of.phone) {
            return { mess: "Phone of Person in charge cannot be blank ", code: 1 };
        }
        if (!this.validatephone_numberNumber(data_charge_of.phone)) {
            return { mess: "Phone of Person in charge wrong format", code: 1 };
        }
        let data_time_location = this.state.data_time_location;
        if (!data_time_location.show_date) {
            return { mess: "Show date cannot be blank", code: 1 };
        }
        if (!data_time_location.show_time) {
            return { mess: "Show time cannot be blank", code: 1 };
        }
        if (!data_time_location.leave_time) {
            return { mess: "Leave time cannot be blank", code: 1 };
        }
        if (!data_time_location.show_localtion) {
            return { mess: "Show localtion time cannot be blank", code: 1 };
        }
        if (!data_time_location.agency_name) {
            return { mess: "Agency name time cannot be blank", code: 1 };
        }
        if (!data_time_location.contact) {
            return { mess: "Contact time cannot be blank", code: 1 };
        }
        if (!this.validatephone_numberNumber(data_time_location.contact)) {
            return { mess: "Contact wrong format", code: 1 };
        }
        return { code: 0 };
    }
    handleCreate = async () => {
        let result = this.Validation(this.state.data_schedule);
        if (result.code == 0) {
            let result_brand = await this.createBrand();
            if (result_brand == 1) { toast.error('Error Brand'); return; }
            let result_stylist = await this.createStylist();
            if (result_stylist == 1) { toast.error('Error Stylist'); return; }
            let result_makeup_hair = await this.createMakeup_hair();
            if (result_makeup_hair == 1) { toast.error('Error Makeup hair'); return; }
            let result_charge_of = await this.createCharge_of();
            if (result_charge_of == 1) { toast.error('Error Person in charge'); return; }
            let result_time_location = await this.createTime_location();
            if (result_time_location == 1) { toast.error('Error Time location'); return; }
            try {
                let data = await create_schedule(this.state.data_schedule);
                if (data && data.data && data.data.success == 1) {
                    let type_filter = this.props.type_filter;
                    await this.props.get_list_schedule(type_filter);

                    let type_filter1 = type_filter;
                    type_filter1.type_date = 1;
                    await this.props.get_list_schedule(type_filter1);

                    toast.success('Success')
                    this.setState({ data_schedule: {}, data_brand: {}, data_stylist: {}, data_makeup_hair: {}, data_charge_of: {}, data_time_location: {} })
                    this.props.openForm("create", false)
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
    // User
    get_list_user = async () => {
        try {
            let data = await get_list_user();
            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                let data_filter = data_raw.filter(obj => obj.role.name == 'Artist');
                this.setState({ data_users: data_filter })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    get_user = async (id) => {
        try {
            let data = await get_user(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_user: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    // Brand
    handleOnchangeBrand = (event, id) => {
        let copyState = { ...this.state.data_brand };
        copyState[id] = event.target.value;
        this.setState({
            data_brand: {
                ...copyState
            }
        });
    }
    createBrand = async () => {
        try {
            let data = await create_brand(this.state.data_brand);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_schedule: {
                        ...this.state.data_schedule,
                        brand_id: data.data.data.id
                    }
                })
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    // Stylist
    createStylist = async () => {
        let data_stylist = this.state.data_stylist;
        let data_images_stylist = this.state.data_images_stylist;
        data_stylist.images = data_images_stylist;
        try {
            let data = await create_stylist(data_stylist);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_schedule: {
                        ...this.state.data_schedule,
                        stylist_id: data.data.data.id
                    }
                })
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    onChangeImage_stylist = (image) => {
        const file = image.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                let data_images_stylist = this.state.data_images_stylist;
                let obj = { value: reader.result }
                data_images_stylist.push(obj);
                this.setState({
                    data_images_stylist: data_images_stylist
                })
            };
            reader.readAsDataURL(file);
        }
    }
    handleDeleteImage_stylist = (index) => {
        let data_images_stylist = this.state.data_images_stylist;
        data_images_stylist.splice(index, 1);
        this.setState({ data_images_stylist: data_images_stylist })
    }
    handleOnchangeInput_Stylist = (event, id) => {
        let copyState = { ...this.state.data_stylist };
        copyState[id] = event.target.value;
        this.setState({
            is_update: true,
            data_stylist: {
                ...copyState
            }
        });
    }
    // Makeup_hair
    createMakeup_hair = async () => {
        let data_makeup_hair = this.state.data_makeup_hair;
        let data_images_makeup_hair = this.state.data_images_makeup_hair;
        data_makeup_hair.images = data_images_makeup_hair;
        try {
            let data = await create_makeup_hair(data_makeup_hair);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_schedule: {
                        ...this.state.data_schedule,
                        makeup_hair_id: data.data.data.id
                    }
                })
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    onChangeImage_makeup = (image) => {
        const file = image.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                let data_images_makeup_hair = this.state.data_images_makeup_hair;
                let obj = { value: reader.result }
                data_images_makeup_hair.push(obj);
                this.setState({
                    data_images_makeup_hair: data_images_makeup_hair
                })
            };
            reader.readAsDataURL(file);
        }
    }
    handleDeleteImage_makeup = (index) => {
        let data_images_makeup_hair = this.state.data_images_makeup_hair;
        data_images_makeup_hair.splice(index, 1);
        this.setState({ data_images_makeup_hair: data_images_makeup_hair })
    }
    handleOnchangeInput_Makeup = (event, id) => {
        let copyState = { ...this.state.data_makeup_hair };
        copyState[id] = event.target.value;
        this.setState({
            is_update: true,
            data_makeup_hair: {
                ...copyState
            }
        });
    }
    // Charge_of
    handleOnchangeChargeOf = (event, id) => {
        let copyState = { ...this.state.data_charge_of };
        copyState[id] = event.target.value;
        this.setState({
            data_charge_of: {
                ...copyState
            }
        });
    }
    createCharge_of = async () => {
        try {
            let data = await create_charge_of(this.state.data_charge_of);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_schedule: {
                        ...this.state.data_schedule,
                        charge_of_id: data.data.data.id
                    }
                })
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    // Time_location
    handleOnchangeTime_Location = (event, id) => {
        let copyState = { ...this.state.data_time_location };
        copyState[id] = event.target.value;
        this.setState({
            data_time_location: {
                ...copyState
            }
        });
    }
    createTime_location = async () => {
        try {
            let data = await create_time_location(this.state.data_time_location);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_schedule: {
                        ...this.state.data_schedule,
                        time_localtion_id: data.data.data.id
                    }
                })
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    render() {
        let data_users = this.state.data_users;
        let data_user = this.state.data_user;
        let data_brand = this.state.data_brand;
        let data_stylist = this.state.data_stylist;
        let data_images_stylist = this.state.data_images_stylist;
        let data_makeup_hair = this.state.data_makeup_hair;
        let data_images_makeup_hair = this.state.data_images_makeup_hair;
        let data_schedule = this.state.data_schedule;
        let data_charge_of = this.state.data_charge_of;
        return (
            <>
                <Modal title={`CREATE A SCHEDULE FOR DATE: ${this.props.date_select}`} open={this.props.modal_create}
                    okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handleCreate()}
                    onCancel={() => this.props.openForm("create", false)}
                    width={400}>
                    <div className="space-y-[15px]">
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>ARTIST</Divider>
                            <label>NAME</label>
                            <select
                                onChange={(event) => this.handleOnchangeInput(event, 'user_id')}
                                className='w-full border p-[5px] rounded-[5px]'>
                                <option value={0}></option>
                                {data_users && data_users.map((item, index) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.fullname}</option>
                                    )
                                })}
                            </select>
                            {data_user.id && data_schedule.user_id !== '0' &&
                                <div div className='flex items-center justify-center'>
                                    <Image width={150} height={150}
                                        className=' object-cover rounded-full'
                                        src={(data_user.avatar == "" || data_user.avatar == null) ? require(`../../../../../assets/images/None.jpg`).default : data_user.avatar} />
                                </div>
                            }
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>BRAND</Divider>
                            <div>
                                <label>Name<span className="text-red-500"> *</span></label>
                                <Input value={data_brand.name} placeholder="Cannot be blank"
                                    onChange={(event) => this.handleOnchangeBrand(event, "name")} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>STYLIST</Divider>
                            <div className="space-y-[10px]">
                                <div className='space-y-[5px]'>
                                    <label>Image</label>
                                    <div className='flex items-center justify-center'>
                                        <button ><AiOutlineDoubleLeft /></button>
                                        <div className='h-[170px] w-[150px] '>
                                            <Carousel arrows autoplay dotPosition='top'>
                                                {data_images_stylist && data_images_stylist.map((item, index) => {
                                                    return (
                                                        <div key={index} className='flex items-center justify-center'>
                                                            <div className='text-center'>
                                                                <Image width={150} height={150} className='object-cover rounded-[5px] '
                                                                    src={item.value} />
                                                                <Tooltip title="Delete">
                                                                    <button onClick={() => this.handleDeleteImage_stylist(index)} className='text-white bg-red-600 px-[5px] h-[20px] rounded-[5px]'><AiFillDelete /></button>
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
                                        onChange={(image) => this.onChangeImage_stylist(image)}
                                    />
                                    <label htmlFor="load_file"
                                        className=' border rounded-[5px] px-[10px] py-[3px] cursor-pointer shadow-md'>
                                        Add image
                                    </label>
                                </div>
                                <div>
                                    <label>Name<span className="text-red-500"> *</span></label>
                                    <Input value={data_stylist.name} placeholder="Cannot be blank"
                                        onChange={(event) => this.handleOnchangeInput_Stylist(event, "name")} />
                                </div>
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>MAKE UP_HAIR</Divider>
                            <div className="space-y-[10px]">
                                <div className='space-y-[5px]'>
                                    <label>Image</label>
                                    <div className='flex items-center justify-center'>
                                        <button ><AiOutlineDoubleLeft /></button>
                                        <div className='h-[170px] w-[150px] '>
                                            <Carousel arrows autoplay dotPosition='top'>
                                                {data_images_makeup_hair && data_images_makeup_hair.map((item, index) => {
                                                    return (
                                                        <div key={index} className='flex items-center justify-center'>
                                                            <div className='text-center border'>
                                                                <Image width={150} height={150} className='object-cover rounded-[5px]'
                                                                    src={item.value} />
                                                                <Tooltip title="Delete">
                                                                    <button onClick={() => this.handleDeleteImage_makeup(index)} className='text-white bg-red-600 px-[5px] h-[20px] rounded-[5px]'><AiFillDelete /></button>
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
                                    <input id="load_file1" type="file" accept="image/*" hidden
                                        onChange={(image) => this.onChangeImage_makeup(image)}
                                    />
                                    <label htmlFor="load_file1"
                                        className=' border rounded-[5px] px-[10px] py-[3px] cursor-pointer shadow-md'>
                                        Add image
                                    </label>
                                </div>
                                <div>
                                    <label>Make up<span className="text-red-500"> *</span></label>
                                    <Input value={data_makeup_hair.make_up} placeholder="Make up cannot be blank"
                                        onChange={(event) => this.handleOnchangeInput_Makeup(event, "make_up")} />
                                </div>
                                <div>
                                    <label>Make hair<span className="text-red-500"> *</span></label>
                                    <Input value={data_makeup_hair.make_hair} placeholder="Make hair cannot be blank"
                                        onChange={(event) => this.handleOnchangeInput_Makeup(event, "make_hair")} />
                                </div>
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>PERSON IN CHARGE</Divider>
                            <div>
                                <label>Name<span className="text-red-500"> *</span></label>
                                <Input value={data_charge_of.name}
                                    placeholder="Cannot be blank"
                                    onChange={(event) => this.handleOnchangeChargeOf(event, "name")} />
                            </div>
                            <div>
                                <label>Phone<span className="text-red-500"> *</span></label><br />
                                <Input placeholder='Cannot be blank' value={data_charge_of.phone}
                                    onChange={(event) => this.handleOnchangeChargeOf(event, 'phone')} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>TIME_LOCATION</Divider>
                            <div>
                                <label>Show date<span className="text-red-500"> *</span></label><br />
                                <input type='date' value={this.state.data_time_location.show_date} disabled
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'show_date')}
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Show time<span className="text-red-500"> *</span></label><br />
                                <input type='time'
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'show_time')}
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Leave time<span className="text-red-500"> *</span></label><br />
                                <input type='time'
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'leave_time')}
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Makeup time<span className="text-red-500"> *</span></label><br />
                                <input type='time'
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'make_up_time')}
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Show localtion<span className="text-red-500"> *</span></label><br />
                                <Input placeholder='Cannot be blank'
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'show_localtion')} />
                            </div>
                            <div>
                                <label>Agency name<span className="text-red-500"> *</span></label><br />
                                <Input placeholder='Cannot be blank'
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'agency_name')} />
                            </div>
                            <div>
                                <label>Contact<span className="text-red-500"> *</span></label><br />
                                <Input placeholder='Cannot be blank'
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'contact')} />
                            </div>
                        </div>
                    </div>
                </Modal >
            </>
        );
    }

}
export default withRouter(modal_create);
