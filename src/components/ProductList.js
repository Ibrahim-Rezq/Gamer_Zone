import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
    const { filterdProducts, gridView } = useFilterContext()
    if (filterdProducts.length < 1) return <h5>no thing found</h5>
    else if (gridView) return <GridView Products={filterdProducts} />
    else
        return (
            <>
                <ListView Products={filterdProducts} />
            </>
        )
}

export default ProductList
