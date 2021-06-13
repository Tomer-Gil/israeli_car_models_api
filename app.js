const express = require('express');
const app = express();
const fetch = require('node-fetch');
const PORT = 80;
const packageName = "degem-rechev-wltp";

app.set("view engine", "ejs");

app.get("/:model_code", async function(request, response) {
    /**
     * Fetch the cars modles dataset (aka package) from CKAN
     */


    /**
     * Look for the dataset out of all the datasets.
     */
    const packageSearchUrl = "https://data.gov.il/api/3/action/package_search";
    const packageSearchOptions = {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fq: `name:${packageName}`
        })
    };
    try {
        const packagesFetchObject = await fetch(packageSearchUrl, packageSearchOptions);
        if(packagesFetchObject.status === 200) {
            /**
             * Got all the datasets satisfying the search query.
             * Hopefully there is only one.
             * Implement a test in the future.
             */
            const packagesObject = await packagesFetchObject.json();
            if(packagesObject.success) {

                /**
                 * Filter the right package out of all the packages found (again, hopefully one).
                 * To do this in the future.
                 */
                const packageObject = packagesObject.result.results[0];
    
                // In the future - filter the right resource from the above packageObject, rather than manually insreting it.
                const resourceId = "142afde2-6228-49f9-8a29-9b6c3a0cbe40";

                /**
                 * QUERY THE RESOURCE HERE!
                 * Fetching the car models with the corresponding car model from the resource whose id was found earlier.
                 */
                const modelCode = request.params.model_code;
                const url = "https://data.gov.il/api/3/action/datastore_search";
                const options = {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        resource_id: resourceId,
                        filters: JSON.stringify({
                            degem_cd: modelCode
                        }),
                        include_total: true
                    })
                };
                const carsFetchObject = await fetch(url, options);
                if(carsFetchObject.status === 200) {
                    const carsObject = await carsFetchObject.json();
                    if(carsObject.success) {
                        response.send("Hello!" + Math.random());
                    } else {
                        console.error("data_store responded with success: false.");
                    }
                } else {
                    console.error("Status code from data_store is not 200.")
                }
            } else {
                console.error("package_search responded with success: false");
            }
        } else {
            console.error("Status code from package_search is not 200.");
        }
    } catch(e) {
        console.error(e);
    }
});

app.listen(PORT, function(error) {
    if(error) {
        console.log("Error in server setup.");
    } else {
        console.log(`Server listening on port ${PORT}`);
    }
});