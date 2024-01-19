---
title: Using Postman with Datadog APIs
kind: documentation
aliases:
    - /developers/faq/using-postman-with-datadog-apis
    - /getting_started/using-postman-with-datadog-apis
    - /developers/guide/using-postman-with-datadog-apis
---

## Overview

The Datadog API allows you to get data in and out of Datadog. It uses resource-oriented URLs and status codes to indicate the success or failure of requests, then returns JSON from all requests.

This article explains how to use [Postman][1] to perform API calls to Datadog by showing the actions available within the Datadog API, and by providing a high-level introduction to using Postman to `GET`, `POST`, `PUT`, and `DELETE`.

## Prerequisites

You have:

- An active Datadog implementation.
- Access to your Datadog [API and application keys][2].
- Basic knowledge of API structure and JSON formatting.
- A [free Postman account][3].

## Setup

### Import the Datadog collection into Postman

Start by [logging into Postman][4]. Datadog recommends [downloading the Postman application][5].

</br>
<div class="postman-run-button"
data-postman-action="collection/fork"
data-postman-visibility="public"
data-postman-var-1="20651290-809b13c1-4ada-46c1-af65-ab276c434068"
data-postman-collection-url="entityId=20651290-809b13c1-4ada-46c1-af65-ab276c434068&entityType=collection&workspaceId=bf049f54-c695-4e91-b879-0cad1854bafa"
data-postman-param="env%5BDatadog%20Authentication%5D=W3sia2V5IjoiYXBpX2tleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjowfSx7ImtleSI6ImFwcGxpY2F0aW9uX2tleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjoxfV0="></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>

</br>This collection works in Postman for Web or in your Postman application. It may take several seconds to load.

**Note**: Configure the Datadog Postman collection's Datadog Authentication environment with your API and application key.

### Postman environment setup

After the Postman collection is imported, a full list of available Datadog API calls is structured by folder in the left pane of Postman.

#### Authentication

The collection includes a [Postman environment][6] called `Datadog Authentication` where you can add your Datadog API and application keys for authentication.

{{< img src="getting_started/postman/authentication-blurred.png" alt="Datadog Authentication collection with API and Application Key fields completed" style="width:100%;">}}

Follow these steps to set up your environment:

1. Click the **Environments** dropdown in the upper right corner of Postman. If you don't currently have an environment selected, the **Environments** dropdown says `No Environment`.

2. Select **Datadog Authentication**.

3. Edit the **Datadog Authentication** environment to add in your Datadog [API key][2] as the initial value and current value for the `api_key` variable, and add your Datadog [application key][2] as the initial value and current value for the `application_key` variable.

#### Switch the API endpoint
 
If you are accessing a Datadog site other than `https://api.datadoghq.com`, you need to switch the Postman collection to access a different endpoint URL.

Follow these steps to update the instance to your selected site ({{< region-param key="dd_site_name" >}}):

1. In the Datadog API Collection folder on the left pane, click the three dot menu, and then select **Edit**.

    {{< img src="getting_started/postman/view-more-actions.png" alt="View more actions">}}

2. On the **Variables** tab, deselect the `site` variable with the value `datadoghq.com` and select the `site` with the value {{< region-param key="dd_site" code="true" >}}.

3. Click **Update**.

## Working with the collection

After setup is complete, you are ready to begin making API calls. In the Postman -> Datadog folder, there are subfolders for each type of API category listed in the [Datadog API Reference][7]. Expand the subfolders to see the HTTP methods and API call names.

### Builder

When you click on an API call in the collection, it loads in the `Builder` pane on the right. On this pane you can send the API call and see the returned status, response time, and API response code.

{{< img src="getting_started/postman/apiGetCalls.png" alt="postman_api_response" style="width:70%;">}}

### Description

When you click on the Endpoint name a description of the endpoint and all required/optional parameters is displayed to help you build your requests:

{{< img src="getting_started/postman/description.mp4" alt="Postman description" video="true" >}}

### Params

The **Params** tab shows all parameters and values that are on the API call. Here, you are able to add parameters and values. View the available arguments in the corresponding section of the [Datadog API documentation][8].

{{< img src="getting_started/postman/parameters.png" alt="postman_param" style="width:70%;">}}

This tab is an alternative to viewing the `param1:value1&param2:value2` structure of the API call.

**Notes**:

- The ampersand (&) and colon (:) are not needed in the params table. Postman inserts these for you.
- All placeholders follow the format: `<PLACEHOLDER>` . They should be replaced before running a query.

[1]: https://www.postman.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://identity.getpostman.com/signup
[4]: https://identity.getpostman.com/login
[5]: https://www.postman.com/downloads/
[6]: https://learning.postman.com/docs/sending-requests/environments/managing-environments/
[7]: /api/latest/#api-reference
[8]: /api/
