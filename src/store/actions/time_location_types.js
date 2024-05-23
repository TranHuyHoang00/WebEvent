import action_types from '@actions/action_types';
import { get_list_time_location, get_time_location, create_time_location, delete_time_location, edit_time_location } from '@services/time_location_services';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_time_location_redux = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(time_location_start());
            let data = await get_list_time_location();
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_time_location_success(data.data.data));
            } else {
                dispatch(time_location_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(time_location_faided());
            show_notification(error);
        }
    }
}
export const get_time_location_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(time_location_start());
            let data = await get_time_location(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_time_location_success(data.data.data));
            } else {
                dispatch(time_location_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(time_location_faided());
            show_notification(error);
        }
    }
}
export const create_time_location_redux = (data_time_location) => {
    return async (dispatch, getState) => {
        try {
            dispatch(time_location_start());
            let data = await create_time_location(data_time_location);
            if (data && data.data && data.data.success === 1) {
                dispatch(time_location_success());
                message.success('Success');
            } else {
                dispatch(time_location_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(time_location_faided());
            show_notification(error);
        }
    }
}
export const delete_list_time_location_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(time_location_start());
        for (const id of list_id) {
            try {
                let data = await delete_time_location(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when delete ID=${id}`);
                }
            } catch (error) {
                dispatch(time_location_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(time_location_success());
    }
}
export const edit_list_time_location_redux = (list_id, data_time_location) => {
    return async (dispatch, getState) => {
        dispatch(time_location_start());
        for (const id of list_id) {
            try {
                let data = await edit_time_location(id, data_time_location);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when edit ID=${id}`);
                }
            } catch (error) {
                dispatch(time_location_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(time_location_success());
    }
}
export const edit_time_location_redux = (id, data_time_location) => {
    return async (dispatch, getState) => {
        try {
            dispatch(time_location_start());
            let data = await edit_time_location(id, data_time_location);
            if (data && data.data && data.data.success === 1) {
                dispatch(time_location_success());
            } else {
                dispatch(time_location_faided());
                message.error('Error when edit time_location');
            }
        } catch (error) {
            dispatch(time_location_faided());
            show_notification(error);
        }
    }
}
export const time_location_start = () => ({
    type: action_types.TIME_LOCATION_START,
})
export const time_location_success = () => ({
    type: action_types.TIME_LOCATION_SUCCESS,
})
export const time_location_faided = () => ({
    type: action_types.TIME_LOCATION_FAIDED,
})

export const get_list_time_location_success = (data) => ({
    type: action_types.GET_LIST_TIME_LOCATION_SUCCESS,
    data
})
export const get_time_location_success = (data) => ({
    type: action_types.GET_TIME_LOCATION_SUCCESS,
    data
})
export const on_change_time_location_redux = (value, id) => ({
    type: action_types.ON_CHANGE_TIME_LOCATION,
    value,
    id,
})
export const set_data_time_location_redux = (data) => ({
    type: action_types.SET_DATA_TIME_LOCATION,
    data,
})