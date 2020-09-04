---
title: API Tests
kind: documentation
description: Simulate and monitor HTTP requests from specific locations
aliases:
  - /synthetics/uptime_check
  - /synthetics/api_test
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "/synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
---

## Overview

API tests are useful to help you monitor your API endpoints and alert you when they are failing or too slow. These tests verify that your applications are responding to requests, as well as that they meet any conditions you define—such as response time, HTTP status code, and header or body contents. Use the [Datadog API][1] to see the full list.

## Configuration

API tests configuration depends on the type of API test you want to create: [HTTP test](?tab=httptest), [SSL test](?tab=ssltest), or [TCP test](?tab=tcptest).

### Make a request

Define the `HTTP`, `SSL`, or `TCP` request you want to be executed by Datadog:

{{< tabs >}}

{{% tab "HTTP Test" %}}

{{< img src="synthetics/api_tests/make-http-request.png" alt="Make HTTP Request"  style="width:80%;" >}}

Define the request you want to be executed by Datadog:

1. **Choose request type**: `HTTP`
2. Choose the **Method** and **URL** to query. Available methods are: `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE`, and `OPTIONS`.
    * Advanced Options (optional): Use custom request headers, authentication credentials, body content, or cookies.
        * Follow redirects: Toggle to have the monitored endpoint follow up to ten redirects.
        * Allow insecure certificates: Toggle to have your HTTP test go on with connection even if there is an error when validating the certificate.
        * Headers: Defined headers override the default browser headers. For example, set the User Agent in the header to [identify Datadog scripts][1].
        * Authentication: HTTP basic authentication with username and password
        * Body: Request body and body type (`text/plain`, `application/json`, `text/xml`, `text/html`, or `None`). **Note**: The request body is limited to a maximum size of 50 kilobytes.
        * Cookies: Defined cookies are added to the default browser cookies. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

3. **Name**: The name of your API test.
4. **Select your tags**: The tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the [Synthetic Monitoring page][2].
5. **Locations**: The Datadog managed locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][3]. You can also set up a [Private Location][4] to run a Synthetic API test on a private endpoint not accessible from the public internet.
6. **How often should Datadog run the test?** Intervals are available between every one minute to once per week.
7. Click on **Test URL** to try out the request configuration. You should see a response preview show up on the right side of your screen.

[1]: /synthetics/identify_synthetics_bots/
[2]: /synthetics/
[3]: /api/#get-available-locations
[4]: /synthetics/private_locations/
{{% /tab %}}

{{% tab "SSL Test" %}}

{{< img src="synthetics/api_tests/make-ssl-request.png" alt="Make SSL Request"  style="width:80%;" >}}

1. **Choose request type**: `SSL`
2. Specify the `Host` and the SSL `Port`. By default, the port is set to _443_.
3. **Name**: The name of your API test.
4. **Select your tags**: The tags attached to your SSL test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the [Synthetic Monitoring page][1].
5. **Locations**: The Datadog managed locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][2]. You can also set up a [Private Location][3] to run a Synthetic API test on a private endpoint not accessible from the public internet.
6. **How often should Datadog run the test?** Intervals are available between every five minutes to once per week.
7. Click on **Test Connection** to try out the request configuration. You should see a response preview show up on the right side of your screen.

[1]: /synthetics/
[2]: /api/#get-available-locations
[3]: /synthetics/private_locations/
{{% /tab %}}

{{% tab "TCP Test" %}}

{{< img src="synthetics/api_tests/tcp_test.png" alt="Make TCP Request"  style="width:80%;" >}}

1. **Choose request type**: `TCP`
2. Specify the `Host` and the TCP `Port`.
3. **Name**: The name of your API test.
4. **Select your tags**: The tags attached to your TCP test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the [Synthetic Monitoring page][1].
5. **Locations**: The Datadog managed locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][2]. You can also set up a [Private Location][3] to run a Synthetic API test on a private endpoint not accessible from the public internet.
6. **How often should Datadog run the test?** Intervals are available between every five minutes to once per week.
7. Click **Test URL** to try the request configuration and see a response preview on the righthand side.

[1]: /synthetics/
[2]: /api/#get-available-locations
[3]: /synthetics/private_locations/
{{% /tab %}}

{{< /tabs >}}

### Assertions

When running an API test, you must define at least one assertion that should be monitored by Datadog. An assertion is defined by a parameter, an optional property, a comparator, and a target value.

{{< tabs >}}

{{% tab "HTTP Test" %}}

| Type          | Operator                                                                        | Value type                 |
|---------------|---------------------------------------------------------------------------------|----------------------------|
| Status Code   | `is`, `is not`                                                                  | _Integer_                  |
| Response time | `lessThan`                                                                      | _Integer (ms)_             |
| Headers       | `contains`, `does not contain`, `is`, `is not` <br> `matches`, `does not match` | _String_ <br> _[Regex][1]_ |
| Body          | `contains`, `does not contain`, `is`, `is not` <br> `matches`, `does not match` | _String_ <br> _[Regex][1]_ |

**Note**: HTTP tests can uncompress bodies with the following `content-encoding` headers: `br`, `deflate`, `gzip`, and `identity`.

If you click on **Test URL**, then the basic assertions are automatically filled:

