---
title: Using Postman With Datadog APIs
kind: faq
---

## Overview

The Datadog API makes it easy to get data in and out of Datadog. The Datadog API uses resource-oriented URLs, uses status codes to indicate the success or failure of requests and returns JSON from all requests.

This article walks you through how to use [Postman][1] to perform API calls to Datadog.  This can help you understand the power of the Datadog API, what actions can be performed via the Datadog API, and a high-level introduction to how you can use Postman to GET/PUT/POST/and DELETE via the Datadog API.

## Prerequisites

* You have an active Datadog implementation
* You have admin access and can access the API Key and Application Key (your keys can be found on the API Key page)
* You have the [Postman API client installed][1]
* You have some basic knowledge of API structure and JSON formatting

## Getting Started

### Import The Datadog Collection

Now that you have Postman installed let's begin by [downloading the Datadog Postman Collection][2] (pre-configured API call templates, available for download here).  Save the file to a location on your computer for importing into Postman. In Postman, a collection is a folder of organized API calls for easy editing/saving/and re-use.

**Tip**: Prior to importing the Datadog collection, you can open the [DataDog.postman_collection.json][2] in your text editor of choice, and use Find and Replace, to search for api_key=API_KEY_HERE and replace the "API_KEY_HERE" portion with your actual API key.

You can do the same for application_key=APP_KEY_HERE and insert the application key from your Datadog API page. This prevents you from having to insert these two values for each API call, as they are both required for all API calls, with the exception of the Authentication Check API call which only takes 1 parameter which is api_key.

To import the Datadog Postman Collection:

* Open Postman
* Click on File -> Import
* Select the [Datadog.postman_collection.json][2] file that was downloaded above

## Working With the Collection

Now that your Postman collection (folder and children folders) have been imported, you are ready to begin making some API calls. You now see in your Datadog folder, you have child folders for each type of API Category listed on the [Datadog API Reference page][3]. This allows you to click on any of the subfolders, select a predefined API call and modify for your business needs.

When the folders are expanded you see the HTTP Method and name of the API call.

##  API GET Calls

If you click on any API from the collection pane, it loads the API on the right side of the screen known as Builder.  On this pane you can:

* Send the API call: Send the API call and show you the returned status, response Time, and the API Response.
{{< img src="developers/faq/postman_api_response.png" alt="postman_api_response" responsive="true" >}}

* Param shows you all parameters and values that are currently on the API call.  This view is much easier than looking at the param1:value1&param2:value2 structure for editing the API call.
{{< img src="developers/faq/postman_param.png" alt="postman_param" responsive="true" >}}

* Add any of the desired parameters and appropriate values that are allowed.  You can view what arguments are allowed by visiting the corresponding section on the API documentation. You notice that you can insert the key on the left side of the pane and the Value on the right side.
    * Note: You do not need to include the ampersand (&) or colon (:) as Postman inserts those for you for the key/value pairs and concatenation.

Example call:

`https://api.datadoghq.com/api/v1/screen/{screenId}?api_key={apiKey}&application_key={appKey}`

## API PUT/POST Calls

When you are defining an entity (Screenboard, metric, tags, etc) or updating a previously defined object, you want to use a PUT or a POST call.  Within the [DataDog.postman_collection.json][2] file that you imported, you see several examples of these calls to set up new entities or to append or update already created entities.

When using these types of API calls within Postman, you have to define the JSON payload within the Body section of Postman and define the contentType to JSON. You then paste or type in the JSON payload that you want to send on the API. There is built in notifications (red X) that indicates if you have improperly formatted JSON to make for quick and easy identification.

In the below example, I am using the Setup New Screenboard API call to define a new Screenboard for my Amazon EC2 Agents.
{{< img src="developers/faq/setup_new_screenboard.gif" alt="setup_new_screenboard" responsive="true" >}}

After you have all of your JSON entered, you can SEND the request and you should get a Status of 200 signifying the call was successful.  You can reference [this page][4] to see a full list of possible HTTP status codes.
{{< img src="developers/faq/screenboard_dd_ui.gif" alt="screenboard_dd_ui" responsive="true" >}}

## API DELETE Calls

If you need to delete any entity, it is a relatively easy process by using the Datadog API: Use the HTTP DELETE method along with the corresponding ID of the entity you are trying to delete.

Example Call:

`https://api.datadoghq.com/api/v1/screen/{screenId}?api_key={apiKey}&application_key={appKey}`

After sending the DELETE API call, you should receive a 200 Status, as well as an API response that shows what you just deleted.

You can now see the Screenboard within the Datadog UI.

[1]: https://www.getpostman.com/
[2]: /json/datadog.postman_collection_scrubbed.json
[3]: /api
[4]: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
