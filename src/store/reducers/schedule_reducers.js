import action_types from '@actions/action_types';

const initialState = {
    data_schedules: [],
    data_schedule_dates: [],
    data_schedule: {},
    is_loading: false,
    is_result: false,
}

const schedule_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.SCHEDULE_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.SCHEDULE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SCHEDULE_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_SCHEDULE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_schedules: action.data,
            }
        case action_types.GET_LIST_SCHEDULE_DATE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_schedule_dates: action.data,
            }
        case action_types.GET_SCHEDULE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_schedule: action.data
            }
        case action_types.CREATE_SCHEDULE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_SCHEDULE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_SCHEDULE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_SCHEDULE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_SCHEDULE:
            return {
                ...state,
                data_schedule: action.data,
            }
        case action_types.ON_CHANGE_SCHEDULE:
            let copyState = { ...state.data_schedule };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_schedule: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default schedule_reducers;