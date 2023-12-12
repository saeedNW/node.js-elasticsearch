/** import http errors module */
const createHttpError = require("http-errors");
/** import elastic search client */
const {elasticClient} = require("../config/elastic.config");
/** import http status code module */
const httpStatus = require('http-status-codes');

/**
 * create new elastic search index process
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function createNewIndex(req, res, next) {
    try {
        /** extract data from request body */
        const {indexName} = req.body;

        /** throw error if the index was not found */
        if (!indexName) throw new createHttpError.UnprocessableEntity('invalid index name');

        /** check index existence */
        const indexExistence = await elasticClient.indices.exists({index: indexName});

        /** throw error if the index had already exists */
        if (indexExistence) throw new createHttpError.BadRequest('duplicated index name');

        /** create elastic search index */
        const creationResult = await elasticClient.indices.create({index: indexName});

        /** throw error if the creation process was unsuccessful */
        if (!creationResult.acknowledged) throw new createHttpError.InternalServerError('internal server error');

        /** send success response */
        return res.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            success: true,
            message: "index had been created successfully",
        })
    } catch (err) {
        next(err);
    }
}

/**
 * retrieve list of the created indexes
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function getAllIndexes(req, res, next) {
    try {
        /** retrieve indexes from elastic search client */
        let indices = await elasticClient.indices.getAlias();

        /**
         * define a regexp to filter indices data and
         * only retrieve the created indexes name.
         * @type {RegExp}
         */
        const regexp = /^\.+/;

        /**
         * restructure indices data to keep only created indexed names.
         * @type {string[]}
         */
        indices = Object.keys(indices).filter(item => !regexp.test(item));

        /** send success response */
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "request ended successfully",
            data: {
                indices
            }
        });
    } catch (err) {
        next(err);
    }
}

/**
 * index removal process
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function removeIndex(req, res, next) {
    try {
        /** retrieve index name from request params */
        const {indexName} = req.params;

        /** throw error if the index was not found */
        if (!indexName) throw new createHttpError.UnprocessableEntity('invalid index name')

        /** check index existence */
        const indexExistence = await elasticClient.indices.exists({index: indexName});

        /** throw error if the index doesn't exist */
        if (!indexExistence) throw new createHttpError.NotFound('index was not found');

        /** remove index from elastic search data */
        const removeResult = await elasticClient.indices.delete({index: indexName});

        /** throw error if the removal process was unsuccessful */
        if (!removeResult.acknowledged) throw new createHttpError.InternalServerError('internal server error');

        /** send success response */
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "index has been removed successfully",
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createNewIndex,
    removeIndex,
    getAllIndexes,
}