- `Response time` _lessThan_ 2000 ms
- `Header content-type` _is_ "returned value"
- `Status code` _is_ "returned value"

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{% tab "SSL Test" %}}

| Type        | Operator                                                                        | Value type                 |
|-------------|---------------------------------------------------------------------------------|----------------------------|
| certificate | `expires in more than`                                                          | _Integer (number of days)_ |
| property    | `contains`, `does not contain`, `is`, `is not` <br> `matches`, `does not match` | _String_ <br> _[Regex][1]_  |

If you click on **Test URL**, then the basic assertion is automatically filled:

- `certificate` _expires in more than_ 10 days

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{% tab "TCP Test" %}}

| Type          | Operator                                                                | Value type     |
|---------------|-------------------------------------------------------------------------|----------------|
| response time | `is less than`                                                          | _Integer (ms)_ |

If you click on **Test URL**, then the basic assertion is automatically filled:

- `response time` _is less than_ 2000 ms.

{{% /tab %}}

{{< /tabs >}}

You can create up to 10 assertions per API test by clicking on **Add new assertion** or by clicking directly on the response preview:

{{< img src="synthetics/api_tests/assertions_setup.mp4" alt="Assertions Setup" video="true"  width="80%" >}}


### Alert Conditions

Set alert conditions to determine the circumstances under which you want a test to fail and trigger an alert.

#### Alerting Rule

When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered if:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes, **and**
* At one moment during the last *X* minutes, at least *n* locations were in failure.

The uptime bar is displayed differently on your test result: location uptime is displayed on a per-evaluation basis (whether the last test was up or down). Total uptime is displayed based on the configured alert conditions. Notifications sent are based on the total uptime bar.

#### Fast Retry

You can decide the number of retries needed to consider a location as *failed*. By default, Synthetic tests do not retry after a failed result for a given location.

### Use global variables

You can use the [global variables defined in the `Settings`][2] in the URL, Advanced Options, and in the assertions of your API tests. To display your list of variables, type `{{` in your desired field.

{{< img src="synthetics/api_tests/usingvariablesapi.mp4" alt="Using Variables in API tests" video="true"  width="80%" >}}

### Notify your team

A notification is sent according to the set of alerting conditions. To configure notifications:

1. Select users and/or [services][3] to receive notifications. **Note**: [`@-notifications`][4] are available in the **message** field, similar to monitors.
2. Enter a **message** for the API test. This field allows standard [Markdown formatting][5] and supports the following [conditional variables][6]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when monitor alerts                                            |
    | `{{^is_alert}}`            | Show unless monitor alerts                                          |
    | `{{#is_recovery}}`         | Show when monitor recovers from either ALERT   |
    | `{{^is_recovery}}`         | Show unless monitor recovers from either ALERT |

    Notification messages include the **message** defined in this section and information about which assertion failed and why.
3. Specify a renotification frequency. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.
4. Click **Save**.

Notifications example:

{{< img src="synthetics/api_tests/notifications-example.png" alt="API Test Notifications"  style="width:80%;" >}}

## Network timings

The Synthetic test details page displays the following network timings:

| Timing                      | Description                                                                                           |
|-----------------------------|-------------------------------------------------------------------------------------------------------|
| `DNS`                       | Time spent resolving the DNS name of the last request.                                                |
| `Connect`                   | Time spent establishing a connection to the server.                                                   |
| `SSL`                       | Time spent for the TLS handshake. If the last request is not over HTTPS, this metric does not appear. |
| `TTFB (time to first byte)` | Time spent waiting for the first byte of response to be received.                                     |
| `Download`                  | Time spent downloading the response.                                                                  |

Response time is the sum of these network timings.

## Test Failure

A test is considered `FAILED` if it does not satisfy its assertions or if the request failed for another reason. These reasons include:

| Error             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CONNRESET`       | The connection was abruptly closed by the remote server. Possible causes include the webserver encountering an error or crashing while responding, or loss of connectivity of the webserver.                                                                                                                                                                                                                                                         |
| DNS               | DNS entry not found for the check URL. Possible causes include misconfigured check URL, wrong configuration of your DNS entries, etc.                                                                                                                                                                                                                                                                                                                  |
| `INVALID_REQUEST` | The configuration of the check is invalid (for example, a typo in the URL).                                                                                                                                                                                                                                                                                                                                                                                     |
| `SSL`             | The SSL connection couldn't be performed. [See the dedicated error page for more information][7].                                                                                                                                                                                                                                                                                                                                                      |
| `TIMEOUT`         | The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen. `TIMEOUT: The request couldn’t be completed in a reasonable time.` indicates that the timeout happened at the TCP socket connection level. `TIMEOUT: Retrieving the response couldn’t be completed in a reasonable time.` indicates that the timeout happened on the overall run (which includes TCP socket connection, data transfer, and assertions). |

If a test fails, the uptime directly considers the endpoint to be `down`. It is not retested until the next test run.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/#get-available-locations
[2]: /synthetics/settings/#global-variables
[3]: /integrations/#cat-notification
[4]: /monitors/notifications/#notification
[5]: http://daringfireball.net/projects/markdown/syntax
[6]: /monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[7]: /synthetics/api_tests/errors/#ssl-errors
