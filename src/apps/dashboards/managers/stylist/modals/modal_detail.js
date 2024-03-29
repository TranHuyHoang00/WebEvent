import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, Carousel, Image } from 'antd';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_stylist = this.props.data_stylist;
        return (
            <Modal title="DETAIL" open={this.props.modal_detail}
                okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                onOk={() => this.props.open_Form("detail", false)}
                onCancel={() => this.props.open_Form("detail", false)}
                width={300}>
                <div className="space-y-[10px]">
                    {data_stylist && data_stylist.images && data_stylist.images.length !== 0 ?
                        <div className='space-y-[3px]'>
                            <label className='font-[500]'>Image</label>
                            <div className='flex items-center justify-center border py-[10px]'>
                                <button ><AiOutlineDoubleLeft /></button>
                                <div className='h-[200px] w-[200px] '>
                                    <Carousel arrows autoplay >
                                        {data_stylist && data_stylist.images && data_stylist.images.map((item, index) => {
                                            return (
                                                <div key={item.id} className='flex items-center justify-center'>
                                                    <Image width={200} height={200} className='object-cover rounded-[5px] '
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
                            <Image width={200} height={200} className='object-cover rounded-[5px] '
                                src={require(`../../../../../assets/images/None.jpg`).default} />
                        </div>
                    }
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Name<span></span></label>
                        <Input value={data_stylist.name} />
                    </div>

                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);