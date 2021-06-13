const express = require('express');
const app = express();
const fetch = require('node-fetch');
const PORT = 80;
const packageName = "degem-rechev-wltp";
const idRouter = require('./Routers/idRouter')
const modelCodeRouter = require('./Routers/modelCodeRouter');

app.use("/id", function (req, res, next){
    req.headers = {
        packageName: packageName
    };
    req.fetch = fetch;
    next();
}, idRouter);

app.use("/model_code", function (req, res, next) {
    req.headers = {
        packageName: packageName
    };
    req.fetch = fetch;
    next();
}, modelCodeRouter);

app.listen(PORT, function(error) {
    if(error) {
        console.log("Error in server setup.");
    } else {
        console.log(`Server listening on port ${PORT}`);
    }
});