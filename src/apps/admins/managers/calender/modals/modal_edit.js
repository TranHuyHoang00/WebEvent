import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiFillDelete } from "react-icons/ai";
import { Image, Divider, Carousel, Modal, Button, Typography, message } from 'antd';
import { edit_stylist, get_stylist } from '../../../../../services/stylist_services';
import { edit_makeup_hair, get_makeup_hair } from '../../../../../services/makeup_hair_services';
import { edit_schedule } from '../../../../../services/schedule_services';
import { image_to_base64 } from '../../../../../utils/base64';

import FormInput from '@components/inputs/form_input';
import FormTextare from '@components/inputs/form_textare';
import ModalFooter from '@components/modal/modal_footer';
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
            id_schedule: '',
            confirm_Loading: false,

            data_schedule: {},
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_schedule !== this.props.data_schedule) {
            let data_schedule = this.props.data_schedule;
            this.props.set_data_user(data_schedule.user_id);
            this.props.set_data_brand(data_schedule.brand_id);
            this.props.set_data_charge_of(data_schedule.charge_of_id);
            this.props.set_data_stylist(data_schedule.stylist_id);
            this.props.set_data_makeup_hair(data_schedule.makeup_hair_id);
            this.props.set_data_time_location(data_schedule.time_localtion_id);
        }

    }
    validation_phone = (phone_number) => {
        const re = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;
        return re.test(phone_number);
    }
    validation = () => {
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
    handle_edit_schedule = async () => {
        let result = this.validation();
        if (result.code == 0) {
            try {
                await Promise.all([
                    this.props.edit_brand(this.props.data_brand.id, this.props.data_brand),
                    this.props.edit_charge_of(this.props.data_charge_of.id, this.props.data_charge_of),
                    this.props.edit_time_location(this.props.data_time_location.id, this.props.data_time_location),
                ]);
                message.success('Success');
            } catch (error) {
                message.error('Errorr');
            }
        } else {
            message.error(result.mess);
        }
    }

    // Stylist
    get_stylist = async (id) => {
        try {
            let data = await get_stylist(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_stylist: data.data.data })
            } else {
                message.error('Error')
            }
        } catch (e) {
            message.error('System Error');
        }
    }
    onChange_Stylist = (event, id) => {
        let copyState = { ...this.state.data_stylist };
        copyState[id] = event.target.value;
        this.setState({
            is_update_stylist: true,
            data_stylist: {
                ...copyState
            }
        });
    }
    onChange_Image_stylist = async (image) => {
        let img_convert = await image_to_base64(image);
        let data_stylist = this.state.data_stylist;
        let data_images_stylist = this.state.data_images_stylist;
        data_images_stylist.push({ value: img_convert });
        (data_stylist.images).push({ value: img_convert });
        this.setState({
            is_update_stylist: true,
            data_stylist: data_stylist,
            data_images_stylist: data_images_stylist
        })
    }
    delete_Image_stylist = (index, id) => {
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
            } else {
                message.error('Error')
            }
        } catch (e) {
            message.error('System Error');
        }
    }
    onchange_Makeup_Hair = (event, id) => {
        let copyState = { ...this.state.data_makeup_hair };
        copyState[id] = event.target.value;
        this.setState({
            is_update_makeup_hair: true,
            data_makeup_hair: {
                ...copyState
            }
        });
    }
    onchange_Image_Makeup = async (image) => {
        let img_convert = await image_to_base64(image);
        let data_makeup_hair = this.state.data_makeup_hair;
        let data_images_makeup_hair = this.state.data_images_makeup_hair;
        data_images_makeup_hair.push({ value: img_convert });
        (data_makeup_hair.images).push({ value: img_convert });
        this.setState({
            is_update_stylist: true,
            data_makeup_hair: data_makeup_hair,
            data_images_makeup_hair: data_images_makeup_hair
        })
    }
    delete_Image_Makeup = (index, id) => {
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
    render() {
        let data_user = this.props.data_user;
        let data_brand = this.props.data_brand;
        let data_charge_of = this.props.data_charge_of;
        let data_time_location = this.props.data_time_location;
        let data_stylist = this.props.data_stylist;
        let data_makeup_hair = this.props.data_makeup_hair;
        return (
            <>
                <Modal title={`EDIT A SCHEDULE FOR DATE: ${this.props.date_select}`} open={this.props.modal_edit}
                    okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handle_edit_schedule()}
                    onCancel={() => this.props.open_modal("edit", false)}
                    width={400} confirmLoading={this.state.confirm_Loading}>
                    <div className="space-y-[15px]">
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>ARTIST</Divider>
                            <div className='flex items-center justify-center'>
                                <Image width={150} height={150}
                                    className=' object-cover rounded-full'
                                    src={(data_user.avatar == "" || data_user.avatar == null) ? require(`@assets/images/avatar_none.jpg`).default : data_user.avatar} />
                            </div>
                            <FormInput name={'Name'} variable={'fullname'} value={data_user.fullname}
                                important={true} disabled_input={true} />

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
                                    important={true}
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
                    </div>
                </Modal>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        data_schedule: state.schedule.data_schedule,

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

        set_data_user: (data) => dispatch(actions.set_data_user_redux(data)),

        edit_brand: (id, data) => dispatch(actions.edit_brand_redux(id, data)),
        on_change_brand: (id, value) => dispatch(actions.on_change_brand_redux(id, value)),
        set_data_brand: (data) => dispatch(actions.set_data_brand_redux(data)),

        edit_charge_of: (id, data) => dispatch(actions.edit_charge_of_redux(id, data)),
        on_change_charge_of: (id, value) => dispatch(actions.on_change_charge_of_redux(id, value)),
        set_data_charge_of: (data) => dispatch(actions.set_data_charge_of_redux(data)),

        edit_time_location: (id, data) => dispatch(actions.edit_time_location_redux(id, data)),
        on_change_time_location: (id, value) => dispatch(actions.on_change_time_location_redux(id, value)),
        set_data_time_location: (data) => dispatch(actions.set_data_time_location_redux(data)),

        edit_stylist: (id, data) => dispatch(actions.edit_stylist_redux(id, data)),
        on_change_stylist: (id, value) => dispatch(actions.on_change_stylist_redux(id, value)),
        set_data_stylist: (data) => dispatch(actions.set_data_stylist_redux(data)),

        edit_makeup_hair: (id, data) => dispatch(actions.edit_makeup_hair_redux(id, data)),
        on_change_makeup_hair: (id, value) => dispatch(actions.on_change_makeup_hair_redux(id, value)),
        set_data_makeup_hair: (data) => dispatch(actions.set_data_makeup_hair_redux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));