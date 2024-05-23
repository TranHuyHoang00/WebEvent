import action_types from '@actions/action_types';

const initialState = {
    data_makeup_hairs: [],
    data_makeup_hair: {},
    is_loading: false,
    is_result: false,
}

const makeup_hair_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.MAKEUP_HAIR_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.MAKEUP_HAIR_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.MAKEUP_HAIR_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_MAKEUP_HAIR_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_makeup_hairs: action.data,
            }
        case action_types.GET_MAKEUP_HAIR_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_makeup_hair: action.data
            }
        case action_types.CREATE_MAKEUP_HAIR_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_MAKEUP_HAIR_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_MAKEUP_HAIR_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_MAKEUP_HAIR_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_MAKEUP_HAIR:
            return {
                ...state,
                data_makeup_hair: action.data,
            }
        case action_types.ON_CHANGE_MAKEUP_HAIR:
            let copyState = { ...state.data_makeup_hair };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_makeup_hair: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default makeup_hair_reducers;