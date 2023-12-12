/** create application main router */
const mainRouter = require('express').Router();

/** Application landing page router */
mainRouter.get('/', (req, res, next) => {
    return res.render("./pages/index");
})

module.exports = {mainRouter}