---
title: WebSocket Testing
description: Simulate WebSocket requests to monitor public and internal API endpoints
aliases:
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "https://www.datadoghq.com/blog/udp-websocket-api-tests/"
  tag: "Blog"
  text: "Run UDP and WebSocket tests to monitor latency-critical applications"
- link: "https://learn.datadoghq.com/courses/intro-to-synthetic-tests"
  tag: "Learning Center"
  text: "Introduction to Synthetic Tests"
- link: "/synthetics/guide/synthetic-test-monitors"
  tag: "Documentation"
  text: "Learn about Synthetic test monitors"
algolia:
  rank: 70
  category: Documentation
  subcategory: Synthetic API Tests
  tags: ["websocket", "websocket test", "websocket tests"]
---
## Overview

WebSocket tests allow you to proactively open WebSocket connections on your endpoints to verify responses and defined conditions, such as overall response times or expected headers.

WebSocket tests can run from both [managed](#select-locations) and [private locations][1] depending on your preference for running the test from outside or inside your network. WebSocket tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][2].

## Configuration

You may create a test using one of the following options:

- **Create a test from a template**:
   
     1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Request Details, Assertions, Alert Conditions, and Monitor Settings.
     2. Click **+Create Test** to open the **Define Request** page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
     3. Click **Save Details** to submit your API test.<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video of Synthetics API test landing page with templates" video="true" >}}

- **Build a test from scratch**:

    1. To build a test from scratch, click the **+ Start from scratch** template, then select the `WebSocket` request type.
    1. Specify the **URL** to run your test on.
    1. Enter the string you want to send in your test. 
    1. Add **Advanced Options** (optional) to your test:<br /><br>

   {{< tabs >}}

   {{% tab "Request Options" %}}
   * **Timeout**: Specify the amount of time in seconds before the test times out.
   * **Request headers**: Define headers to add to the HTTP request initiating the WebSocket connection. You can also override the default headers (for example, the `user-agent` header).
   * **Cookies**: Define cookies to add to the HTTP request initiating the WebSocket connection. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

   {{% /tab %}}

   {{% tab "Authentication" %}}

   * **HTTP Basic Auth**: Add HTTP basic authentication credentials.

   {{% /tab %}}

   {{< /tabs >}}

</br>

  5. **Name** your WebSocket test.
  6. Add Environment **Tags** as well as any other tag to your WebSocket test. You can then use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page][3].
  7. Click **Send** to try out the request configuration. A response preview is displayed on the right side of your screen.

     {{< img src="synthetics/api_tests/websocket_test_config_2.png" alt="Define WebSocket request" style="width:90%;" >}}

  8. Click **Create Test** to submit your API test.

### Snippets

{{% synthetics-api-tests-snippets %}}

### Define assertions

Assertions define what an expected test result is. When you click **Test URL**, a basic assertion on `response time` is added. You must define at least one assertion for your test to monitor.

| Type            | Operator                                                                         | Value Type                        |
|-----------------|----------------------------------------------------------------------------------|-----------------------------------|
| response time   | `is less than`                                                                   | _Integer (ms)_                    |
| string response | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match` | _String_ <br> _[Regex][4]_        |
| header          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match` | _String_ <br> _[Regex][4]_        |

Select the response preview directly or click **New Assertion** to create an assertion. You can create up to 20 assertions per WebSocket test.

{{< img src="synthetics/api_tests/websocket_assertions.png" alt="Define assertions for your WebSocket test to succeed or fail on" style="width:90%;" >}}

To perform `OR` logic in an assertion, use the `matches regex` or `does not match regex` comparators to define a regex with multiple expected values for the same assertion type like `(0|100)`. The test result is successful if the string response or header assertions' value is 0 or 100.

If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

### Select locations

Select the **Locations** to run your WebSocket test from. WebSocket tests can run from both managed and [private locations][1] depending on your preference for running the test from outside or inside your network.

{{% managed-locations %}}

### Specify test frequency

WebSocket tests can run:

* **On a schedule** to ensure your most important endpoints are always accessible to your users. Select the frequency at which you want Datadog to run your WebSocket test.
* [**Within your CI/CD pipelines**][2] to start shipping without fearing faulty code might impact your customers' experience.
* **On-demand** to run your tests whenever makes the most sense for your team.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Use variables

You can use the [global variables defined on the **Settings** page][4] in the URL, advanced options, and assertions of your WebSocket tests.

To display your list of variables, type `{{` in your desired field.

## Test failure

A test is considered `FAILED` if it does not satisfy one or more assertions or if the request prematurely failed. In some cases, the test can fail without testing the assertions against the endpoint.

For a complete list of WebSocket error codes, see [API Testing Errors][9].

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][10] can create, edit, and delete Synthetic WebSocket tests. To get create, edit, and delete access to Synthetic WebSocket tests, upgrade your user to one of those two [default roles][10].

If you are using the [custom role feature][11], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

{{% synthetics_grace_permissions %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations
[2]: /synthetics/cicd_integrations
[3]: /synthetics/search/#search
[4]: /synthetics/settings/#global-variables
[5]: /monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /synthetics/guide/synthetic-test-monitors
[9]: /synthetics/api_tests/errors/#websocket-errors
[10]: /account_management/rbac/
[11]: /account_management/rbac#custom-roles
