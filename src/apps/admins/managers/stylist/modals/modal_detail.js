import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin, Image, Carousel, Typography } from 'antd';
import { text_line_1_3 } from '@components/displays/data_line_1_3';
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
        let is_loading = this.props.is_loading;
        return (
            <Modal title="DETAIL" open={this.props.modal_detail}
                onCancel={() => this.props.open_modal("detail", false)} width={400}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("detail", false)}
                            className='bg-[#e94138] text-white'>
                            Cancel
                        </Button>
                    </>
                ]}>
                <Spin spinning={is_loading}>
                    <div className='border-t py-[10px] space-y-[5px]'>
                        {data_stylist && data_stylist.images && data_stylist.images.length !== 0 ?
                            <div className='space-y-[3px]'>
                                <Typography.Text type="secondary">Image</Typography.Text>
                                <div className='flex items-center justify-center py-[10px]'>
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
                            <></>
                        }
                        {text_line_1_3('Name', data_stylist.name)}

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_stylist: state.stylist.data_stylist,
        is_loading: state.stylist.is_loading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_detail));
