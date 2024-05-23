import action_types from '@actions/action_types';
import { get_list_charge_of, get_charge_of, create_charge_of, delete_charge_of, edit_charge_of } from '@services/charge_of_services';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_charge_of_redux = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(charge_of_start());
            let data = await get_list_charge_of();
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_charge_of_success(data.data.data));
            } else {
                dispatch(charge_of_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(charge_of_faided());
            show_notification(error);
        }
    }
}
export const get_charge_of_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(charge_of_start());
            let data = await get_charge_of(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_charge_of_success(data.data.data));
            } else {
                dispatch(charge_of_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(charge_of_faided());
            show_notification(error);
        }
    }
}
export const create_charge_of_redux = (data_charge_of) => {
    return async (dispatch, getState) => {
        try {
            dispatch(charge_of_start());
            let data = await create_charge_of(data_charge_of);
            if (data && data.data && data.data.success === 1) {
                dispatch(charge_of_success());
                message.success('Success');
            } else {
                dispatch(charge_of_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(charge_of_faided());
            show_notification(error);
        }
    }
}
export const delete_list_charge_of_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(charge_of_start());
        for (const id of list_id) {
            try {
                let data = await delete_charge_of(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when delete ID=${id}`);
                }
            } catch (error) {
                dispatch(charge_of_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(charge_of_success());
    }
}
export const edit_list_charge_of_redux = (list_id, data_charge_of) => {
    return async (dispatch, getState) => {
        dispatch(charge_of_start());
        for (const id of list_id) {
            try {
                let data = await edit_charge_of(id, data_charge_of);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when edit ID=${id}`);
                }
            } catch (error) {
                dispatch(charge_of_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(charge_of_success());
    }
}
export const edit_charge_of_redux = (id, data_charge_of) => {
    return async (dispatch, getState) => {
        try {
            dispatch(charge_of_start());
            let data = await edit_charge_of(id, data_charge_of);
            if (data && data.data && data.data.success === 1) {
                dispatch(charge_of_success());
                message.success('Success');
            } else {
                dispatch(charge_of_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(charge_of_faided());
            show_notification(error);
        }
    }
}
export const charge_of_start = () => ({
    type: action_types.CHARGE_OF_START,
})
export const charge_of_success = () => ({
    type: action_types.CHARGE_OF_SUCCESS,
})
export const charge_of_faided = () => ({
    type: action_types.CHARGE_OF_FAIDED,
})

export const get_list_charge_of_success = (data) => ({
    type: action_types.GET_LIST_CHARGE_OF_SUCCESS,
    data
})
export const get_charge_of_success = (data) => ({
    type: action_types.GET_CHARGE_OF_SUCCESS,
    data
})
export const on_change_charge_of_redux = (value, id) => ({
    type: action_types.ON_CHANGE_CHARGE_OF,
    value,
    id,
})
export const set_data_charge_of_redux = (data) => ({
    type: action_types.SET_DATA_CHARGE_OF,
    data,
})