import action_types from '@actions/action_types';

const initialState = {
    data_stylists: [],
    data_stylist: {},
    is_loading: false,
    is_result: false,
}

const stylist_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.STYLIST_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.STYLIST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.STYLIST_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_STYLIST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_stylists: action.data,
            }
        case action_types.GET_STYLIST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_stylist: action.data
            }
        case action_types.CREATE_STYLIST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_STYLIST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_STYLIST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_STYLIST_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_STYLIST:
            return {
                ...state,
                data_stylist: action.data,
            }
        case action_types.ON_CHANGE_STYLIST:
            let copyState = { ...state.data_stylist };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_stylist: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default stylist_reducers;