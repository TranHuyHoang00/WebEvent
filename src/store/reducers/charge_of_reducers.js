import action_types from '@actions/action_types';

const initialState = {
    data_charge_ofs: [],
    data_charge_of: {},
    is_loading: false,
    is_result: false,
}

const charge_of_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.CHARGE_OF_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.CHARGE_OF_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.CHARGE_OF_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_CHARGE_OF_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_charge_ofs: action.data,
            }
        case action_types.GET_CHARGE_OF_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_charge_of: action.data
            }
        case action_types.CREATE_CHARGE_OF_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_CHARGE_OF_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_CHARGE_OF_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_CHARGE_OF_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_CHARGE_OF:
            return {
                ...state,
                data_charge_of: action.data,
            }
        case action_types.ON_CHANGE_CHARGE_OF:
            let copyState = { ...state.data_charge_of };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_charge_of: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default charge_of_reducers;