/** import client from elasticsearch module */
const {Client} = require('@elastic/elasticsearch');
/** import elastic related env variables */
const {ELASTIC_USERNAME, ELASTIC_PASSWORD, ELASTIC_HOST} = process.env;

/**
 * initialize new instants for elastic client
 * @type {Client}
 */
const elasticClient = new Client({
    'node': ELASTIC_HOST,
    'auth': {
        username: ELASTIC_USERNAME,
        password: ELASTIC_PASSWORD
    },
    'tls': {
        rejectUnauthorized: false
    }
})

module.exports = {
    elasticClient
}