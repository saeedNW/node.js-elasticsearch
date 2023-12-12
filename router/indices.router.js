/** create indices router */
const indicesRouter = require('express').Router();
/** import indices controller functions */
const {createNewIndex, getAllIndexes, removeIndex} = require("../controllers/indices.controller");

/** new index creation route */
indicesRouter.post('/new', createNewIndex);

/** get indexes list route */
indicesRouter.get('/list', getAllIndexes);

/** remove an index route */
indicesRouter.delete('/remove/:indexName', removeIndex);

module.exports = {
    indicesRouter
}