import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            const { id, amount, color, product } = payload
            const tempItem = state.cart.find((item) => item.id === id + color)
            if (tempItem) {
                const tempCart = state.cart.map((item) => {
                    if (item.id === id + color) {
                        let newAmount = item.amount + amount
                        if (newAmount > item.max) newAmount = item.max
                        return { ...item, amount: newAmount }
                    } else {
                        return item
                    }
                })
                return { ...state, cart: tempCart }
            } else {
                const newItem = {
                    id: id + color,
                    name: product.name,
                    color,
                    amount,
                    image: product.images[0].url,
                    price: product.price,
                    max: product.stock,
                }
                return { ...state, cart: [...state.cart, newItem] }
            }
        case REMOVE_CART_ITEM:
            const tempit = state.cart.filter((item) => {
                return item.id !== payload
            })
            return { ...state, cart: tempit }
        case TOGGLE_CART_ITEM_AMOUNT:
            const tempCart = state.cart.map((item) => {
                if (item.id === payload.id) {
                    if (payload.value === 'add') {
                        let newAmount = item.amount + 1
                        if (newAmount > item.max) newAmount = item.max
                        return { ...item, amount: newAmount }
                    } else if (payload.value === 'sub') {
                        let newAmount = item.amount - 1
                        if (newAmount < 1) newAmount = 1
                        return { ...item, amount: newAmount }
                    }
                }
                return item
            })
            return { ...state, cart: tempCart }
        case COUNT_CART_TOTALS:
            if (state.cart.length > 0) {
                const tempTotal = state.cart
                    .map((item) => {
                        return item.price * item.amount
                    })
                    .reduce((a, b) => a + b)
                const tempTotalItems = state.cart
                    .map((item) => {
                        return item.amount
                    })
                    .reduce((a, b) => a + b)
                return {
                    ...state,
                    totalItems: tempTotalItems,
                    totalAmount: tempTotal,
                }
            } else return state

        case CLEAR_CART:
            return { ...state, cart: [], totalItems: 0 }
        default:
            throw new Error(`No Matching "${type}" - action type`)
    }
}

export default cart_reducer
