import action_types from '@actions/action_types';
import { get_list_brand, get_brand, create_brand, delete_brand, edit_brand } from '@services/brand_services';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_brand_redux = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(brand_start());
            let data = await get_list_brand();
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_brand_success(data.data.data));
            } else {
                dispatch(brand_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(brand_faided());
            show_notification(error);
        }
    }
}
export const get_brand_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brand_start());
            let data = await get_brand(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_brand_success(data.data.data));
            } else {
                dispatch(brand_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(brand_faided());
            show_notification(error);
        }
    }
}
export const create_brand_redux = (data_brand) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brand_start());
            let data = await create_brand(data_brand);
            if (data && data.data && data.data.success === 1) {
                dispatch(brand_success());
                message.success('Success');
            } else {
                dispatch(brand_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(brand_faided());
            show_notification(error);
        }
    }
}
export const delete_list_brand_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(brand_start());
        for (const id of list_id) {
            try {
                let data = await delete_brand(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when delete ID=${id}`);
                }
            } catch (error) {
                dispatch(brand_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(brand_success());
    }
}
export const edit_list_brand_redux = (list_id, data_brand) => {
    return async (dispatch, getState) => {
        dispatch(brand_start());
        for (const id of list_id) {
            try {
                let data = await edit_brand(id, data_brand);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Error when edit ID=${id}`);
                }
            } catch (error) {
                dispatch(brand_faided());
                show_notification(error);
            }
        }
        message.success('Success');
        dispatch(brand_success());
    }
}
export const edit_brand_redux = (id, data_brand) => {
    return async (dispatch, getState) => {
        try {
            dispatch(brand_start());
            let data = await edit_brand(id, data_brand);
            if (data && data.data && data.data.success === 1) {
                dispatch(brand_success());
                message.success('Success');
            } else {
                dispatch(brand_faided());
                message.error('Error');
            }
        } catch (error) {
            dispatch(brand_faided());
            show_notification(error);
        }
    }
}
export const brand_start = () => ({
    type: action_types.BRAND_START,
})
export const brand_success = () => ({
    type: action_types.BRAND_SUCCESS,
})
export const brand_faided = () => ({
    type: action_types.BRAND_FAIDED,
})

export const get_list_brand_success = (data) => ({
    type: action_types.GET_LIST_BRAND_SUCCESS,
    data
})
export const get_brand_success = (data) => ({
    type: action_types.GET_BRAND_SUCCESS,
    data
})
export const on_change_brand_redux = (value, id) => ({
    type: action_types.ON_CHANGE_BRAND,
    value,
    id,
})
export const set_data_brand_redux = (data) => ({
    type: action_types.SET_DATA_BRAND,
    data,
})