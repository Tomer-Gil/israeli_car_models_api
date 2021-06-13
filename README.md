# Israeli Car Models API
An API for Israeli car models, fetched from data.gov.il.

Dataset structure is presented in vehicle_models_structure.pdf,
as well as in a pdf resource on the dataset page.

The resource main fields consists:
1) ID for each model.
2) Modle code (degem_cd).
The thing to remember is that a modle code can be shared among multiple models (among the same company in different years,
and even among different manufacturers).

Currently the API requests the user for a model number, but this feature will be expanded in the future to support actual ID.

# Helpful Documentation
- package_search function:
https://docs.ckan.org/en/ckan-2.7.3/api/#ckan.logic.action.get.package_search

- datastore_search function (resource page references here):
https://docs.ckan.org/en/latest/maintaining/datastore.html#ckanext.datastore.logic.action.datastore_search

- GET request to find degem-rechev-wltp:
https://data.gov.il/api/3/action/package_search?q=name:degem-rechev-wltp

- GET request to fetch data from the right resource:
https://data.gov.il/api/3/action/datastore_search?resource_id=142afde2-6228-49f9-8a29-9b6c3a0cbe40&q=jones

- Resource page in data.gov.il:
https://data.gov.il/dataset/degem-rechev-wltp/resource/142afde2-6228-49f9-8a29-9b6c3a0cbe40?filters=degem_cd%3A395

- Dataset page in data.gov.il:
https://data.gov.il/dataset/degem-rechev-wltp

# To do (13/6/21):
1) Filter the right package out of all the package found.
2) Filter the right resouce out of all the resources found, and fetch it's resource (currenly done manually).
3) Build response - building a JSON object and send it back to the user as a response.
3) Handle automatic favicon.ico requests.
4) Add main router that passes globally used in the the application variables to all of the sub-routers at once 
    (variables such as packageName and the fetch module) - LEARN ABOUT EXPRESS SUB-ROUTE / NESTED ROUTE (for example, 
    here: https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router).
