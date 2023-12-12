/** import express module */
const express = require('express');
/** import express ejs layout module */
const expressEjsLayout = require("express-ejs-layouts");
/** import path module */
const path = require("path");
/** import main router file */
const {mainRouter} = require("./router/router");

/** initialize dotenv module */
require('dotenv').config();

/** create application instants */
const app = express();
/** create http server */
const server = require('http').createServer(app);

/**
 * define server port
 * @type {number|number}
 */
const PORT = parseInt(process.env.PORT, 10) || 3000;

/** initialize express json body parser */
app.use(express.json());
/** initialize express urlencoded body parser */
app.use(express.urlencoded({extended: true}));
/** initialize express statics */
app.use(express.static(path.resolve("./public")));

/** initialize View Engine */
app.set("view engine", "ejs");
/** initialize express-ejs-layouts */
app.use(expressEjsLayout);
/** set view files location */
app.set("views", path.resolve("./resource/views"));
/** define main layout file location */
app.set("layout", "./layouts/main");

app.use(mainRouter);

/**
 * system 404 error handler
 */
app.use((req, res, next) => {
    /** return error */
    return res.status(404).json({
        status: 404,
        success: false,
        message: "Requested route was not found"
    });
});

/**
 * system error handler
 */
app.use((error, req, res, next) => {
    /**
     * define error status
     * @type {*|number}
     */
    const status = error?.status || 500;

    /**
     * define error message
     * @type {*|string}
     */
    const message = error?.message || 'Server Internal Error';

    /** log the error in console */
    console.error(error);

    /** return error */
    return res.status(status).json({
        status,
        success: false,
        message
    });
});

/** start server */
server.listen(PORT, () => {
    /** print successful application start message */
    console.log(`running > http://localhost:${PORT}`);
});