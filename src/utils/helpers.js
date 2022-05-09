export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price / 100)
    // return '$' + price.toString().slice(0, 3) + '.' + price.toString().slice(3)
}

export const getUniqueValues = (products, type) => {
    console.log(
        products.map((product) => {
            return product[type]
        })
    )
    let unique = [
        'all',
        ...new Set(
            products
                .map((product) => {
                    return product[type]
                })
                .flat()
        ),
    ]
    return unique
}
