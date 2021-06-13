const express = require('express');
const router = express.Router();

router.get("/:id", function(request, response) {
    response.write(`Package name is ${request.headers.packageName}.\n`);
    response.write("You have reached the /id/:id router.");
    response.end();
})

module.exports = router;