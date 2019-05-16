---
title: Using Postman with Datadog APIs
kind: guide
aliases:
  - /developers/faq/using-postman-with-datadog-apis
---

## Overview

The Datadog API allows you to get data in and out of Datadog. It uses resource-oriented URLs and status codes to indicate the success or failure of requests, then returns JSON from all requests.

This article explains how to use [Postman][1] to perform API calls to Datadog by showing the actions available within the Datadog API, and by providing a high-level introduction to using Postman to `GET`, `POST`, `PUT`, and `DELETE`.

## Prerequisites

You have:

* An active Datadog implementation.
* Access to your Datadog [API and application keys][2].
* The [Postman API client installed][1].
* Basic knowledge of API structure and JSON formatting.

## Setup

### Import the Datadog collection

After the prerequisites are met:

1. Download the [Datadog Postman collection][3] (pre-configured API call templates).
    In Postman, a collection is a folder of organized API calls for easy editing, saving, and re-use.

2. Import the Datadog Postman Collection:
    * Open Postman
    * Click on **Import**
    * Select the [datadog_collection.json][3] file downloaded in step 1.

You now have a Datadog collection with many different API examples.

**Note**: The API calls do not work at this point. See below to set your Datadog-Postman Environment.

### Postman environment setup

After the Postman collection is imported, a full list of available Datadog API calls is structured by folder in the left pane of Postman.
In the folders, the API calls have variables entered for `datadog_site`, `datadog_api_key`, and `datadog_application_key`:

{{< img src="developers/guide/postman/SetAPIKeys.png" alt="postman_api_template_variables" responsive="true" style="width:70%;">}}

This allows you to set up [Postman environments][4] and save your Datadog site, API, and application keys for authentication. If you have multiple Datadog organizations, set up multiple [Postman environments][4] to make API calls to different organizations without modifying the API calls in the Datadog Postman collection.

Follow these steps to set up your environment:

1. Click the **Manage Environments** gear icon in the upper right corner of Postman.

2. Click **Add** and enter an **Environment Name**.

3. In the table, add the variables `datadog_api_key` and `datadog_application_key`. In the **Current Value** column, enter your actual [Datadog API and application keys][2].

4. Add the variable `datadog_site`. In the **Current Value** column enter `com` if you are on Datadog US site or `eu` if you are on Datadog EU site.

5. Optional: If you have multiple Datadog organizations, repeat steps 1-4 for each organization.

{{< img src="developers/guide/postman/setAPIKeys2.png" alt="postman_api_template_variables" responsive="true" style="width:70%;">}}

## Working with the Collection

After setup is complete, you are ready to begin making API calls. In the Postman -> Datadog folder, there are subfolders for each type of API category listed in the [Datadog API Reference][5]. Expand the subfolders to see the HTTP methods and API call names.

### Builder

When you click on an API call in the collection, it loads in the `Builder` pane on the right. On this pane you can send the API call and see the returned status, response time, and API response code.

{{< img src="developers/guide/postman/apiGetCalls.png" alt="postman_api_response" responsive="true" style="width:70%;">}}

### Description

When you click on the Endpoint name a description of the endpoint and all required/optional parameters is displayed to help you build your requests:

{{< img src="developers/guide/postman/description.gif" alt="postman description" responsive="true">}}

### Params

The **Params** tab shows all parameters and values that are currently on the API call. Here, you are able to add parameters and values. View the available arguments in the corresponding section of the [Datadog API documentation][6].

{{< img src="developers/guide/postman/parameters.png" alt="postman_param" responsive="true" style="width:70%;">}}

This tab is an alternative to viewing the `param1:value1&param2:value2` structure of the API call.

**Note**: The ampersand (&) and colon (:) are not needed in the params table. Postman inserts these for you.

[1]: https://www.getpostman.com
[2]: https://app.datadoghq.com/account/settings#api
[3]: /resources/json/datadog_collection.json
[4]: https://www.getpostman.com/docs/v6/postman/environments_and_globals/manage_environments
[5]: /api/#organizations
[6]: /api
