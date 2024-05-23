import action_types from '@actions/action_types';
import { get_list_makeup_hair, get_makeup_hair, create_makeup_hair, delete_makeup_hair, edit_makeup_hair } from '@services/makeup_hair_services';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_makeup_hair_redux = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(makeup_hair_start());
            let data = await get_list_makeup_hair();
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_makeup_hair_success(data.data.data));
            } else {
                dispatch(makeup_hair_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(makeup_hair_faided());
            show_notification(error);
        }
    }
}
export const get_makeup_hair_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(makeup_hair_start());
            let data = await get_makeup_hair(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_makeup_hair_success(data.data.data));
            } else {
                dispatch(makeup_hair_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(makeup_hair_faided());
            show_notification(error);
        }
    }
}
export const create_makeup_hair_redux = (data_makeup_hair) => {
    return async (dispatch, getState) => {
        try {
            dispatch(makeup_hair_start());
            let data = await create_makeup_hair(data_makeup_hair);
            if (data && data.data && data.data.success === 1) {
                dispatch(makeup_hair_success());
                message.success('Success');
            } else {
                dispatch(makeup_hair_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(makeup_hair_faided());
            show_notification(error);
        }
    }
}
export const delete_list_makeup_hair_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(makeup_hair_start());
        for (const id of list_id) {
            try {
                let data = await delete_makeup_hair(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when delete ID=${id}`);
                }
            } catch (error) {
                dispatch(makeup_hair_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(makeup_hair_success());
    }
}
export const edit_list_makeup_hair_redux = (list_id, data_makeup_hair) => {
    return async (dispatch, getState) => {
        dispatch(makeup_hair_start());
        for (const id of list_id) {
            try {
                let data = await edit_makeup_hair(id, data_makeup_hair);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when edit ID=${id}`);
                }
            } catch (error) {
                dispatch(makeup_hair_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(makeup_hair_success());
    }
}
export const edit_makeup_hair_redux = (id, data_makeup_hair) => {
    return async (dispatch, getState) => {
        try {
            dispatch(makeup_hair_start());
            let data = await edit_makeup_hair(id, data_makeup_hair);
            if (data && data.data && data.data.success === 1) {
                dispatch(makeup_hair_success());
                message.success('Success');
            } else {
                dispatch(makeup_hair_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(makeup_hair_faided());
            show_notification(error);
        }
    }
}
export const makeup_hair_start = () => ({
    type: action_types.MAKEUP_HAIR_START,
})
export const makeup_hair_success = () => ({
    type: action_types.MAKEUP_HAIR_SUCCESS,
})
export const makeup_hair_faided = () => ({
    type: action_types.MAKEUP_HAIR_FAIDED,
})

export const get_list_makeup_hair_success = (data) => ({
    type: action_types.GET_LIST_MAKEUP_HAIR_SUCCESS,
    data
})
export const get_makeup_hair_success = (data) => ({
    type: action_types.GET_MAKEUP_HAIR_SUCCESS,
    data
})
export const on_change_makeup_hair_redux = (value, id) => ({
    type: action_types.ON_CHANGE_MAKEUP_HAIR,
    value,
    id,
})
export const set_data_makeup_hair_redux = (data) => ({
    type: action_types.SET_DATA_MAKEUP_HAIR,
    data,
})