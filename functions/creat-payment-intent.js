require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
    if (event.body) {
        const { cart, totalAmount, shippingFee } = JSON.parse(event.body)
        const calculateOrderAmount = () => {
            return shippingFee + totalAmount
        }
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: 'usd',
            })
            return {
                statusCode: 200,
                body: JSON.stringify({
                    clientSecret: paymentIntent.client_secret,
                }),
            }
        } catch (error) {
            console.log(error)
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: error,
                }),
            }
        }
    } else
        return {
            statusCode: 200,
            body: 'creat-payment-intent',
        }
}
