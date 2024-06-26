import action_types from '@actions/action_types';
import { get_list_user, get_user, create_user, delete_user, edit_user } from '@services/user_services';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_user_redux = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(user_start());
            let data = await get_list_user();
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_user_success(data.data.data));
            } else {
                dispatch(user_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(user_faided());
            show_notification(error);
        }
    }
}
export const get_user_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(user_start());
            let data = await get_user(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_user_success(data.data.data));
            } else {
                dispatch(user_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(user_faided());
            show_notification(error);
        }
    }
}
export const create_user_redux = (data_user) => {
    return async (dispatch, getState) => {
        try {
            dispatch(user_start());
            let data = await create_user(data_user);
            if (data && data.data && data.data.success === 1) {
                dispatch(user_success());
                message.success('Success');
            } else {
                dispatch(user_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(user_faided());
            show_notification(error);
        }
    }
}
export const delete_list_user_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(user_start());
        for (const id of list_id) {
            try {
                let data = await delete_user(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when delete ID=${id}`);
                }
            } catch (error) {
                dispatch(user_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(user_success());
    }
}
export const edit_list_user_redux = (list_id, data_user) => {
    return async (dispatch, getState) => {
        dispatch(user_start());
        for (const id of list_id) {
            try {
                let data = await edit_user(id, data_user);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when edit ID=${id}`);
                }
            } catch (error) {
                dispatch(user_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(user_success());
    }
}
export const edit_user_redux = (id, data_user) => {
    return async (dispatch, getState) => {
        try {
            dispatch(user_start());
            let data = await edit_user(id, data_user);
            if (data && data.data && data.data.success === 1) {
                dispatch(user_success());
                message.success('Success');
            } else {
                dispatch(user_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(user_faided());
            show_notification(error);
        }
    }
}
export const user_start = () => ({
    type: action_types.USER_START,
})
export const user_success = () => ({
    type: action_types.USER_SUCCESS,
})
export const user_faided = () => ({
    type: action_types.USER_FAIDED,
})

export const get_list_user_success = (data) => ({
    type: action_types.GET_LIST_USER_SUCCESS,
    data
})
export const get_user_success = (data) => ({
    type: action_types.GET_USER_SUCCESS,
    data
})
export const on_change_user_redux = (value, id) => ({
    type: action_types.ON_CHANGE_USER,
    value,
    id,
})
export const set_data_user_redux = (data) => ({
    type: action_types.SET_DATA_USER,
    data,
})