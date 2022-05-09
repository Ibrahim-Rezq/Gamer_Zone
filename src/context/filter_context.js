import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
    filterdProducts: [],
    allProducts: [],
    gridView: true,
    sort: 'price-lowest',
    filters: {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        minPrice: 0,
        maxPrice: 0,
        price: 0,
        shipping: false,
    },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { products } = useProductsContext()

    const setGridView = () => {
        dispatch({ type: SET_GRIDVIEW })
    }
    const setListView = () => {
        dispatch({ type: SET_LISTVIEW })
    }
    const updateSort = (e) => {
        const value = e.target.value
        dispatch({ type: UPDATE_SORT, payload: value })
    }

    const updateFilters = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === 'category') value = e.target.textContent
        if (name === 'color') value = e.target.dataset.color
        if (name === 'price') value = +value
        if (name === 'shipping') value = e.target.checked
        dispatch({
            type: UPDATE_FILTERS,
            payload: { ...state.filters, [name]: value },
        })
    }
    const clearFilters = () => {
        const filtersReset = {
            text: '',
            company: 'all',
            category: 'all',
            color: 'all',
            shipping: false,
        }
        dispatch({
            type: CLEAR_FILTERS,
            payload: { ...filtersReset },
        })
    }
    useEffect(() => {
        dispatch({ type: FILTER_PRODUCTS })
        dispatch({ type: SORT_PRODUCTS })
    }, [state.products, state.sort, state.filters])

    useEffect(() => {
        dispatch({ type: LOAD_PRODUCTS, payload: products })
    }, [products])

    return (
        <FilterContext.Provider
            value={{
                ...state,
                updateSort,
                setGridView,
                setListView,
                updateFilters,
                clearFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}
// make sure use
export const useFilterContext = () => {
    return useContext(FilterContext)
}
