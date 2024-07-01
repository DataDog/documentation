---
title: Monitor your HTTP requests are redirected into HTTPS
kind: guide
further_reading:
    - link: /synthetics/api_tests/http_tests
      tag: Documentation
      text: Create a HTTP Test

---

## Overview

Monitoring your HTTP traffic is redirected into HTTPS is critical in ensuring your users' connections are encrypted with your API endpoints and your application.

### Monitor your HTTPS redirection

Depending on your setup, you can identify the redirect to HTTPS in the generated **Response Preview** tab under Headers as `location` or in the **Body** as `"https:"===window.location.protocol`.

To monitor the redirection of your HTTP traffic into HTTPS:

1. Create an HTTP test and [define the request][1].
2. Click **Test URL**. The response preview generates a **Request Preview** and **Response Preview**.
3. Add an assertion about the redirection to HTTPS.
    - Define an assertion on the `location` header by clicking the `location` header in the response preview. For example, under **Headers**, the `location` header for `http://datadoghq.com` is `https://datadoghq.com`.

    {{< img src="synthetics/guide/monitor-https-redirections/location-header-https.png" alt="Location header in the response preview" style="width:100%;" >}}
    - Alternatively, define an assertion on the response body by clicking **+ New Assertion**. Select `body` `contains` and paste `"https:"===window.location.protocol` in the text field. 
    {{< img src="synthetics/guide/monitor-https-redirections/https-assertion.png" alt="Define your assertion" style="width:100%;" >}}

Complete the rest of the test creation workflow and save your HTTP test. 

After defining the notification, Datadog can alert you when your HTTP traffic does not correctly redirect into HTTPS.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/synthetics/api_test/#define-request
