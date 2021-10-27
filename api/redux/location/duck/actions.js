import types from './types'

const location = item => ({
    type: types.ADD_LOCATION, item
})

const mylocation = item => ({
    type: types.ADD_MY_LOCATION, item
})

const addRouts = item => ({
    type: types.ADD_ROUTE, item
})

const addPicture = item => ({
    type: types.ADD_PICTURE, item
})

const reset = item => ({
    type: types.RESET_LOCATION, item
})

export default {
    location,
    mylocation,
    addRouts,
    addPicture,
    reset
}