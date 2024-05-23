import action_types from '@actions/action_types';

const initialState = {
    data_devices: [],
    data_device: {},
    is_loading: false,
    is_result: false,
}

const device_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.DEVICE_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.DEVICE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DEVICE_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_DEVICE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_devices: action.data,
            }
        case action_types.GET_DEVICE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_device: action.data
            }
        case action_types.CREATE_DEVICE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_DEVICE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_DEVICE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_DEVICE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_DEVICE:
            return {
                ...state,
                data_device: action.data,
            }
        case action_types.ON_CHANGE_DEVICE:
            let copyState = { ...state.data_device };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_device: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default device_reducers;