import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { text_line_1_3 } from '@components/displays/data_line_1_3';

class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_time_location = this.props.data_time_location;
        let is_loading = this.props.is_loading;
        return (
            <Modal title="DETAIL" open={this.props.modal_detail}
                onCancel={() => this.props.open_modal("detail", false)} width={400}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("detail", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                    </>
                ]}>
                <Spin spinning={is_loading}>
                    <div className='border-t py-[10px] space-y-[5px]'>
                        {text_line_1_3('Show date', data_time_location.show_date)}
                        {text_line_1_3('Show time', data_time_location.show_time)}
                        {text_line_1_3('Leave time', data_time_location.leave_time)}
                        {text_line_1_3('Make up time', data_time_location.make_up_time)}
                        {text_line_1_3('Agency name', data_time_location.agency_name)}
                        {text_line_1_3('Contact', data_time_location.contact)}
                        {text_line_1_3('Show location', data_time_location.show_localtion)}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_time_location: state.time_location.data_time_location,
        is_loading: state.time_location.is_loading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_detail));
