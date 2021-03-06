import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
    const {
        filters: {
            text,
            company,
            category,
            color,
            minPrice,
            maxPrice,
            price,
            shipping,
        },
        updateFilters,
        clearFilters,
        allProducts,
    } = useFilterContext()
    const Categories = getUniqueValues(allProducts, 'category')
    const Companies = getUniqueValues(allProducts, 'company')
    const Colors = getUniqueValues(allProducts, 'colors')
    console.log(Colors)

    return (
        <FiltersWrapper>
            <div className='content'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                    }}
                >
                    <div className='form-control'>
                        <input
                            type='text'
                            name='text'
                            placeholder='Search'
                            className='search-input'
                            value={text}
                            onChange={updateFilters}
                        />
                    </div>
                    <div className='form-control'>
                        <h5>Catagories</h5>
                        <div>
                            {Categories.map((cat, index) => {
                                return (
                                    <button
                                        onClick={updateFilters}
                                        className={
                                            cat.toLowerCase() === category
                                                ? 'active'
                                                : ''
                                        }
                                        key={index}
                                        type='button'
                                        name={'category'}
                                    >
                                        {cat}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className='form-control'>
                        <h5>Companies</h5>
                        <select
                            name='company'
                            id='companyId'
                            value={company}
                            onChange={updateFilters}
                            className='company'
                        >
                            {Companies.map((com, index) => {
                                return (
                                    <option key={index} value={com}>
                                        {com}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='form-control'>
                        <h5>Colors</h5>
                        <div className='colors'>
                            {Colors.map((col, index) => {
                                if (col === 'all')
                                    return (
                                        <button
                                            key={index}
                                            data-color={'all'}
                                            name='color'
                                            onClick={updateFilters}
                                            className={
                                                color === 'all'
                                                    ? 'all-btn active'
                                                    : 'all-btn'
                                            }
                                        >
                                            All
                                        </button>
                                    )
                                else
                                    return (
                                        <button
                                            key={index}
                                            data-color={col}
                                            name='color'
                                            onClick={updateFilters}
                                            style={{ background: col }}
                                            className={
                                                color === col
                                                    ? 'color-btn active'
                                                    : 'color-btn'
                                            }
                                        >
                                            {color === col ? <FaCheck /> : null}
                                        </button>
                                    )
                            })}
                        </div>
                    </div>
                    <div className='form-control'>
                        <h5>Price</h5>
                        <p className='price'>{formatPrice(price)}</p>
                        <input
                            type='range'
                            name='price'
                            id='priceId'
                            onChange={updateFilters}
                            min={minPrice}
                            max={maxPrice}
                            value={price}
                        />
                    </div>
                    <div className='form-control shipping'>
                        <label htmlFor='shipping'>Free Shiping</label>
                        <input
                            type='checkbox'
                            name='shipping'
                            id='shipping'
                            onChange={updateFilters}
                            checked={shipping}
                        />
                    </div>
                </form>
                <button
                    type='button'
                    className='clear-btn'
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>
            </div>
        </FiltersWrapper>
    )
}

const FiltersWrapper = styled.section`
    .form-control {
        margin-bottom: 1.25rem;
        h5 {
            margin-bottom: 0.5rem;
        }
    }
    .search-input {
        padding: 0.5rem;
        background: var(--clr-grey-10);
        border-radius: var(--radius);
        border-color: transparent;
        letter-spacing: var(--spacing);
    }
    .search-input::placeholder {
        text-transform: capitalize;
    }

    button {
        display: block;
        margin: 0.25em 0;
        padding: 0.25rem 0;
        text-transform: capitalize;
        background: transparent;
        border: none;
        border-bottom: 1px solid transparent;
        letter-spacing: var(--spacing);
        color: var(--clr-grey-5);
        cursor: pointer;
    }
    .active {
        border-color: var(--clr-grey-5);
    }
    .company {
        background: var(--clr-grey-10);
        border-radius: var(--radius);
        border-color: transparent;
        padding: 0.25rem;
    }
    .colors {
        display: flex;
        align-items: center;
    }
    .color-btn {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: #222;
        margin-right: 0.5rem;
        border: none;
        cursor: pointer;
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #333333;
        svg {
            font-size: 0.5rem;
            color: var(--clr-white);
        }
    }
    .all-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.5rem;
        opacity: 0.5;
    }
    .active {
        opacity: 1;
    }
    .all-btn .active {
        text-decoration: underline;
    }
    .price {
        margin-bottom: 0.25rem;
    }
    .shipping {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        text-transform: capitalize;
        column-gap: 0.5rem;
        font-size: 1rem;
    }
    .clear-btn {
        background: var(--clr-red-dark);
        color: var(--clr-white);
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius);
    }
    @media (min-width: 768px) {
        .content {
            position: sticky;
            top: 1rem;
        }
    }
`

export default Filters
