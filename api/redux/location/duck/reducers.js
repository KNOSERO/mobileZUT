import types from './types'


const INITIAL_STATE = {
    myPosition: {
        lat: 53.4287556,
        lng: 14.5527487
    },
    location: null,
    route: null,
    picture: null,
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.ADD_LOCATION:
            return {
                ...state, location: action.item
            }
        case types.ADD_MY_LOCATION:
            return {
                ...state,
                myPosition: {
                    lat: action.item.lat,
                    lng: action.item.lng
                }
            }
        case types.ADD_ROUTE:
            return {
                ...state, route: action.item
            }
        case types.ADD_PICTURE:
            return {
                ...state, picture: action.item
            }
        case types.RESET_LOCATION:
            return {
                ...state, picture: null, location: null, route: null,
            }
        default:
            return state
    }
}

export default authReducer;