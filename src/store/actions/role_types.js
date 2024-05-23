import action_types from '@actions/action_types';
import { get_list_role, get_role, create_role, delete_role, edit_role } from '@services/role_services';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_role_redux = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(role_start());
            let data = await get_list_role();
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_role_success(data.data.data));
            } else {
                dispatch(role_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(role_faided());
            show_notification(error);
        }
    }
}
export const get_role_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(role_start());
            let data = await get_role(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_role_success(data.data.data));
            } else {
                dispatch(role_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(role_faided());
            show_notification(error);
        }
    }
}
export const create_role_redux = (data_role) => {
    return async (dispatch, getState) => {
        try {
            dispatch(role_start());
            let data = await create_role(data_role);
            if (data && data.data && data.data.success === 1) {
                dispatch(role_success());
                message.success('Success');
            } else {
                dispatch(role_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(role_faided());
            show_notification(error);
        }
    }
}
export const delete_list_role_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(role_start());
        for (const id of list_id) {
            try {
                let data = await delete_role(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when delete ID=${id}`);
                }
            } catch (error) {
                dispatch(role_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(role_success());
    }
}
export const edit_list_role_redux = (list_id, data_role) => {
    return async (dispatch, getState) => {
        dispatch(role_start());
        for (const id of list_id) {
            try {
                let data = await edit_role(id, data_role);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when edit ID=${id}`);
                }
            } catch (error) {
                dispatch(role_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(role_success());
    }
}
export const edit_role_redux = (id, data_role) => {
    return async (dispatch, getState) => {
        try {
            dispatch(role_start());
            let data = await edit_role(id, data_role);
            if (data && data.data && data.data.success === 1) {
                dispatch(role_success());
                message.success('Success');
            } else {
                dispatch(role_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(role_faided());
            show_notification(error);
        }
    }
}
export const role_start = () => ({
    type: action_types.ROLE_START,
})
export const role_success = () => ({
    type: action_types.ROLE_SUCCESS,
})
export const role_faided = () => ({
    type: action_types.ROLE_FAIDED,
})

export const get_list_role_success = (data) => ({
    type: action_types.GET_LIST_ROLE_SUCCESS,
    data
})
export const get_role_success = (data) => ({
    type: action_types.GET_ROLE_SUCCESS,
    data
})
export const on_change_role_redux = (value, id) => ({
    type: action_types.ON_CHANGE_ROLE,
    value,
    id,
})
export const set_data_role_redux = (data) => ({
    type: action_types.SET_DATA_ROLE,
    data,
})