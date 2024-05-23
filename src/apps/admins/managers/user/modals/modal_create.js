import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/form_input';
import FormSelectInput from '@components/selects/form_select_input';
import FormImage from '@components/inputs/form_image';
import ModalFooter from '@components/modal/modal_footer';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        this.props.get_list_role();
    }
    isCheckSpace = (value) => {
        return (/\s/).test(value);
    }
    validation = (data) => {
        if (!data.avatar) {
            return { mess: "Avatar cannot be blank", code: 1 };
        }
        if (!data.username) {
            return { mess: "Username cannot be blank", code: 1 };
        }
        if (this.isCheckSpace(data.username) === true) {
            return { mess: "Username contains spaces", code: 1 };
        }
        if (!data.password) {
            return { mess: "Password cannot be blank", code: 1 };
        }
        if (this.isCheckSpace(data.password) === true) {
            return { mess: "Password contains spaces", code: 1 };
        }
        if (!data.fullname) {
            return { mess: "Fullname cannot be blank", code: 1 };
        }
        if (!data.role_id || data.role_id === 0) {
            return { mess: "Role cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.props.data_user);
        if (result.code === 0) {
            await this.props.create_user(this.props.data_user);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("create", false);
                await this.props.get_list_user();
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_user = this.props.data_user;
        let is_loading = this.props.is_loading;
        let data_roles = this.props.data_roles;
        return (

            <Modal title="CREATE" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'create'}
                        is_loading={is_loading} handle_funtion={this.handle_create} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">
                        <FormImage name={'Avatar'} variable={'avatar'} value={data_user.avatar}
                            important={true}
                            htmlFor={'load_file_create'} width={100} height={100}
                            handle_onchange_input={this.props.on_change_user} />
                        <FormInput name={'Username'} variable={'username'} value={data_user.username}
                            important={true}
                            handle_onchange_input={this.props.on_change_user} />
                        <FormInput name={'Password'} variable={'password'} value={data_user.password}
                            important={true}
                            handle_onchange_input={this.props.on_change_user} />
                        <FormInput name={'Fullname'} variable={'fullname'} value={data_user.fullname}
                            important={true}
                            handle_onchange_input={this.props.on_change_user} />

                        <FormSelectInput name={'Role'} variable={'role_id'} value={data_user.role_id}
                            important={true} width={'100%'}
                            options={data_roles.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            handle_onchange_input={this.props.on_change_user} />

                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Characteristic color
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <input type='color' value={data_user.color} className='w-full h-[30px]'
                                onChange={(event) => this.props.on_change_user(event.target.value, 'color')} />
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_user: state.user.data_user,
        is_loading: state.user.is_loading,
        is_result: state.user.is_result,

        data_roles: state.role.data_roles
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_user: () => dispatch(actions.get_list_user_redux()),
        create_user: (data) => dispatch(actions.create_user_redux(data)),
        on_change_user: (id, value) => dispatch(actions.on_change_user_redux(id, value)),

        get_list_role: () => dispatch(actions.get_list_role_redux()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));