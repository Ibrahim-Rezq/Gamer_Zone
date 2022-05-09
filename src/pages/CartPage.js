import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'

const CartPage = () => {
    const { cart } = useCartContext()

    if (cart.length < 1) {
        return (
            <CartWrapper className='page-100'>
                <div className='empty'>
                    <h2>Your cart is Empty</h2>
                    <Link to={'/products'} className='btn'>
                        Fill it
                    </Link>
                </div>
            </CartWrapper>
        )
    }

    return (
        <main>
            <PageHero title='cart' />
            <CartWrapper className='page'>
                <CartContent />
            </CartWrapper>
        </main>
    )
}

const CartWrapper = styled.main`
    .empty {
        text-align: center;
        h2 {
            margin-bottom: 1rem;
            text-transform: none;
        }
    }
`

export default CartPage
