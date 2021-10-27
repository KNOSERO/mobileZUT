import types from './types'

const add = item => ({
    type: types.ADD_CHAT, item
})

const addCatch = item => ({
    type: types.ADD_CATCH, item
})

const reset = item => ({
    type: types.RESET_CHAT, item
})

export default {
    add,
    reset,
    addCatch
}