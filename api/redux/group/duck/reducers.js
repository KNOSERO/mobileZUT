import types from './types'

const INITIAL_STATE = {
    users: [],
    group: [],
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.ADD_GROUP: 
            return {
                ...state, group: action.item
            }
        case types.ADD_USERS: 
            return {
                ...state, users: action.item
            }
        case types.RESET_GROUP: 
            return {
                group: [],
                users: [],
            }
        default:
            return state
    }
}

export default authReducer;