import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, { type, payload }) => {
    switch (type) {
        // sidebar actions

        case SIDEBAR_OPEN:
            return { ...state, isSidebarOpen: true }
        case SIDEBAR_CLOSE:
            return { ...state, isSidebarOpen: false }
        // Products actions

        case GET_PRODUCTS_BEGIN:
            return { ...state, productsLoading: true }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                productsLoading: false,
                products: payload,
                featuredProducts: payload.filter((product) => {
                    return product.featured
                }),
                productsError: false,
            }
        case GET_PRODUCTS_ERROR:
            return { ...state, productsLoading: false, productsError: true }
        // single Product actions

        case GET_SINGLE_PRODUCT_BEGIN:
            return {
                ...state,
                singleProductLoading: true,
                singleProductError: false,
            }
        case GET_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                singleProductLoading: false,
                singleProductError: false,
                singleProduct: payload,
            }
        case GET_SINGLE_PRODUCT_ERROR:
            return {
                ...state,
                singleProductLoading: false,
                singleProductError: true,
            }

        default:
            throw new Error(`No Matching "${type}" - action type`)
    }
}

export default products_reducer
