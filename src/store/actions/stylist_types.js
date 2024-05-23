import action_types from '@actions/action_types';
import { get_list_stylist, get_stylist, create_stylist, delete_stylist, edit_stylist } from '@services/stylist_services';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_stylist_redux = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(stylist_start());
            let data = await get_list_stylist();
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_stylist_success(data.data.data));
            } else {
                dispatch(stylist_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(stylist_faided());
            show_notification(error);
        }
    }
}
export const get_stylist_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(stylist_start());
            let data = await get_stylist(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_stylist_success(data.data.data));
            } else {
                dispatch(stylist_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(stylist_faided());
            show_notification(error);
        }
    }
}
export const create_stylist_redux = (data_stylist) => {
    return async (dispatch, getState) => {
        try {
            dispatch(stylist_start());
            let data = await create_stylist(data_stylist);
            if (data && data.data && data.data.success === 1) {
                dispatch(stylist_success());
                message.success('Success');
            } else {
                dispatch(stylist_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(stylist_faided());
            show_notification(error);
        }
    }
}
export const delete_list_stylist_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(stylist_start());
        for (const id of list_id) {
            try {
                let data = await delete_stylist(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when delete ID=${id}`);
                }
            } catch (error) {
                dispatch(stylist_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(stylist_success());
    }
}
export const edit_list_stylist_redux = (list_id, data_stylist) => {
    return async (dispatch, getState) => {
        dispatch(stylist_start());
        for (const id of list_id) {
            try {
                let data = await edit_stylist(id, data_stylist);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when edit ID=${id}`);
                }
            } catch (error) {
                dispatch(stylist_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(stylist_success());
    }
}
export const edit_stylist_redux = (id, data_stylist) => {
    return async (dispatch, getState) => {
        try {
            dispatch(stylist_start());
            let data = await edit_stylist(id, data_stylist);
            if (data && data.data && data.data.success === 1) {
                dispatch(stylist_success());
            } else {
                dispatch(stylist_faided());
                message.error('Error when edit stylist');
            }
        } catch (error) {
            dispatch(stylist_faided());
            show_notification(error);
        }
    }
}
export const stylist_start = () => ({
    type: action_types.STYLIST_START,
})
export const stylist_success = () => ({
    type: action_types.STYLIST_SUCCESS,
})
export const stylist_faided = () => ({
    type: action_types.STYLIST_FAIDED,
})

export const get_list_stylist_success = (data) => ({
    type: action_types.GET_LIST_STYLIST_SUCCESS,
    data
})
export const get_stylist_success = (data) => ({
    type: action_types.GET_STYLIST_SUCCESS,
    data
})
export const on_change_stylist_redux = (value, id) => ({
    type: action_types.ON_CHANGE_STYLIST,
    value,
    id,
})
export const set_data_stylist_redux = (data) => ({
    type: action_types.SET_DATA_STYLIST,
    data,
})