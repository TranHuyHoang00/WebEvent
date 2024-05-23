import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiFillDelete } from "react-icons/ai";
import { Image, Divider, Carousel, Modal, Space, message, Typography, Select, Button, Spin } from 'antd';
import { create_brand } from '@services/brand_services';
import { create_stylist } from '@services/stylist_services';
import { create_makeup_hair } from '@services/makeup_hair_services';
import { create_charge_of } from '@services/charge_of_services';
import { create_time_location, } from '@services/time_location_services';
import { create_schedule } from '@services/schedule_services';
import { image_to_base64 } from '@utils/base64';
import FormInput from '@components/inputs/form_input';
import FormTextare from '@components/inputs/form_textare';
import dayjs from 'dayjs';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
        }
    }
    async componentDidMount() {
        await this.props.get_list_user();
        const formatted_date = dayjs(this.props.date_select, 'DD-MM-YYYY').format('YYYY-MM-DD');
        this.props.on_change_time_location(formatted_date, 'show_date');
    }
    validation_phone = (phone_number) => {
        const re = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;
        return re.test(phone_number);
    }
    validation = (data) => {
        if (!data.user_id) {
            return { mess: "Please select Artist", code: 1 };
        }
        let data_brand = this.props.data_brand;
        if (!data_brand.name) {
            return { mess: "Name of brand cannot be blank", code: 1 };
        }
        let data_stylist = this.props.data_stylist;
        if (!data_stylist.name) {
            return { mess: "Name of stylist cannot be blank", code: 1 };
        }
        let data_makeup_hair = this.props.data_makeup_hair;
        if (!data_makeup_hair.make_up) {
            return { mess: "Make up cannot be blank", code: 1 };
        }
        if (!data_makeup_hair.make_hair) {
            return { mess: "Make hair cannot be blank", code: 1 };
        }
        let data_charge_of = this.props.data_charge_of;
        if (!data_charge_of.name) {
            return { mess: "Name of Person in charge cannot be blank ", code: 1 };
        }
        if (!data_charge_of.phone) {
            return { mess: "Phone of Person in charge cannot be blank ", code: 1 };
        }
        if (!this.validation_phone(data_charge_of.phone)) {
            return { mess: "Phone of Person in charge wrong format", code: 1 };
        }
        let data_time_location = this.props.data_time_location;
        if (!data_time_location.show_date) {
            return { mess: "Show date cannot be blank", code: 1 };
        }
        if (!data_time_location.show_time) {
            return { mess: "Show time cannot be blank", code: 1 };
        }
        if (!data_time_location.leave_time) {
            return { mess: "Leave time cannot be blank", code: 1 };
        }
        if (!data_time_location.agency_name) {
            return { mess: "Agency name cannot be blank", code: 1 };
        }
        if (!data_time_location.contact) {
            return { mess: "Contact cannot be blank", code: 1 };
        }
        if (!this.validation_phone(data_time_location.contact)) {
            return { mess: "Contact wrong format", code: 1 };
        }
        if (!data_time_location.show_localtion) {
            return { mess: "Show location cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handle_create_schedule = async () => {
        let result = this.validation(this.props.data_schedule);
        if (result.code === 0) {
            this.setState({ is_loading: true });
            let result_brand = await this.handle_create_brand();
            if (result_brand === 1) { message.error('Error when create Brand'); }
            let result_stylist = await this.handle_create_stylist();
            if (result_stylist === 1) { message.error('Error when create Stylist'); }
            let result_makeup_hair = await this.handle_create_makeup_hair();
            if (result_makeup_hair === 1) { message.error('Error when create Makeup_hair'); }
            let result_charge_of = await this.handle_create_charge_of();
            if (result_charge_of === 1) { message.error('Error when create Person in charge'); }
            let result_time_location = await this.handle_create_time_location();
            if (result_time_location === 1) { message.error('Error when create Time_location'); }
            try {
                let data = await create_schedule(this.props.data_schedule);
                if (data && data.data && data.data.success === 1) {
                    let data_filter = this.props.data_filter;
                    await this.props.get_list_schedule(data_filter);
                    let type_filter_date = data_filter;
                    type_filter_date.type_date = 1;
                    await this.props.get_list_schedule(type_filter_date);
                    message.success('Success');
                    this.props.open_modal("create", false);
                    this.props.set_data_brand({});
                    this.props.set_data_charge_of({});
                    this.props.set_data_time_location({});
                    this.props.set_data_stylist({});
                    this.props.set_data_makeup_hair({});
                    this.props.set_data_schedule({});
                } else {
                    message.error('Error')
                }
            } catch (e) {
                message.error('System Error');
            }
            this.setState({ is_loading: false });
        } else {
            message.error(result.mess);
        }
    }
    handle_create_brand = async () => {
        try {
            let data = await create_brand(this.props.data_brand);
            if (data && data.data && data.data.success === 1) {
                this.props.on_change_schedule(data.data.data.id, 'brand_id');
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    handle_create_stylist = async () => {
        try {
            let data = await create_stylist(this.props.data_stylist);
            if (data && data.data && data.data.success === 1) {
                this.props.on_change_schedule(data.data.data.id, 'stylist_id');
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    onchange_image_stylist = async (event) => {
        const files = event.target.files;
        const list_image = this.props.data_stylist.images ? this.props.data_stylist.images : [];
        for (let i = 0; i < files.length; i++) {
            let image_new = await image_to_base64(event, i);
            list_image.push({ value: image_new });
        }
        this.props.on_change_stylist(list_image, 'images');
    }
    delete_image_stylist = (index) => {
        let data_stylist = this.props.data_stylist;
        let images = data_stylist.images;
        images.splice(index, 1);
        this.props.on_change_stylist(images, 'images');
    }
    handle_create_makeup_hair = async () => {
        try {
            let data = await create_makeup_hair(this.props.data_makeup_hair);
            if (data && data.data && data.data.success === 1) {
                this.props.on_change_schedule(data.data.data.id, 'makeup_hair_id');
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    onchange_image_makeup_hair = async (event) => {
        const files = event.target.files;
        const list_image = this.props.data_makeup_hair.images ? this.props.data_makeup_hair.images : [];
        for (let i = 0; i < files.length; i++) {
            let image_new = await image_to_base64(event, i);
            list_image.push({ value: image_new });
        }
        this.props.on_change_makeup_hair(list_image, 'images');
    }
    delete_image_makeup_hair = (index) => {
        let data_makeup_hair = this.props.data_makeup_hair;
        let images = data_makeup_hair.images;
        images.splice(index, 1);
        this.props.on_change_makeup_hair(images, 'images');
    }
    handle_create_charge_of = async () => {
        try {
            let data = await create_charge_of(this.props.data_charge_of);
            if (data && data.data && data.data.success === 1) {
                this.props.on_change_schedule(data.data.data.id, 'charge_of_id');
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    handle_create_time_location = async () => {
        try {
            let data = await create_time_location(this.props.data_time_location);
            if (data && data.data && data.data.success === 1) {
                this.props.on_change_schedule(data.data.data.id, 'time_localtion_id');
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    render() {
        let data_schedule = this.props.data_schedule;
        let data_users = this.props.data_users;
        let data_user = this.props.data_user;
        let data_brand = this.props.data_brand;
        let data_charge_of = this.props.data_charge_of;
        let data_time_location = this.props.data_time_location;
        let data_stylist = this.props.data_stylist;
        let data_makeup_hair = this.props.data_makeup_hair;
        let is_loading = this.state.is_loading;
        return (
            <Modal title={`CREATE A SCHEDULE FOR DATE: ${this.props.date_select}`} open={this.props.modal_create}
                okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                onOk={() => this.handle_create_schedule()}
                onCancel={() => this.props.open_modal("create", false)} width={400}>
                <Spin spinning={is_loading}>
                    <Space direction='vertical'>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>ARTIST</Divider>
                            {data_schedule.user_id &&
                                <div div className='flex items-center justify-center'>
                                    <Image width={150} height={150} className=' object-cover rounded-full'
                                        src={data_user.avatar} />
                                </div>
                            }
                            <div className='space-y-[3px]'>
                                <Typography.Text italic strong>Name <Typography.Text type="danger" strong> *</Typography.Text></Typography.Text>
                                <Select style={{ width: '100%' }} value={data_schedule.user_id}
                                    onChange={(event) => this.props.on_change_schedule(event, 'user_id')}
                                    onSelect={(value) => this.props.get_user(value)}
                                    options={[
                                        ...data_users
                                            .filter((item) => item?.role?.name === 'artist')
                                            .map((item) => ({
                                                label: item.fullname,
                                                value: item.id,
                                            })),
                                    ]} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>BRAND</Divider>
                            <FormInput name={'Name'} variable={'name'} value={data_brand.name}
                                important={true}
                                handle_onchange_input={this.props.on_change_brand} />
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>STYLIST</Divider>
                            <div className="space-y-[10px]">
                                {data_stylist && data_stylist.images && data_stylist.images.length !== 0 ?
                                    <div className='space-y-[3px]'>
                                        <Typography.Text italic strong>Image</Typography.Text>
                                        <div className='flex items-center justify-center py-[10px]'>
                                            <button ><AiOutlineDoubleLeft /></button>
                                            <div className='h-[200px] w-[200px] '>
                                                <Carousel arrows autoplay >
                                                    {data_stylist && data_stylist.images && data_stylist.images.map((item, index) => {
                                                        return (
                                                            <div key={index} className='flex items-center justify-center relative'>
                                                                <Image width={200} height={200} className='object-cover rounded-[5px] '
                                                                    src={item.value} />
                                                                <div className='absolute top-0 left-0'>
                                                                    <Button onClick={() => this.delete_image_stylist(index)}
                                                                        className='bg-red-600 text-white'>
                                                                        <AiFillDelete />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                            <button ><AiOutlineDoubleRight /></button>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }
                                <div className='text-center pt-[10px]'>
                                    <input id="load_file_stylist" type="file" accept="image/*" hidden multiple
                                        onChange={(event) => this.onchange_image_stylist(event)} />
                                    <label htmlFor="load_file_stylist"
                                        className='px-[10px] py-[5px] cursor-pointer
                                        bg-[#0e97ff] dark:bg-white text-white dark:text-black'>
                                        Add image
                                    </label>
                                </div>
                                <FormInput name={'Name'} variable={'name'} value={data_stylist.name}
                                    important={true}
                                    handle_onchange_input={this.props.on_change_stylist} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>MAKE UP_HAIR</Divider>
                            <div className="space-y-[10px]">
                                {data_makeup_hair && data_makeup_hair.images && data_makeup_hair.images.length !== 0 ?
                                    <div className='space-y-[3px]'>
                                        <Typography.Text italic strong>Image</Typography.Text>
                                        <div className='flex items-center justify-center py-[10px]'>
                                            <button ><AiOutlineDoubleLeft /></button>
                                            <div className='h-[200px] w-[200px] '>
                                                <Carousel arrows autoplay >
                                                    {data_makeup_hair && data_makeup_hair.images && data_makeup_hair.images.map((item, index) => {
                                                        return (
                                                            <div key={index} className='flex items-center justify-center relative'>
                                                                <Image width={200} height={200} className='object-cover rounded-[5px] '
                                                                    src={item.value} />
                                                                <div className='absolute top-0 left-0'>
                                                                    <Button onClick={() => this.delete_image_makeup_hair(index)}
                                                                        className='bg-red-600 text-white'>
                                                                        <AiFillDelete />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                            <button ><AiOutlineDoubleRight /></button>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }
                                <div className='text-center pt-[10px]'>
                                    <input id="load_file_makeup_hair" type="file" accept="image/*" hidden multiple
                                        onChange={(event) => this.onchange_image_makeup_hair(event)} />
                                    <label htmlFor="load_file_makeup_hair"
                                        className='px-[10px] py-[5px] cursor-pointer
                                        bg-[#0e97ff] dark:bg-white text-white dark:text-black'>
                                        Add image
                                    </label>
                                </div>
                                <FormInput name={'Make up'} variable={'make_up'} value={data_makeup_hair.make_up}
                                    important={true}
                                    handle_onchange_input={this.props.on_change_makeup_hair} />
                                <FormInput name={'Make hair'} variable={'make_hair'} value={data_makeup_hair.make_hair}
                                    important={true}
                                    handle_onchange_input={this.props.on_change_makeup_hair} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>PERSON IN CHARGE</Divider>
                            <FormInput name={'Name'} variable={'name'} value={data_charge_of.name}
                                important={true}
                                handle_onchange_input={this.props.on_change_charge_of} />
                            <FormInput name={'Phone'} variable={'phone'} value={data_charge_of.phone}
                                important={true}
                                handle_onchange_input={this.props.on_change_charge_of} />
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>NOTE</Divider>
                            <FormTextare name={'Content'} variable={'note'} value={data_charge_of.note}
                                important={false}
                                handle_onchange_input={this.props.on_change_charge_of} />
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>TIME_LOCATION</Divider>
                            <div className='flex justify-between space-x-[5px]'>
                                <FormInput input_type={'date'} name={'Show date'} variable={'show_date'} value={data_time_location.show_date}
                                    important={true} disabled_input={true}
                                    handle_onchange_input={this.props.on_change_time_location} />
                                <FormInput input_type={'time'} name={'Show time'} variable={'show_time'} value={data_time_location.show_time}
                                    important={true}
                                    handle_onchange_input={this.props.on_change_time_location} />
                            </div>
                            <div className='flex justify-between space-x-[5px]'>
                                <FormInput input_type={'time'} name={'Leave time'} variable={'leave_time'} value={data_time_location.leave_time}
                                    important={true}
                                    handle_onchange_input={this.props.on_change_time_location} />
                                <FormInput input_type={'time'} name={'Make up time'} variable={'make_up_time'} value={data_time_location.make_up_time}
                                    important={true}
                                    handle_onchange_input={this.props.on_change_time_location} />
                            </div>
                            <div className='flex justify-between space-x-[5px]'>
                                <FormInput input_type={'text'} name={'Agency name '} variable={'agency_name'} value={data_time_location.agency_name}
                                    important={true}
                                    handle_onchange_input={this.props.on_change_time_location} />
                                <FormInput input_type={'text'} name={'Contact'} variable={'contact'} value={data_time_location.contact}
                                    important={true}
                                    handle_onchange_input={this.props.on_change_time_location} />
                            </div>
                            <FormTextare name={'Show location'} variable={'show_localtion'} value={data_time_location.show_localtion}
                                important={true}
                                handle_onchange_input={this.props.on_change_time_location} />
                        </div>
                    </Space>
                </Spin>
            </Modal >
        );
    }

}
const mapStateToProps = state => {
    return {
        data_schedule: state.schedule.data_schedule,

        data_users: state.user.data_users,
        data_user: state.user.data_user,

        data_brand: state.brand.data_brand,

        data_charge_of: state.charge_of.data_charge_of,

        data_time_location: state.time_location.data_time_location,

        data_stylist: state.stylist.data_stylist,

        data_makeup_hair: state.makeup_hair.data_makeup_hair,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_schedule: (data) => dispatch(actions.get_list_schedule_redux(data)),
        on_change_schedule: (id, value) => dispatch(actions.on_change_schedule_redux(id, value)),
        set_data_schedule: (id) => dispatch(actions.set_data_schedule_redux(id)),

        get_list_user: () => dispatch(actions.get_list_user_redux()),
        get_user: (id) => dispatch(actions.get_user_redux(id)),

        on_change_brand: (id, value) => dispatch(actions.on_change_brand_redux(id, value)),
        set_data_brand: (data) => dispatch(actions.set_data_brand_redux(data)),

        on_change_charge_of: (id, value) => dispatch(actions.on_change_charge_of_redux(id, value)),
        set_data_charge_of: (data) => dispatch(actions.set_data_charge_of_redux(data)),

        on_change_time_location: (id, value) => dispatch(actions.on_change_time_location_redux(id, value)),
        set_data_time_location: (data) => dispatch(actions.set_data_time_location_redux(data)),

        on_change_stylist: (id, value) => dispatch(actions.on_change_stylist_redux(id, value)),
        set_data_stylist: (data) => dispatch(actions.set_data_stylist_redux(data)),

        on_change_makeup_hair: (id, value) => dispatch(actions.on_change_makeup_hair_redux(id, value)),
        set_data_makeup_hair: (data) => dispatch(actions.set_data_makeup_hair_redux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));