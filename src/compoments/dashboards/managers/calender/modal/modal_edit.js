import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Image, Divider, Carousel, Modal, Input } from 'antd';
import { get_list_user, get_user } from '../../../../../services/user_services';
import { get_list_brand, get_brand } from '../../../../../services/brand_services';
import { get_list_stylist, get_stylist } from '../../../../../services/stylist_services';
import { get_list_makeup_hair, get_makeup_hair } from '../../../../../services/makeup_hair_services';
import { get_charge_of, edit_charge_of } from '../../../../../services/charge_of_services';
import { get_time_location, create_time_location, edit_time_location } from '../../../../../services/time_location_services';
import { create_schedule, edit_schedule } from '../../../../../services/schedule_services';

class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {},
            data_users: [],
            data_brand: {},
            data_brands: [],
            data_stylist: {},
            data_stylists: [],
            data_makeup_hair: {},
            data_makeup_hairs: [],
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
        await this.get_list_brand();
        await this.get_list_stylist();
        await this.get_list_makeup_hair();
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
    get_list_brand = async () => {
        try {
            let data = await get_list_brand();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_brands: data.data.data })
            }
        } catch (e) {
            console.log('Error', e);
        }
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
    get_list_stylist = async () => {
        try {
            let data = await get_list_stylist();
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
    handleOnchangeChargeOf = (event, id) => {
        let copyState = { ...this.state.data_charge_of };
        copyState[id] = event.target.value;
        this.setState({
            data_charge_of: {
                ...copyState
            }
        });
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
    validatephone_numberNumber = (phone_number) => {
        const re = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;
        return re.test(phone_number);
    }

    Validation = (data) => {
        if (!data.user_id) {
            return { mess: "Please select Artist", code: 1 };
        }
        if (!data.brand_id) {
            return { mess: "Please select Brand", code: 1 };
        }
        if (!data.stylist_id) {
            return { mess: "Please select Stylist", code: 1 };
        }
        if (!data.makeup_hair_id) {
            return { mess: "Please select Makeup_hair", code: 1 };
        }
        let data_charge_of = this.state.data_charge_of;
        if (!data_charge_of.name) {
            return { mess: "Name of Person in charge cannot be blank ", code: 1 };
        }
        let data_time_location = this.state.data_time_location;
        let show_time = new Date(data_time_location.show_time);
        let leave_time = new Date(data_time_location.leave_time);
        let make_up_time = new Date(data_time_location.make_up_time);
        if (!data_time_location.show_date) {
            return { mess: "Show date cannot be blank", code: 1 };
        }
        if (!data_time_location.show_time) {
            return { mess: "Show time cannot be blank", code: 1 };
        }
        if (!data_time_location.leave_time) {
            return { mess: "Leave time cannot be blank", code: 1 };
        }
        if (show_time >= leave_time) {
            return { mess: "Leave time must be greater than Show time", code: 1 };
        }
        if (!data_time_location.make_up_time) {
            return { mess: "Makeup time cannot be blank", code: 1 };
        }
        if (make_up_time >= show_time) {
            return { mess: "Show time must be greater than Makeup time", code: 1 };
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
    handleEdit = async () => {
        let data_schedule = this.state.data_schedule;
        let result = this.Validation(data_schedule);
        if (result.code == 0) {
            try {
                let charge_of = await this.editCharge_of(data_schedule.charge_of_id);
                if (charge_of == 0) {
                    let time_location = await this.editTime_location(data_schedule.time_localtion_id);
                    if (time_location == 0) {
                        let data = await edit_schedule(this.state.id_schedule, this.state.data_schedule);
                        console.log(data);
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
                    } else {
                        toast.error('Error Time location')
                    }
                } else {
                    toast.error('Person in charge already exists')
                }
            } catch (e) {
                toast.error('System Error');
            }
        } else {
            toast.error(result.mess);
        }
    }
    render() {
        let data_users = this.state.data_users;
        let data_user = this.state.data_user;
        let data_brands = this.state.data_brands;
        let data_stylists = this.state.data_stylists;
        let data_stylist = this.state.data_stylist;
        let data_makeup_hairs = this.state.data_makeup_hairs;
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
                            <select value={data_schedule.brand_id}
                                onChange={(event) => this.handleOnchangeInput(event, 'brand_id')}
                                className='w-full border p-[5px] rounded-[5px]'>
                                <option></option>
                                {data_brands && data_brands.map((item, index) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>STYLIST</Divider>
                            <label>NAME STYLIST</label>
                            <select value={data_schedule.stylist_id}
                                onChange={(event) => this.handleOnchangeInput(event, 'stylist_id')}
                                className='w-full border p-[5px] rounded-[5px]'>
                                <option></option>
                                {data_stylists && data_stylists.map((item, index) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                            {data_stylist.id &&
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
                            }
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>MAKE UP_HAIR</Divider>
                            <label>NAME MAKE UP_HAIR</label>
                            <select value={data_schedule.makeup_hair_id}
                                onChange={(event) => this.handleOnchangeInput(event, 'makeup_hair_id')}
                                className='w-full border p-[5px] rounded-[5px]'>
                                <option></option>
                                {data_makeup_hairs && data_makeup_hairs.map((item, index) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.make_up}-{item.make_hair}</option>
                                    )
                                })}
                            </select>
                            {data_makeup_hair.id &&
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
                            }
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>PERSON IN CHARGE</Divider>
                            <div>
                                <label>Name<span className="text-red-500"> *</span></label>
                                <Input placeholder="Cannot be blank" value={data_charge_of && data_charge_of.name}
                                    onChange={(event) => this.handleOnchangeChargeOf(event, "name")} />
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
                                <input type='datetime-local' value={data_time_location && data_time_location.show_time}
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'show_time')}
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Leave time<span className="text-red-500"> *</span></label><br />
                                <input type='datetime-local' value={data_time_location && data_time_location.leave_time}
                                    onChange={(event) => this.handleOnchangeTime_Location(event, 'leave_time')}
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Makeup time<span className="text-red-500"> *</span></label><br />
                                <input type='datetime-local' value={data_time_location && data_time_location.make_up_time}
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
