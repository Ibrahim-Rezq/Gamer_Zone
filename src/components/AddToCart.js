import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
    const { addToCart } = useCartContext()
    const { id, stock, colors } = product
    const [mainColor, setMainColor] = useState(colors[0])
    const [amount, setAmount] = useState(1)
    const increase = () => {
        amount < stock && setAmount(amount + 1)
    }
    const decrease = () => {
        amount > 1 && setAmount(amount - 1)
    }
    return (
        <AddToCartWrapper>
            <div className='colors'>
                <span>Colors : </span>
                <div>
                    {colors.map((color, index) => {
                        return (
                            <button
                                className={
                                    mainColor === color
                                        ? 'color-btn active'
                                        : 'color-btn'
                                }
                                style={{ background: color }}
                                key={index}
                                onClick={() => {
                                    setMainColor(colors[index])
                                }}
                            >
                                {mainColor === color && <FaCheck />}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className='btn-container'>
                <AmountButtons
                    amount={amount}
                    increase={increase}
                    decrease={decrease}
                />
                <Link
                    onClick={() => {
                        addToCart({ id, color: mainColor, amount, product })
                    }}
                    className='btn'
                    to='/cart'
                >
                    Add to Cart
                </Link>
            </div>
        </AddToCartWrapper>
    )
}

const AddToCartWrapper = styled.section`
    margin-top: 2rem;
    .colors {
        display: grid;
        grid-template-columns: 125px 1fr;
        align-items: center;
        margin-bottom: 1rem;
        span {
            text-transform: capitalize;
            font-weight: 700;
        }
        div {
            display: flex;
        }
    }
    .color-btn {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
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
            font-size: 0.75rem;
            color: var(--clr-white);
        }
    }
    .active {
        opacity: 1;
    }
    .btn-container {
        margin-top: 2rem;
    }

    .btn {
        margin-top: 1rem;
        width: 140px;
    }
`
export default AddToCart
