/** create application main router */
const mainRouter = require('express').Router();
/** import indices router */
const {indicesRouter} = require("./indices.router");

/** Application landing page router */
mainRouter.get('/', (req, res, next) => {
    return res.render("./pages/index");
});

/** initialize indices router */
mainRouter.use('/indices', indicesRouter);

module.exports = {mainRouter}