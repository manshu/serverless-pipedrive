const dotenv = require('dotenv')
exports.handler = async function (event, context) {
    const path = event.path.replace(/\.netlify\/functions\/[^\/]+/, '');
    const segments = path.split('/').filter(e => e);

    console.log(segments);

    switch (event.httpMethod) {
        case 'GET':
            if (segments.length === 2) {
                return require('./read-all').handler(event, context)
            }
            if (segments.length === 3) {
                event.id = segments[2]
                return require('./read').handler(event, context)
            }
        case 'POST':
            return require('./create').handler(event, context)
        case 'DELETE':
            if (segments.length === 3) {
                event.id = segments[2]
                return require('./delete').handler(event, context)
            }
        case 'PATCH':
            if (segments.length === 3) {
                event.id = segments[2]
                return require('./update').handler(event, context)
            }
        default:
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Route Not Found" }),
            };

    }



};