import { combineReducers } from 'redux'
import authReducer from './auth/duck'
import chatReducer from './chat/duck'
import planReducer from './plan/duck'
import groupReducer from './group/duck'
import locationReducer from "./location/duck";

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    plan: planReducer,
    group: groupReducer,
    location: locationReducer,
})

export default rootReducer