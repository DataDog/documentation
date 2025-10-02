---
title: Monitor Your HTTP Requests Are Redirected Into HTTPS
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides >
  Monitor Your HTTP Requests Are Redirected Into HTTPS
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/monitor-https-redirection/index.html
---

# Monitor Your HTTP Requests Are Redirected Into HTTPS

## Overview{% #overview %}

Monitoring your HTTP traffic is redirected into HTTPS is critical in ensuring your users' connections are encrypted with your API endpoints and your application.

### Monitor your HTTPS redirection{% #monitor-your-https-redirection %}

Depending on your setup, you can identify the redirect to HTTPS in the generated **Response Preview** tab under Headers as `location` or in the **Body** as `"https:"===window.location.protocol`.

To monitor the redirection of your HTTP traffic into HTTPS:

1. Create an HTTP test and [define the request](https://docs.datadoghq.com/getting_started/synthetics/api_test/#define-request).

1. Click **Test URL**. The response preview generates a **Request Preview** and **Response Preview**.

1. Add an assertion about the redirection to HTTPS.

   - Define an assertion on the `location` header by clicking the `location` header in the response preview. For example, under **Headers**, the `location` header for `http://datadoghq.com` is `https://datadoghq.com`.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/monitor-https-redirections/location-header-https.d9447c19db27d0f03d97abb04e0e9bd2.png?auto=format"
      alt="Location header in the response preview" /%}

   - Alternatively, define an assertion on the response body by clicking **+ New Assertion**. Select `body` `contains` and paste `"https:"===window.location.protocol` in the text field.
     {% image
        source="https://datadog-docs.imgix.net/images/synthetics/guide/monitor-https-redirections/https-assertion.b50b1eb82dd9ed8fbea437050e878632.png?auto=format"
        alt="Define your assertion" /%}

Complete the rest of the test creation workflow and save your HTTP test.

After defining the notification, Datadog can alert you when your HTTP traffic does not correctly redirect into HTTPS.

## Further Reading{% #further-reading %}

- [Create a HTTP Test](https://docs.datadoghq.com/synthetics/api_tests/http_tests)
