import types from './types'

const add = item => ({
    type: types.ADD_USER, item
})

const newToken = item => ({
    type: types.NEW_TOCKEN, item
})

const reset = item => ({
    type: types.RESET_USER, item
})

export default {
    add,
    newToken,
    reset
}