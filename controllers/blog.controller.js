/** import http errors module */
const createHttpError = require("http-errors");
/** import elastic search client */
const {elasticClient} = require("../config/elastic.config");
/** import http status code module */
const httpStatus = require('http-status-codes');

/**
 * new blog creation process
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function createNewBlog(req, res, next) {
    try {
        /** extract data from request body */
        const {title, author, text} = req.body;

        /** create new blog */
        const creationResult = await elasticClient.index({
            index: 'blog',
            document: {
                title,
                text,
                author
            }
        });

        /** throw error if the creation process was unsuccessful */
        if (creationResult?.result !== 'created')
            throw new createHttpError.InternalServerError('internal server error');

        /** send success response */
        return res.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            success: true,
            message: "blog had been created successfully",
        });
    } catch (err) {
        next(err);
    }
}

/**
 * retrieve all blogs process
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function getAllBlogs(req, res, next) {
    try {
        /** extract query data from request params */
        const value = req.params.value;

        /** retrieve the blogs from elastic */
        const blogs = await elasticClient.search({
            index: 'blog',
            q: value
        });

        /** send success response */
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "request ended successfully",
            data: {
                blogs: blogs.hits.hits
            }
        });
    } catch (err) {
        next(err);
    }
}

/**
 * blog removal process
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function removeBlog(req, res, next) {
    try {
        /** extract blog id from request params */
        const {id} = req.params;

        /** remove blog from elastic */
        const deletedResult = await elasticClient.deleteByQuery({
            index: 'blog',
            query: {
                match: {
                    _id: id
                }
            }
        });

        /** throe error if removal process was not successful */
        if (deletedResult.deleted !== 1)
            throw new createHttpError.InternalServerError('internal server error');

        /** send success response */
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "post has been removed successfully",
        });
    } catch (err) {
        next(err);
    }
}

/**
 * blog update process using index method
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function updateBlogWithIndex(req, res, next) {
    try {
        /** extract blog id from request params */
        const {id} = req.params;
        /** extract update data from request body */
        const data = req.body;

        /** remove empty data */
        Object.keys(data).forEach(key => {
            if (!data[key]) delete data[key]
        });

        /** retrieve blog info from elastic search */
        const blog = (await elasticClient.search({
            'index': 'blog',
            'query': {
                'match': {'_id': id}
            }
        })).hits.hits?.[0] || {};

        /** extract blog data from retrieved info */
        const payload = blog?._source || {}

        /** update blog  */
        const updateResult = await elasticClient.index({
            'index': 'blog',
            'id': id,
            'body': {...payload, ...data}
        });

        /** throe error if removal process was not successful */
        if (updateResult.result !== 'updated')
            throw new createHttpError.InternalServerError('internal server error');

        /** send success response */
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "post has been updated successfully",
        });
    } catch (error) {
        next(error)
    }
}

/**
 * blog update process using update method
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function updateBlogWithUpdate(req, res, next) {
    try {
        /** extract blog id from request params */
        const {id} = req.params;
        /** extract update data from request body */
        const data = req.body;

        /** remove empty data */
        Object.keys(data).forEach(key => {
            if (!data[key]) delete data[key]
        });

        /** update blog  */
        const updateResult = await elasticClient.update({
            'index': 'blog',
            'id': id,
            'doc': data
        });

        /** throe error if removal process was not successful */
        if (updateResult.result !== 'updated')
            throw new createHttpError.InternalServerError('internal server error');

        /** send success response */
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "post has been updated successfully",
        });
    } catch (error) {
        next(error)
    }
}

/**
 * find post by title
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function searchByTitle(req, res, next) {
    try {
        /** extract title from request query */
        const {title} = req.query;

        /** retrieve blog from elastic */
        const result = await elasticClient.search({
            index: 'blog',
            query: {
                match: {
                    title
                }
            }
        });

        /** send success response */
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "requested successfully",
            data: {
                post: result.hits.hits
            }
        });
    } catch (err) {
        next(err);
    }
}

/**
 * find post by multiply fields
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function searchByMultiField(req, res, next) {
    try {
        /** extract search data from request query */
        const {search} = req.query;

        /** retrieve blog from elastic */
        const result = await elasticClient.search({
            index: 'blog',
            query: {
                multi_match: {
                    query: search,
                    fields: ["title", "text", "author"]
                }
            }
        });

        /** send success response */
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "requested successfully",
            data: {
                posts: result.hits.hits
            }
        });
    } catch (err) {
        next(err);
    }
}

/**
 * find post by regexp
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function searchByRegexp(req, res, next) {
    try {
        /** extract search data from request query */
        const {search} = req.query;

        /** retrieve blog from elastic */
        const result = await elasticClient.search({
            index: 'blog',
            query: {
                regexp: {
                    title: `.*${search}.*`
                }
            }
        });

        /** send success response */
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "requested successfully",
            data: {
                posts: result.hits.hits
            }
        });
    } catch (err) {
        next(err);
    }
}

/**
 * find post based by multiply fields and regexp
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {Promise<*>}
 */
async function findBlogByMultiField(req, res, next) {
    try {
        /** extract search data from request query */
        const {search} = req.query;

        /** retrieve blog from elastic */
        const result = await elasticClient.search({
            index: 'blog',
            query: {
                bool: {
                    should: [
                        {
                            regexp: {title: `.*${search}.*`}
                        },
                        {
                            regexp: {author: `.*${search}.*`}
                        },
                        {
                            regexp: {text: `.*${search}.*`}
                        },
                    ]
                }
            }
        });

        /** send success response */
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            success: true,
            message: "requested successfully",
            data: {
                posts: result.hits.hits
            }
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllBlogs,
    createNewBlog,
    removeBlog,
    updateBlogWithIndex,
    updateBlogWithUpdate,
    searchByTitle,
    searchByMultiField,
    searchByRegexp,
    findBlogByMultiField,
}