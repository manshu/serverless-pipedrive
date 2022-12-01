const dotenv = require('dotenv')
const Pipedrive = require('pipedrive')

const defaultClient = Pipedrive.ApiClient.instance;
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = process.env.PIPEDRIVE_API_KEY;

exports.handler = async function (event, context) {
    const id = event.id
    const api = new Pipedrive.LeadsApi();
    const records = await api.deleteLead(id)

    return {
        statusCode: 200,
        body: JSON.stringify(records),
    };
};