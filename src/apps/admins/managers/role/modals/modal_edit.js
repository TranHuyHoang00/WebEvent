import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/form_input';
import ModalFooter from '@components/modal/modal_footer';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validation = (data) => {
        if (!data.name) {
            return { mess: "Name cannot be blank !", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.props.data_role);
        if (result.code === 0) {
            let data_role = this.props.data_role;
            await this.props.edit_role(data_role.id, data_role);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("edit", false);
                await this.props.get_list_role();
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_role = this.props.data_role;
        let is_loading = this.props.is_loading;
        return (
            <Modal title="EDIT" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'edit'}
                        is_loading={is_loading} handle_funtion={this.handle_edit} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">

                        <FormInput name={'Name'} variable={'name'} value={data_role.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_role} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_role: state.role.data_role,
        is_loading: state.role.is_loading,
        is_result: state.role.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_role: () => dispatch(actions.get_list_role_redux()),
        edit_role: (id, data) => dispatch(actions.edit_role_redux(id, data)),
        on_change_role: (id, value) => dispatch(actions.on_change_role_redux(id, value)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));