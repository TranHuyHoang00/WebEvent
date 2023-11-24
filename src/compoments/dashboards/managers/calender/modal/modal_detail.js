import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Image, Divider, Carousel, Modal } from 'antd';
class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_schedule = this.props.data_schedule;
        return (
            <>
                <Modal title={`DETAIL A SCHEDULE FOR DATE: ${this.props.date_select}`} open={this.props.modal_detail}
                    okText={"EXIT"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.props.openForm("detail", false)}
                    onCancel={() => this.props.openForm("detail", false)}
                    width={400}>
                    <div className="space-y-[15px]">
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>ARTIST</Divider>
                            <div className='flex items-center justify-center'>
                                <Image width={150} height={150}
                                    className=' object-cover rounded-[5px]'
                                    src={(data_schedule.user_id && (data_schedule.user_id.avatar == "" || data_schedule.user_id.avatar == null)) ?
                                        require(`../../../../../assets/images/None.jpg`).default : data_schedule.user_id && data_schedule.user_id.avatar} />
                            </div>

                            <div>
                                <label>Fullname</label><br />
                                <input value={data_schedule.user_id && data_schedule.user_id.fullname} disabled
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>BRAND</Divider>
                            <label>Name</label><br />
                            <input value={data_schedule.brand_id && data_schedule.brand_id.name} disabled
                                className='border w-full rounded-[5px] p-[5px]' />

                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>STYLIST</Divider>
                            {data_schedule.stylist_id && data_schedule.stylist_id.images && data_schedule.stylist_id.images.length !== 0 ?
                                <div className='space-y-[5px]'>
                                    <div className='flex items-center justify-center'>
                                        <button ><AiOutlineDoubleLeft /></button>
                                        <div className='h-[150px] w-[150px] '>
                                            <Carousel arrows autoplay >
                                                {data_schedule.stylist_id && data_schedule.stylist_id.images.map((item, index) => {
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
                                        src={require(`../../../../../assets/images/None.jpg`).default} />
                                </div>
                            }
                            <div>
                                <label>Name<span></span></label>
                                <input value={data_schedule.stylist_id && data_schedule.stylist_id.name} disabled
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>MAKE UP_HAIR</Divider>
                            {data_schedule.makeup_hair_id && data_schedule.makeup_hair_id.images && data_schedule.makeup_hair_id.images.length !== 0 ?
                                <div className='space-y-[5px]'>
                                    <div className='flex items-center justify-center'>
                                        <button ><AiOutlineDoubleLeft /></button>
                                        <div className='h-[150px] w-[150px] '>
                                            <Carousel arrows autoplay >
                                                {data_schedule.makeup_hair_id.images && data_schedule.makeup_hair_id.images.map((item, index) => {
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
                                        src={require(`../../../../../assets/images/None.jpg`).default} />
                                </div>
                            }
                            <div>
                                <label>Make up<span></span></label><br />
                                <input value={data_schedule.makeup_hair_id && data_schedule.makeup_hair_id.make_up} disabled
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Make hair<span></span></label><br />
                                <input value={data_schedule.makeup_hair_id && data_schedule.makeup_hair_id.make_hair} disabled
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>PERSON IN CHARGE</Divider>
                            <div>
                                <label>Name<span></span></label><br />
                                <input value={data_schedule.charge_of_id && data_schedule.charge_of_id.name} disabled
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>TIME_LOCATION</Divider>
                            <div>
                                <label>Show date</label><br />
                                <input type='date' value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.show_date}
                                    disabled className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Show time</label><br />
                                <input type='datetime-local' value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.show_time}
                                    disabled className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Leave time</label><br />
                                <input type='datetime-local' value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.leave_time}
                                    disabled className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Makeup time</label><br />
                                <input type='datetime-local' value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.make_up_time}
                                    disabled className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Show localtion</label><br />
                                <input value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.show_localtion} disabled
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Agency name</label><br />
                                <input value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.agency_name} disabled
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                            <div>
                                <label>Contact</label><br />
                                <input value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.contact} disabled
                                    className='border w-full rounded-[5px] p-[5px]' />
                            </div>
                        </div>
                    </div>
                </Modal>

            </>
        );
    }

}
export default withRouter(modal_detail);
