import types from './types'

const INITIAL_STATE = {
    catch: null,
    chat: [],
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.ADD_CHAT: 
            return {
                ...state, chat: action.item
            }
        case types.ADD_CATCH: 
            return {
                ...state, catch: action.item
            }
        case types.RESET_CHAT: 
            return {
                chat: [],
                catch: null,
            }
        default:
            return state
    }
}

export default authReducer;