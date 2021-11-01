---
title: WebSocket Tests
kind: documentation
description: Simulate WebSocket requests to monitor public and internal API endpoints
aliases:
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: 'https://learn.datadoghq.com/course/view.php?id=39'
  tag: 'Learning Center'
  text: 'Introduction to Synthetic Tests'
---
## Overview

WebSocket tests allow you to proactively open WebSocket connections on your endpoints to verify responses and defined conditions, such as overall response times or expected headers.

WebSocket tests can run from both [managed][1] and [private locations][2] depending on your preference for running the test from outside or inside your network. WebSocket tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][3].

## Configuration

After choosing to create an `WebSocket` test, define your test's request.

### Define request

1. Specify the **URL** to run your test on.
2. Enter the string you want to send in your test. 
2. Add **Advanced Options** (optional) to your test:

   {{< tabs >}}

   {{% tab "Request Options" %}}

   * **Request headers**: Define headers to add to the HTTP request initiating the WebSocket connection. You can also override the default headers (for example, the `user-agent` header).
   * **Cookies**: Define cookies to add to the HTTP request initiating the WebSocket connection. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

   {{% /tab %}}

   {{% tab "Authentication" %}}

   * **HTTP Basic Auth**: Add HTTP basic authentication credentials.

   {{% /tab %}}

   {{< /tabs >}}

<br/>

4. **Name** your WebSocket test.
5. Add `env` **Tags** as well as any other tag to your WebSocket test. You can then use these tags to quickly filter through your Synthetic tests on the [Synthetic Monitoring homepage][4].

{{< img src="synthetics/api_tests/websocket_test_config.png" alt="Define WebSocket request" style="width:90%;" >}}

Click **Test URL** to try out the request configuration. A response preview is displayed on the right side of your screen.

### Define assertions

Assertions define what an expected test result is. When you click **Test URL**, basic assertions on `response time` and `string response` are added. You must define at least one assertion for your test to monitor.

| Type            | Operator                                                                         | Value Type                        |
|-----------------|----------------------------------------------------------------------------------|-----------------------------------|
| response time   | `is less than`                                                                   | _Integer (ms)_                    |
| string response | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match` | _String_                          |
| header          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match` | _String_ <br> _[Regex][5]_        |

Select the response preview directly or click **New Assertion** to create an assertion. You can create up to 20 assertions per WebSocket test.

{{< img src="synthetics/api_tests/websocket_assertions.png" alt="Define assertions for your WebSocket test" style="width:90%;" >}}

{{< partial name="synthetics/partial.md" >}}

## Test failure

A test is considered `FAILED` if it does not satisfy one or more assertions or if the request prematurely failed. In some cases, the test can fail without testing the assertions against the endpoint. 

These reasons include the following:

`CONNRESET`
: The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or loss of connectivity of the web server.

`DNS`
: DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.

`INVALID_REQUEST` 
: The configuration of the test is invalid (for example, a typo in the URL).

`SSL`
: The SSL connection couldn't be performed. [See the dedicated error page for more information][9].

`TIMEOUT`
: The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen:
  - `TIMEOUT: The request couldn’t be completed in a reasonable time.` indicates that the timeout happened at the TCP socket connection level. 
  - `TIMEOUT: Retrieving the response couldn’t be completed in a reasonable time.` indicates that the timeout happened on the overall run (which includes TCP socket connection, data transfer, and assertions).

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][10] can create, edit, and delete Synthetic WebSocket tests. To get create, edit, and delete access to Synthetic WebSocket tests, upgrade your user to one of those two [default roles][10].

If you have access to the [custom role feature][11], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/synthetics/#get-all-locations-public-and-private
[2]: /synthetics/private_locations
[3]: /synthetics/cicd_testing
[4]: /synthetics/search/#search
[5]: /synthetics/settings/#global-variables
[6]: /monitors/notify/#notify-your-team
[7]: https://www.markdownguide.org/basic-syntax/
[8]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[9]: /synthetics/api_tests/errors/#ssl-errors
[10]: /account_management/rbac/
[11]: /account_management/rbac#custom-roles
