import types from './types'

const INITIAL_STATE = {
    token: null,
    user: {
        email: null,
        password: null,
    }
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.ADD_USER: 
            return {
                ...state, user: action.item
            }
        case types.NEW_TOCKEN: 
            return {
                ...state, token: action.item
            }
        case types.RESET_USER: 
            return {
                user: {
                    email: null,
                    password: null,
                }, token: null
            }
        default:
            return state
    }
}

export default authReducer;