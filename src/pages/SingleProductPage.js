import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
    Loading,
    Error,
    ProductImages,
    AddToCart,
    Stars,
    PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const {
        singleProductLoading,
        singleProductError,
        singleProduct,
        fetchSingleProduct,
    } = useProductsContext()
    useEffect(() => {
        fetchSingleProduct(url + productId)
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        singleProductError &&
            setTimeout(() => {
                navigate(-1)
            }, 3000)
        // eslint-disable-next-line
    }, [singleProductError])

    const {
        id,
        name,
        price,
        description,
        stock,
        stars,
        reviews,
        company,
        images,
    } = singleProduct
    return (
        <SingleProductWrapper>
            {singleProductLoading ? (
                <Loading />
            ) : singleProductError ? (
                <Error />
            ) : (
                <>
                    <PageHero title={name} isProduct />
                    <div className='section section-center page'>
                        <Link className='btn' to='/products'>
                            back to products
                        </Link>
                        <div className='product-center'>
                            <ProductImages images={images} />
                            <section className='content'>
                                <h2>{name}</h2>
                                <Stars stars={stars} reviews={reviews} />
                                <h5 className='price'>{formatPrice(price)}</h5>
                                <p className='desc'>{description}</p>
                                <p className='info'>
                                    <span>Available: </span>
                                    {stock > 0 ? 'In Stock' : 'Out Of Stock'}
                                </p>
                                <p className='info'>
                                    <span>SKU </span>
                                    {id}
                                </p>
                                <p className='info'>
                                    <span>Brand </span>
                                    {company}
                                </p>
                                <hr />
                                {stock > 0 && (
                                    <AddToCart product={singleProduct} />
                                )}
                            </section>
                        </div>
                    </div>
                </>
            )}
        </SingleProductWrapper>
    )
}

const SingleProductWrapper = styled.main`
    .product-center {
        display: grid;
        gap: 4rem;
        margin-top: 2rem;
    }
    .price {
        color: var(--clr-primary-5);
    }
    .desc {
        line-height: 2;
        max-width: 45em;
    }
    .info {
        text-transform: capitalize;
        width: 300px;
        display: grid;
        grid-template-columns: 125px 1fr;
        span {
            font-weight: 700;
        }
    }

    @media (min-width: 992px) {
        .product-center {
            grid-template-columns: 1fr 1fr;
            align-items: center;
        }
        .price {
            font-size: 1.25rem;
        }
    }
`

export default SingleProductPage
