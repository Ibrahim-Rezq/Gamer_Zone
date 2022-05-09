require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.API_KEY })
    .base('appk5qH312z6fZOBl')
    .table('react-app')

exports.handler = async function (event, context) {
    if (event.queryStringParameters) {
        const { id } = event.queryStringParameters
        const record = await airtable.retrieve(id)
        const {
            name,
            images,
            price,
            category,
            description,
            company,
            featured,
            shipping,
            colors,
            stars,
            stock,
            reviews,
        } = record.fields
        const data = {
            id,
            name,
            images,
            price,
            colors,
            description,
            category,
            company,
            featured,
            shipping,
            stars,
            stock,
            reviews,
        }
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    } else {
        return {
            statusCode: 500,
            body: 'Error',
        }
    }
}
