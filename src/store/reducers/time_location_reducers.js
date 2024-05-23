import action_types from '@actions/action_types';

const initialState = {
    data_time_locations: [],
    data_time_location: {},
    is_loading: false,
    is_result: false,
}

const time_location_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.TIME_LOCATION_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.TIME_LOCATION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.TIME_LOCATION_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_TIME_LOCATION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_time_locations: action.data,
            }
        case action_types.GET_TIME_LOCATION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_time_location: action.data
            }
        case action_types.CREATE_TIME_LOCATION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_TIME_LOCATION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_TIME_LOCATION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_TIME_LOCATION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_TIME_LOCATION:
            return {
                ...state,
                data_time_location: action.data,
            }
        case action_types.ON_CHANGE_TIME_LOCATION:
            let copyState = { ...state.data_time_location };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_time_location: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default time_location_reducers;