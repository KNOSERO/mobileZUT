import types from './types'

const add = item => ({
    type: types.ADD_GROUP, item
})

const addUsers = item => ({
    type: types.ADD_USERS, item
})

const reset = item => ({
    type: types.RESET_GROUP, item
})

export default {
    add,
    reset,
    addUsers
}