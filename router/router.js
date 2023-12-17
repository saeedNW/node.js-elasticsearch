/** create application main router */
const mainRouter = require('express').Router();
/** import indices router */
const {indicesRouter} = require("./indices.router");
/** import blog router */
const {blogRouter} = require("./blog.router");

/** Application landing page router */
mainRouter.get('/', (req, res, next) => {
    return res.render("./pages/index");
});

/** initialize indices router */
mainRouter.use('/indices', indicesRouter);

/** initialize blogs router */
mainRouter.use('/blogs', blogRouter);

module.exports = {mainRouter}