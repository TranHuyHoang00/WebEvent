import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin, Image, Typography } from 'antd';
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
        let data_user = this.props.data_user;
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
                        <div className='space-y-[3px]'>
                            <Typography.Text type="secondary">Avatar</Typography.Text>
                            <div className='flex items-center justify-center'>
                                <Image width={200} height={200} className='object-cover rounded-[5px] '
                                    src={(data_user.avatar === "" || data_user.avatar === null) ? require(`@assets/images/avatar_none.jpg`).default : data_user.avatar} />
                            </div>
                        </div>
                        {text_line_1_3('Username', data_user.username)}
                        {text_line_1_3('Fullname', data_user.fullname)}
                        {text_line_1_3('Role', data_user.role?.name)}
                    </div>
                </Spin>
            </Modal >
        );
    }

}
const mapStateToProps = state => {
    return {
        data_user: state.user.data_user,
        is_loading: state.user.is_loading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_detail));
