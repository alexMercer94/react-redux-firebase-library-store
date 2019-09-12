import { SEARCH_USER } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_USER:
            return {
                ...state,
                name: action.user.name,
                surname: action.user.surname,
                code: action.user.code,
                career: action.user.career
            };
        default:
            return state;
    }
}
