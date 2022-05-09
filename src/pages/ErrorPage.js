import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
    return (
        <ErrorWrapper className='page-100'>
            <section>
                <h1>404</h1>
                <h3> page is not found</h3>
                <Link to='/' className='btn'>
                    Return Home
                </Link>
            </section>
        </ErrorWrapper>
    )
}

const ErrorWrapper = styled.main`
    background: var(--clr-primary-10);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    h1 {
        font-size: 10rem;
    }
    h3 {
        text-transform: none;
        margin-bottom: 2rem;
    }
`

export default ErrorPage
