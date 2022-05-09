require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.API_KEY })
    .base('appk5qH312z6fZOBl')
    .table('react-app')

exports.handler = async function (event, context) {
    try {
        const { records } = await airtable.list()
        const data = records.map((record) => {
            const { id } = record
            const {
                name,
                images,
                price,
                category,
                company,
                featured,
                shipping,
                colors,
            } = record.fields
            return {
                id,
                name,
                colors,
                image: images[0].url,
                price,
                category,
                company,
                featured,
                shipping,
            }
        })
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    } catch (e) {
        return {
            statusCode: 200,
            body: JSON.stringify({ e }),
        }
    }
}

// "start": "NODE_ENV=development ./node_modules/.bin/netlify-lambda serve src",
// "build": "NODE_ENV=production ./node_modules/.bin/netlify-lambda build src"

// const productExample = {
//     id: 'recNZ0koOqEmilmoz',
//     name: 'entertainment center',
//     price: 59999,
//     image: 'https://dl.airtable.com/.attachmentThumbnails/65708b701baa3a84883ad48301624b44/2de058af?ts=1651558064&userId=usrQMwWEPx18KgLcP&cs=5ba187bf7ba6778b',
//     featured: true,
//     colors: ['#000', '#ff0000'],
//     company: 'caressa',
//     description:
//         'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'living room',
//     shipping: true,
// }

// const singleProductExample = {
//     id: 'recrfxv3EwpvJwvjq',
//     colors: ['#000', '#00ff00'],
// }
