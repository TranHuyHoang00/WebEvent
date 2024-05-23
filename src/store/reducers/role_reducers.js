import action_types from '@actions/action_types';

const initialState = {
    data_roles: [],
    data_role: {},
    is_loading: false,
    is_result: false,
}

const role_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.ROLE_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.ROLE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.ROLE_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_ROLE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_roles: action.data,
            }
        case action_types.GET_ROLE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_role: action.data
            }
        case action_types.CREATE_ROLE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_ROLE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_ROLE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_ROLE_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_ROLE:
            return {
                ...state,
                data_role: action.data,
            }
        case action_types.ON_CHANGE_ROLE:
            let copyState = { ...state.data_role };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_role: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default role_reducers;