import action_types from '@actions/action_types';
import { get_list_device, get_device, create_device, delete_device, edit_device } from '@services/device_services';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_device_redux = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(device_start());
            let data = await get_list_device();
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_device_success(data.data.data));
            } else {
                dispatch(device_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(device_faided());
            show_notification(error);
        }
    }
}
export const get_device_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(device_start());
            let data = await get_device(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_device_success(data.data.data));
            } else {
                dispatch(device_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(device_faided());
            show_notification(error);
        }
    }
}
export const create_device_redux = (data_device) => {
    return async (dispatch, getState) => {
        try {
            dispatch(device_start());
            let data = await create_device(data_device);
            if (data && data.data && data.data.success === 1) {
                dispatch(device_success());
                message.success('Success');
            } else {
                dispatch(device_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(device_faided());
            show_notification(error);
        }
    }
}
export const delete_list_device_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(device_start());
        for (const id of list_id) {
            try {
                let data = await delete_device(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when delete ID=${id}`);
                }
            } catch (error) {
                dispatch(device_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(device_success());
    }
}
export const edit_list_device_redux = (list_id, data_device) => {
    return async (dispatch, getState) => {
        dispatch(device_start());
        for (const id of list_id) {
            try {
                let data = await edit_device(id, data_device);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when edit ID=${id}`);
                }
            } catch (error) {
                dispatch(device_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(device_success());
    }
}
export const edit_device_redux = (id, data_device) => {
    return async (dispatch, getState) => {
        try {
            dispatch(device_start());
            let data = await edit_device(id, data_device);
            if (data && data.data && data.data.success === 1) {
                dispatch(device_success());
                message.success('Success');
            } else {
                dispatch(device_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(device_faided());
            show_notification(error);
        }
    }
}
export const device_start = () => ({
    type: action_types.DEVICE_START,
})
export const device_success = () => ({
    type: action_types.DEVICE_SUCCESS,
})
export const device_faided = () => ({
    type: action_types.DEVICE_FAIDED,
})

export const get_list_device_success = (data) => ({
    type: action_types.GET_LIST_DEVICE_SUCCESS,
    data
})
export const get_device_success = (data) => ({
    type: action_types.GET_DEVICE_SUCCESS,
    data
})
export const on_change_device_redux = (value, id) => ({
    type: action_types.ON_CHANGE_DEVICE,
    value,
    id,
})
export const set_data_device_redux = (data) => ({
    type: action_types.SET_DATA_DEVICE,
    data,
})