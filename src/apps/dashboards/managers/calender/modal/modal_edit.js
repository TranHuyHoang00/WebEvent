import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiFillDelete } from "react-icons/ai";
import { Image, Divider, Carousel, Modal, Input, Tooltip } from 'antd';
import { get_list_user, get_user } from '../../../../../services/user_services';
import { get_brand, edit_brand } from '../../../../../services/brand_services';
import { edit_stylist, get_stylist } from '../../../../../services/stylist_services';
import { edit_makeup_hair, get_makeup_hair } from '../../../../../services/makeup_hair_services';
import { get_charge_of, edit_charge_of } from '../../../../../services/charge_of_services';
import { get_time_location, edit_time_location } from '../../../../../services/time_location_services';
import { edit_schedule } from '../../../../../services/schedule_services';
import moment from 'moment';

class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {},
            data_users: [],
            data_brand: {},
            data_stylist: {},
            data_images_stylist: [],
            is_update_stylist: false,

            data_makeup_hair: {},
            data_images_makeup_hair: [],
            is_update_makeup_hair: false,

            data_charge_of: {},
            data_time_location: {},

            data_schedule: {},
            id_schedule: '',
        }
    }
    async componentDidMount() {
        this.setState({
            data_schedule: this.props.data_schedule,
            id_schedule: this.props.id_schedule,
        })
        await this.get_list_user();
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_schedule !== this.props.data_schedule) {
            let data_schedule = this.props.data_schedule;
            if (data_schedule && data_schedule.user_id) {
                await this.get_user(data_schedule.user_id);
                await this.get_brand(data_schedule.brand_id);
                await this.get_stylist(data_schedule.stylist_id);
                await this.get_makeup_hair(data_schedule.makeup_hair_id);
                await this.get_charge_of(data_schedule.charge_of_id);
                await this.get_time_location(data_schedule.time_localtion_id);
            }
            this.setState({
                data_schedule: data_schedule,
            })
        }
        if (prevProps.id_schedule !== this.props.id_schedule) {
            this.setState({
                id_schedule: this.props.id_schedule,
            })
        }
    }
    handleOnchangeInput = async (event, id) => {
        let copyState = { ...this.state.data_schedule };
        copyState[id] = event.target.value;
        this.setState({
            data_schedule: {
                ...copyState
            }
        });
        if (id == 'user_id') { await this.get_user(event.target.value); }
        if (id == 'brand_id') { await this.get_brand(event.target.value); }
        if (id == 'stylist_id') { await this.get_stylist(event.target.value); }
        if (id == 'makeup_hair_id') { await this.get_makeup_hair(event.target.value); }

        console.log(this.state.data_schedule);
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
    handleEdit = async () => {
        let data_schedule = this.state.data_schedule;
        let result = this.Validation(data_schedule);
        if (result.code == 0) {
            let result_brand = await this.editBrand(data_schedule.brand_id);
            if (result_brand == 1) { toast.error('Error Brand'); return; }
            let result_stylist = await this.editStylist(data_schedule.stylist_id);
            if (result_stylist == 1) { toast.error('Error Stylist'); return; }
            let result_makeup_hair = await this.editMakeup_hair(data_schedule.makeup_hair_id);
            if (result_makeup_hair == 1) { toast.error('Error Makeup hair'); return; }
            let result_charge_of = await this.editCharge_of(data_schedule.charge_of_id);
            if (result_charge_of == 1) { toast.error('Error Person in charge'); return; }
            let result_time_location = await this.editTime_location(data_schedule.time_localtion_id);
            if (result_time_location == 1) { toast.error('Error Time location'); return; }
            try {
                let data = await edit_schedule(this.state.id_schedule, this.state.data_schedule);
                if (data && data.data && data.data.success == 1) {
                    let type_filter = this.props.type_filter;
                    await this.props.get_list_schedule(type_filter);

                    let type_filter1 = type_filter;
                    type_filter1.type_date = 1;
                    await this.props.get_list_schedule(type_filter1);

                    toast.success('Success');
                    this.props.openForm("edit", false)
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
    format_time = (time) => {
        return moment(time).format('YYYY-MM-DDTHH:mm');
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
    editBrand = async (id) => {
        try {
            let data = await edit_brand(id, this.state.data_brand);
            if (data && data.data && data.data.success == 1) {
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    // Stylist
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
    handleOnchangeInput_Stylist = (event, id) => {
        let copyState = { ...this.state.data_stylist };
        copyState[id] = event.target.value;
        this.setState({
            is_update_stylist: true,
            data_stylist: {
                ...copyState
            }
        });
    }
    onChangeImageEdit_stylist = (image) => {
        const file = image.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                let data_images_stylist = this.state.data_images_stylist;
                let data_stylist = this.state.data_stylist;
                let obj = { value: reader.result }
                data_images_stylist.push(obj);
                data_stylist.images.push(obj);
                this.setState({
                    is_update_stylist: true,
                    data_stylist: data_stylist,
                    data_images_stylist: data_images_stylist
                })
            };
            reader.readAsDataURL(file);
        }
    }
    handleDeleteImageEdit_stylist = (index, id) => {
        let data_images_stylist = this.state.data_images_stylist;
        let data_stylist = this.state.data_stylist;
        data_stylist.images.splice(index, 1);
        if (id !== undefined) {
            if (data_stylist.delete_images) {
                data_stylist.delete_images.push(id);
            } else {
                data_stylist.delete_images = [id]
            }
        } else {
            let objectsWithoutId = data_stylist.images.filter(obj => obj.id);
            let countWithoutId = objectsWithoutId.length;
            data_images_stylist.splice(index - countWithoutId, 1);
        }
        this.setState({
            is_update_stylist: true,
            data_images_stylist: data_images_stylist,
            data_stylist: data_stylist
        })
    }
    editStylist = async (id) => {
        let data_stylist = this.state.data_stylist;
        let data_images_stylist = this.state.data_images_stylist;
        if (this.state.is_update_stylist == false) {
            return 0;
        } else {
            data_stylist.images = data_images_stylist;
            try {
                let data = await edit_stylist(id, this.state.data_stylist);
                if (data && data.data && data.data.success == 1) {
                    return 0;
                } else {
                    return 1;
                }
            } catch (e) {
                return 1;
            }
        }

    }
    // Makeup_hair
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
    handleOnchangeInput_Makeup = (event, id) => {
        let copyState = { ...this.state.data_makeup_hair };
        copyState[id] = event.target.value;
        this.setState({
            is_update_makeup_hair: true,
            data_makeup_hair: {
                ...copyState
            }
        });
    }
    onChangeImageEdit_makeup_hair = (image) => {
        const file = image.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                let data_images_makeup_hair = this.state.data_images_makeup_hair;
                let data_makeup_hair = this.state.data_makeup_hair;
                let obj = { value: reader.result }
                data_images_makeup_hair.push(obj);
                data_makeup_hair.images.push(obj);
                this.setState({
                    is_update_makeup_hair: true,
                    data_makeup_hair: data_makeup_hair,
                    data_images_makeup_hair: data_images_makeup_hair
                })
            };
            reader.readAsDataURL(file);
        }
    }
    handleDeleteImageEdit_makeup_hair = (index, id) => {
        let data_images_makeup_hair = this.state.data_images_makeup_hair;
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
            data_images_makeup_hair.splice(index - countWithoutId, 1);
        }
        this.setState({
            is_update_makeup_hair: true,
            data_images_makeup_hair: data_images_makeup_hair,
            data_makeup_hair: data_makeup_hair
        })
    }
    editMakeup_hair = async (id) => {
        let data_makeup_hair = this.state.data_makeup_hair;
        let data_images_makeup_hair = this.state.data_images_makeup_hair;
        if (this.state.is_update_makeup_hair == false) {
            return 0;
        } else {
            data_makeup_hair.images = data_images_makeup_hair;
            try {
                let data = await edit_makeup_hair(id, this.state.data_makeup_hair);
                if (data && data.data && data.data.success == 1) {
                    return 0;
                } else {
                    return 1;
                }
            } catch (e) {
                return 1;
            }
        }

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
    editCharge_of = async (id) => {
        try {
            let data = await edit_charge_of(id, this.state.data_charge_of);
            if (data && data.data && data.data.success == 1) {
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    get_charge_of = async (id) => {
        try {
            let data = await get_charge_of(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_charge_of: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    // Time_location
    editTime_location = async (id) => {
        try {
            let data = await edit_time_location(id, this.state.data_time_location);
            if (data && data.data && data.data.success == 1) {
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    handleOnchangeTime_Location = (event, id) => {
        let copyState = { ...this.state.data_time_location };
        copyState[id] = event.target.value;
        this.setState({
            data_time_location: {
                ...copyState
            }
        });
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
    render() {
        let data_users = this.state.data_users;
        let data_user = this.state.data_user;
        let data_brand = this.state.data_brand;
        let data_stylist = this.state.data_stylist;
        let data_makeup_hair = this.state.data_makeup_hair;
        let data_charge_of = this.state.data_charge_of;
        let data_time_location = this.state.data_time_location;
        let data_schedule = this.state.data_schedule;
        return (
            <>
                <Modal title={`EDIT A SCHEDULE FOR DATE: ${this.props.date_select}`} open={this.props.modal_edit}
                    okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handleEdit()}
                    onCancel={() => this.props.openForm("edit", false)}
                    width={400}>
                    <div className="space-y-[15px]">
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>ARTIST</Divider>
                            <label>NAME ARTIST</label>
                            <select value={data_schedule.user_id}
                                onChange={(event) => this.handleOnchangeInput(event, 'user_id')}
                                className='w-full border p-[5px] rounded-[5px]'>
                                <option></option>
                                {data_users && data_users.map((item, index) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.fullname}</option>
                                    )
                                })}
                            </select>
                            {data_user.id &&
                                <div className='flex items-center justify-center'>
                                    <Image width={150} height={150}
                                        className=' object-cover rounded-full'
                                        src={(data_user.avatar == "" || data_user.avatar == null) ? require(`../../../../../assets/images/None.jpg`).default : data_user.avatar} />
                                </div>
                            }
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>BRAND</Divider>
                            <label>NAME BRAND</label>
                            <div>
                                <label>Name<span className="text-red-500"> *</span></label>
                                <Input value={data_brand.name}
                                    onChange={(event) => this.handleOnchangeBrand(event, "name")} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>STYLIST</Divider>
                            <div className='space-y-[5px]'>
                                <label>Image</label>
                                <div className='flex items-center justify-center'>
                                    <button ><AiOutlineDoubleLeft /></button>
                                    <div className='h-[170px] w-[150px] '>
                                        <Carousel arrows autoplay dotPosition='top'>
                                            {data_stylist && data_stylist.images && data_stylist.images.map((item, index) => {
                                                return (
                                                    <div key={index} className='flex items-center justify-center'>
                                                        <div className='text-center'>
                                                            <Image width={150} height={150} className='object-cover rounded-[5px] '
                                                                src={item.value} />
                                                            <Tooltip title="Delete">
                                                                <button onClick={() => this.handleDeleteImageEdit_stylist(index, item.id)} className='text-white bg-red-600 px-[5px] h-[20px] rounded-[5px]'><AiFillDelete /></button>
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
                                    onChange={(image) => this.onChangeImageEdit_stylist(image)}
                                />
                                <label htmlFor="load_file"
                                    className=' border rounded-[5px] px-[10px] py-[3px] cursor-pointer shadow-md'>
                                    Add image
                                </label>
                            </div>
                            <div>
                                <label>Name<span className="text-red-500"> *</span></label>
                                <Input value={data_stylist.name}
                                    onChange={(event) => this.handleOnchangeInput_Stylist(event, "name")} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>MAKE UP_HAIR</Divider>
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
                                                                <button onClick={() => this.handleDeleteImageEdit_makeup_hair(index, item.id)} className='text-white bg-red-600 px-[5px] h-[20px] rounded-[5px]'><AiFillDelete /></button>
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
                                    onChange={(image) => this.onChangeImageEdit_makeup_hair(image)}
                                />
                                <label htmlFor="load_file1"
                                    className=' border rounded-[5px] px-[10px] py-[3px] cursor-pointer shadow-md'>
                                    Add image
                                </label>
                            </div>
                            <div>
                                <label>MAKE UP<span className="text-red-500"> *</span></label>
                                <Input value={data_makeup_hair.make_up}
                                    onChange={(event) => this.handleOnchangeInput_Makeup(event, "make_up")} />
                            </div>
                            <div>
                                <label>MAKE HAIR<span className="text-red-500"> *</span></label>
                                <Input value={data_makeup_hair.make_hair}
                                    onChange={(event) => this.handleOnchangeInput_Makeup(event, "make_hair")} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>PERSON IN CHARGE</Divider>
                            <div>
                                <label>Name<span className="text-red-500"> *</span></label>
                                <Input placeholder="Cannot be blank" value={data_charge_of && data_charge_of.name}
                                    onChange={(event) => this.handleOnchangeChargeOf(event, "name")} />
                            </div>
                            <div>
                                <label>Phone<span className="text-red-500"> *</span></label>
                                <Input placeholder="Cannot be blank" value={data_charge_of && data_charge_of.phone}
                                    onChange={(event) => this.handleOnchangeChargeOf(event, "phone")} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>TIME_LOCATION</Divider>
                            <div>
                                <label>Show date<span className="text-red-500"> *</span></label><br />
                                <input type='date' value={data_time_location && data_time_location.show_date} disabled
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'show_date')}
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Show time<span className="text-red-500"> *</span></label><br />
                                <input type='time' value={data_time_location && data_time_location.show_time}
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'show_time')}
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Leave time<span className="text-red-500"> *</span></label><br />
                                <input type='time' value={data_time_location && data_time_location.leave_time}
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'leave_time')}
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Makeup time<span className="text-red-500"> *</span></label><br />
                                <input type='time' value={data_time_location && data_time_location.make_up_time}
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'make_up_time')}
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Show localtion<span className="text-red-500"> *</span></label><br />
                                <Input placeholder='Cannot be blank' value={data_time_location && data_time_location.show_localtion}
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'show_localtion')} />
                            </div>
                            <div>
                                <label>Agency name<span className="text-red-500"> *</span></label><br />
                                <Input placeholder='Cannot be blank' value={data_time_location && data_time_location.agency_name}
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'agency_name')} />
                            </div>
                            <div>
                                <label>Contact<span className="text-red-500"> *</span></label><br />
                                <Input placeholder='Cannot be blank' value={data_time_location && data_time_location.contact}
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'contact')} />
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(modal_edit);
