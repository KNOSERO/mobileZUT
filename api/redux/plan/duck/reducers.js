import types from './types'

const INITIAL_STATE = {
    mday: null,
    plan: [],
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.ADD_PLAN: 
            return {
                ...state, plan: action.item
            }
        case types.SET_DAY: 
            return {
                ...state, mday: action.item
            }
        case types.RESET_PLAN: 
            return {
                plan: [],
                mday: null,
            }
        default:
            return state
    }
}

export default authReducer;