import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, { type, payload }) => {
    switch (type) {
        case LOAD_PRODUCTS:
            const maxPrice = Math.max(...payload.map((p) => p.price))
            return {
                ...state,
                allProducts: [...payload],
                filterdProducts: [...payload],
                filters: {
                    ...state.filters,
                    maxPrice: maxPrice,
                    price: maxPrice,
                },
            }
        case SET_LISTVIEW:
            return {
                ...state,
                gridView: false,
            }
        case SET_GRIDVIEW:
            return {
                ...state,
                gridView: true,
            }
        case UPDATE_SORT:
            return {
                ...state,
                sort: payload,
            }
        case SORT_PRODUCTS:
            const { sort, filterdProducts } = state
            let tempSort = []
            if (sort === 'price-lowest')
                tempSort = filterdProducts.sort((a, b) => a.price - b.price)
            if (sort === 'price-highest')
                tempSort = filterdProducts.sort((a, b) => b.price - a.price)
            if (sort === 'name-a')
                tempSort = filterdProducts.sort((a, b) => {
                    return a.name.toUpperCase() < b.name.toUpperCase()
                        ? -1
                        : a.name.toUpperCase() > b.name.toUpperCase()
                        ? 1
                        : 0
                })
            if (sort === 'name-z')
                tempSort = filterdProducts.sort((a, b) => {
                    return b.name.toUpperCase() < a.name.toUpperCase()
                        ? -1
                        : b.name.toUpperCase() > a.name.toUpperCase()
                        ? 1
                        : 0
                })
            return {
                ...state,
                filterdProducts: [...tempSort],
            }
        case UPDATE_FILTERS:
            return {
                ...state,
                filters: { ...payload },
            }
        case FILTER_PRODUCTS:
            const {
                allProducts,
                filters: { text, company, category, color, price, shipping },
            } = state
            let tempProducts = [...allProducts]
            if (text) {
                tempProducts = tempProducts.filter((product) => {
                    return product.name.toLowerCase().startsWith(text)
                })
            }
            if (company !== 'all') {
                tempProducts = tempProducts.filter((product) => {
                    return product.company === company
                })
            }
            if (category !== 'all') {
                tempProducts = tempProducts.filter((product) => {
                    return product.category === category
                })
            }
            if (color !== 'all') {
                tempProducts = tempProducts.filter((product) => {
                    return product.colors.find((c) => c === color)
                })
            }
            if (shipping) {
                tempProducts = tempProducts.filter((product) => {
                    return product.shipping
                })
            }
            if (price) {
                tempProducts = tempProducts.filter((product) => {
                    return product.price <= price
                })
            }
            return {
                ...state,
                filterdProducts: [...tempProducts],
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: { ...payload, price: state.filters.maxPrice },
            }
        default:
            throw new Error(`No Matching "${type}" - action type`)
    }
}

export default filter_reducer
