import action_types from '@actions/action_types';
import { get_list_schedule, get_schedule, create_schedule, delete_schedule, edit_schedule } from '@services/schedule_services';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_schedule_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(schedule_start());
            let data = await get_list_schedule(data_filter);
            if (data && data.data && data.data.success === 1) {
                if (data_filter?.type_date === 1) {
                    dispatch(get_list_schedule_success(data.data.data));
                }
                if (data_filter?.type_date === 2) {
                    dispatch(get_list_schedule_date_success(data.data.data));
                }
            } else {
                dispatch(schedule_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(schedule_faided());
            show_notification(error);
        }
    }
}
export const get_schedule_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(schedule_start());
            let data = await get_schedule(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_schedule_success(data.data.data));
            } else {
                dispatch(schedule_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(schedule_faided());
            show_notification(error);
        }
    }
}
export const create_schedule_redux = (data_schedule) => {
    return async (dispatch, getState) => {
        try {
            dispatch(schedule_start());
            let data = await create_schedule(data_schedule);
            if (data && data.data && data.data.success === 1) {
                dispatch(schedule_success());
                message.success('Success');
            } else {
                dispatch(schedule_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(schedule_faided());
            show_notification(error);
        }
    }
}
export const delete_list_schedule_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(schedule_start());
        for (const id of list_id) {
            try {
                let data = await delete_schedule(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when delete ID=${id}`);
                }
            } catch (error) {
                dispatch(schedule_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(schedule_success());
    }
}
export const edit_list_schedule_redux = (list_id, data_schedule) => {
    return async (dispatch, getState) => {
        dispatch(schedule_start());
        for (const id of list_id) {
            try {
                let data = await edit_schedule(id, data_schedule);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when edit ID=${id}`);
                }
            } catch (error) {
                dispatch(schedule_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(schedule_success());
    }
}
export const edit_schedule_redux = (id, data_schedule) => {
    return async (dispatch, getState) => {
        try {
            dispatch(schedule_start());
            let data = await edit_schedule(id, data_schedule);
            if (data && data.data && data.data.success === 1) {
                dispatch(schedule_success());
                message.success('Success');
            } else {
                dispatch(schedule_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(schedule_faided());
            show_notification(error);
        }
    }
}
export const schedule_start = () => ({
    type: action_types.SCHEDULE_START,
})
export const schedule_success = () => ({
    type: action_types.SCHEDULE_SUCCESS,
})
export const schedule_faided = () => ({
    type: action_types.SCHEDULE_FAIDED,
})

export const get_list_schedule_success = (data) => ({
    type: action_types.GET_LIST_SCHEDULE_SUCCESS,
    data
})
export const get_list_schedule_date_success = (data) => ({
    type: action_types.GET_LIST_SCHEDULE_DATE_SUCCESS,
    data
})
export const get_schedule_success = (data) => ({
    type: action_types.GET_SCHEDULE_SUCCESS,
    data
})
export const on_change_schedule_redux = (value, id) => ({
    type: action_types.ON_CHANGE_SCHEDULE,
    value,
    id,
})
export const set_data_schedule_redux = (data) => ({
    type: action_types.SET_DATA_SCHEDULE,
    data,
})