---
title: Using Postman With Datadog APIs
kind: faq
---

## Overview

The Datadog API makes it easy to get data in and out of Datadog. The Datadog API uses resource-oriented URLs, uses status codes to indicate the success or failure of requests and returns JSON from all requests.

This article walks you through how to use [Postman][1] to perform API calls to Datadog.  This can help you understand the power of the Datadog API, what actions can be performed via the Datadog API, and a high-level introduction to how you can use Postman to GET/PUT/POST/and DELETE via the Datadog API.

## Prerequisites

* You have an active Datadog implementation
* You have admin access and can access the API Key and Application Key (your keys can be found on the [API Key page][5])
* You have the [Postman API client installed][1]
* You have some basic knowledge of API structure and JSON formatting

## Getting Started

### Import The Datadog Collection

Now that you have Postman installed let's begin by downloading the Datadog Postman Collection (pre-configured API call templates, available for [download here][2]).  

In Postman, a collection is a folder of organized API calls for easy editing/saving/and re-use.

Save the file to a location on your computer for importing into Postman. 

Now, we will import the Datadog Postman Collection:

* Open Postman
* Click on File -> Import
* Select the [datadog_collection.json][2] file that was downloaded above.  
{{< img src="developers/faq/import_collection.gif" alt="postman_collection_import" responsive="true" >}}

Congratulations! You should know have a Datadog collection with many different API examples.

*Note*: The API calls will not work at this point, as we need to enter your Datadog API Key and App Key values.

## Set API / APP Keys in Postman

Now that you have your Postman Collection imported, you will see a full list of available Datadog API calls structured by folder in the left pane of Postman. 

As you open the folders you will notice that the api calls have variables entered for the values of *dd_api_key* and *dd_app_key* values. 
{{< img src="developers/faq/SetAPIKeys.png" alt="postman_api_template_variables" responsive="true" >}}

This is so that you can setup [Postman environments][6] and save your Datadog API Key and App Key values once and all APIs will authenticate successfully.  As well, if you have multiple Datadog Orgs you can setup multiple environments and select the environment you want to work with without having to modify any of the API calls in the Datadog Collection.

Let's go ahead and set your environment up and store your Datadog API Key and App Key values. Click the “Manage Environments” icon in the upper right corner of the Postman app (gear icon), then click on "Add", here you can name it whatever you want and add in your Datadog API / App keys. The "variable" name must be `dd_api_key` and `dd_app_key` to match the variable we have coded into each API call.  The "current value" will be your actual API Key and App Key, which can be found [here][7]. 

If you have multiple Datadog Orgs, you can add several environments with the appropriate dd_api_key and dd_app_key values.
{{< img src="developers/faq/setAPIKeys2.png" alt="postman_api_template_variables" responsive="true" >}}

## Working With the Collection

Now that your Postman collection has been imported, your environmental variables have been set for `dd_api_key` and `dd_app_key`, you are ready to begin making some API calls. You will now see in your Datadog folder, you have child folders for each type of API Category listed on the [Datadog API Reference page][8]. This will allow you to click on any of the subfolders, select a predefined API call and modify for your business needs.

When the folders are expanded you will see the HTTP Method and name of the API call.

Ex: PUT Organization Update API call, references a public orgId from subsequent step. Please reference
the [Datadog API documentation][8] when using this collection.
{{< img src="developers/faq/workingWithTheCollection.png" alt="working_with_collection" responsive="true" >}}

##  API GET Calls

If you click on any API from the collection pane, it loads the API on the right side of the screen known as the `Builder`.  On this pane you can:

* Send the API call: Send the API call and show you the returned status, response Time, and the API Response.
{{< img src="developers/faq/apiGetCalls.png" alt="postman_api_response" responsive="true" >}}

* Param shows you all parameters and values that are currently on the API call.  This view is much easier than looking at the `param1:value1&param2:value2` structure for editing the API call.
{{< img src="developers/faq/exampleGetCall.gif" alt="postman_param" responsive="true" >}}

* Add any of the desired parameters and appropriate values that are allowed.  You can view what arguments are allowed by visiting the corresponding section on the API documentation. You notice that you can insert the key on the left side of the pane and the Value on the right side.
    * Note: You do not need to include the ampersand (&) or colon (:) as Postman inserts those for you for the key/value pairs and concatenation.

Example call:

`https://app.datadoghq.com/api/v1/screen/{screenId}?api_key={{dd_api_key}}&application_key= {(dd_app_key}}`

## API PUT/POST Calls

When you are defining an entity (Screenboard, metric, tags, etc) or updating a previously defined object, you want to use a PUT or a POST call.  Within the [datadog_collection.json][2] file that you imported, you see several examples of these calls to set up new entities or to append or update already created entities.

When using these types of API calls within Postman, you have to define the JSON payload within the Body section of Postman and define the contentType to JSON. You then paste or type in the JSON payload that you want to send on the API. There is built in notifications (red X) that indicates if you have improperly formatted JSON to make for quick and easy identification.

In the below example, I am using the Setup New Screenboard API call to define a new Screenboard for my Amazon EC2 Agents.
{{< img src="developers/faq/exampleGetCall.gif" alt="setup_new_screenboard" responsive="true" >}}

After you have all of your JSON entered, you can SEND the request and you should get a Status of 200 signifying the call was successful.  You can reference [this page][4] to see a full list of possible HTTP status codes.


## API DELETE Calls

If you need to delete any entity, it is a relatively easy process by using the Datadog API: Use the HTTP DELETE method along with the corresponding ID of the entity you are trying to delete.

Example Call:

`https://app.datadoghq.com/api/v1/screen/{screenId}?api_key={{dd_api_key}}&application_key= {{dd_app_key}}`

After sending the DELETE API call, you should receive a 200 Status, as well as an API response that shows what you just deleted.

{{< img src="developers/faq/apiDeleteCalls.gif" alt="screenboard_delete_api" responsive="true" >}}

[1]: https://www.getpostman.com/
[2]: /json/datadog_collection.json
[3]: /api
[4]: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://www.getpostman.com/docs/v6/postman/environments_and_globals/manage_environments
[7]: https://app.datadoghq.com/account/settings#api
[8]: http://docs.datadoghq.com/api/
