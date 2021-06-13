const express = require('express');
const router = express.Router();

router.get("/:code", async function(request, response) {
    const packageName = request.headers.packageName;
    const fetch = request.fetch;
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
                 const modelCode = request.params.code;
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
                         response.write("Hello!" + Math.random() + "\n");
                         response.write(`The model code you have asked for is ${modelCode}`);
                         response.end();
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

module.exports = router;