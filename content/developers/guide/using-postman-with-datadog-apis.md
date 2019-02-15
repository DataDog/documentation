---
title: Using Postman with Datadog APIs
kind: faq
---

## Overview

The Datadog API allows you to get data in and out of Datadog. It uses resource-oriented URLs and status codes to indicate the success or failure of requests then returns JSON from all requests.

This article explains how to use [Postman][1] to perform API calls to Datadog by showing the actions available within the Datadog API and providing a high-level introduction to using Postman to GET, POST, PUT, and DELETE.

## Prerequisites

You have:

* An active Datadog implementation.
* Access to your Datadog [API and APP keys][2].
* The [Postman API client installed][1].
* Basic knowledge of API structure and JSON formatting.

## Setup

### Import the Datadog collection

After the prerequisites are met:

1. Download the [Datadog Postman collection][3] (pre-configured API call templates).  
    In Postman, a collection is a folder of organized API calls for easy editing, saving, and re-use.

2. Import the Datadog Postman Collection:  
    * Open Postman
    * Click on File -> Import
    * Select the [datadog_collection.json][3] file downloaded in step 1.

{{< img src="developers/faq/import_collection.gif" alt="postman_collection_import" responsive="true" >}}

You should now have a Datadog collection with many different API examples.  
**Note**: The API calls do not work at this point. See below to set your Datadog API and APP keys.

### Set API and APP keys in Postman

After the Postman collection is imported, a full list of available Datadog API calls is structured by folder in the left pane of Postman. In the folders, the API calls have variables entered for `api_key` and `application_key`:

{{< img src="developers/faq/SetAPIKeys.png" alt="postman_api_template_variables" responsive="true" >}}

This allows you to set up [Postman environments][4] and save your Datadog API and APP keys for authentication.  If you have multiple Datadog orgs, set up multiple [Postman environments][4] to make API calls to different orgs without modifying the API calls in the Datadog Postman collection.

Follow these steps to set up your environment:

1. Click the **Manage Environments** gear icon in the upper right corner of Postman.

2. Click **Add** and enter an **Environment Name**.

3. In the table, add the variables `dd_api_key` and `dd_app_key`. In the **Current Value** column, enter your actual [Datadog API and APP keys][2]. 

4. If you have multiple Datadog orgs, repeat steps 1 - 3 for each org.

{{< img src="developers/faq/setAPIKeys2.png" alt="postman_api_template_variables" responsive="true" >}}

## Working with the Collection

After setup is complete, you are ready to begin making API calls. In the Postman -> Datadog folder there are sub folders for each type of API category listed in the [Datadog API Reference][5]. Expand the sub folders to see the HTTP methods and API call names:

{{< img src="developers/faq/workingWithTheCollection.png" alt="working_with_collection" responsive="true" >}}

**Note**: The Organization API calls use the `public_id` parameter. Reference the [Datadog API documentation][5] when using this collection.

### Builder

When you click on an API call in the collection, it loads in the `Builder` pane on the right. On this pane you can send the API call and see the returned status, response time, and API response.

{{< img src="developers/faq/apiGetCalls.png" alt="postman_api_response" responsive="true" >}}

### Params

The **Params** tab shows all parameters and values that are currently on the API call. Here you are able to add parameters and values. View the available arguments in the corresponding section of the [Datadog API documentation][6]. 

{{< img src="developers/faq/parameters.png" alt="postman_param" responsive="true" >}}

This tab is an alternative to viewing the `param1:value1&param2:value2` structure of the API call.  
**Note**: The ampersand (&) and colon (:) are not needed in the params table. Postman inserts these for you.

### API calls

#### GET

Retrieving an entity (screenboard, monitor, metric, etc) uses a GET API call. When making a this call, additional parameters may be needed. If you want the output for a specific screenboard, the screenboard's ID is needed. Here is an example API call to get a screenboard:

```
https://app.datadoghq.com/api/v1/screen/{screenId}?api_key={{dd_api_key}}&application_key= {(dd_app_key}}
```

#### POST / PUT

Creating an entity uses a POST API call and updating a entity uses a PUT API call. Within the [datadog_collection.json][3] file you imported, there are several examples of these calls to set up new entities or update existing ones.

When using these types of API calls within Postman, define the JSON payload within the **Body** tab and set the contentType to JSON. Postman has built in notifications (red X) for improperly formatted JSON.

This example uses the **Setup New Screenboard** API call to define a new Screenboard:

{{< img src="developers/faq/exampleGetCall.gif" alt="setup_new_screenboard" responsive="true" >}}

When sending this API call, you should get a HTTP status of 200 meaning the call was successful. Reference the [List of HTTP status codes][7] for other codes and descriptions.

#### DELETE

Deleting an entity uses a DELETE API call. When making a this request, additional parameters may be needed. If you want to delete a specific screenboard, the screenboard's ID is needed. Here is an example API call to delete a screenboard:

```
https://app.datadoghq.com/api/v1/screen/{screenId}?api_key={{dd_api_key}}&application_key= {{dd_app_key}}
```

{{< img src="developers/faq/apiDeleteCalls.gif" alt="screenboard_delete_api" responsive="true" >}}

When sending this API call, you should get a HTTP status of 200 meaning the call was successful. Reference the [List of HTTP status codes][7] for other codes and descriptions.

[1]: https://www.getpostman.com
[2]: https://app.datadoghq.com/account/settings#api
[3]: /json/datadog_collection.json
[4]: https://www.getpostman.com/docs/v6/postman/environments_and_globals/manage_environments
[5]: /api/#organizations
[6]: /api
[7]: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
