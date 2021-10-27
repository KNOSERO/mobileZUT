import types from './types'

const add = item => ({
    type: types.ADD_PLAN, item
})

const setDay = item => ({
    type: types.SET_DAY, item
})


const reset = item => ({
    type: types.RESET_PLAN, item
})

export default {
    add,
    reset,
    setDay
}