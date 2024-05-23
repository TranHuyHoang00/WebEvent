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
        let data_brand = this.props.data_brand;
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
                        {text_line_1_3('Name', data_brand.name)}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_brand: state.brand.data_brand,
        is_loading: state.brand.is_loading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_detail));
