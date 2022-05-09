import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
    const { cart } = useCartContext()
    return (
        <main>
            <PageHero title={'checkout'} />
            <CheckoutWrapper className='page'>
                {cart.length < 1 ? (
                    <div className='empty'>
                        <h2>Your Cart is Empty</h2>
                        <Link className='btn' to='/products'>
                            Fill it
                        </Link>
                    </div>
                ) : (
                    <>
                        <StripeCheckout />
                    </>
                )}
            </CheckoutWrapper>
        </main>
    )
}
const CheckoutWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .empty {
        text-align: center;
    }
`
export default CheckoutPage
