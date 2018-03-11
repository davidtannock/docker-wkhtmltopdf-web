'use strict';

const wkhtmltopdf = require('wkhtmltopdf');
const express = require('express');
const bodyParser = require('body-parser');

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const HTTP_HOST = process.env.HTTP_HOST || '0.0.0.0';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.post('/', (request, response) => {
    // Parse post data.
    let urlOrHtml = '';
    let options = request.body;
    if (typeof request.body.urlOrHtml !== 'string') {
        response.sendStatus(400);
        return;
    }
    urlOrHtml = options.urlOrHtml;
    delete options.urlOrHtml;

    // Send pdf document.
    response.setHeader('Content-Type', 'application/pdf');
    let stream = wkhtmltopdf(urlOrHtml, options);
    stream.pipe(response);
});
app.listen(HTTP_PORT, HTTP_HOST);