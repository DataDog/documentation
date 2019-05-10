---
title: API Tests
kind: documentation
beta: true
description: Simulate and monitor HTTP requests from specific locations
aliases:
  - /synthetics/uptime_check
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/browser_tests"
  tag: "Documentation"
  text: "Configure a Browser Test"
---

## Overview

API tests are useful to help you monitor your API endpoints and alert you when they are failing or too slow.
They are executed periodically from several locations around the world.

Available locations are:

- _Canada Central (AWS_)
- _Ohio (AWS_)
- _Oregon (AWS_)
- _Sydney (AWS_)
- _Tokyo (AWS_)
- _Frankfurt (AWS_)
- _London (AWS_)

## Configuration

The configuration depends on the type of API test you are creating. There are two API test types:

- [HTTP test](?tab=httptest#make-a-request)
- [SSL test](?tab=ssltest#make-a-request)

### Make a request

{{< tabs >}}

{{% tab "HTTP Test" %}}

Define the HTTP request you want to be executed by Datadog:

{{< img src="synthetics/api_tests/make-http-request.png" alt="Make HTTP Request" responsive="true" style="width:80%;" >}}

1. Choose the `Method` and `URL` to query. Available methods are:
   - GET
   - POST
   - PATCH
   - PUT
   - DELETE
   - OPTIONS
2. Optionally, click on **Advanced options** to enrich your request with custom request headers, authentication credentials, body content, or cookies. Toggle **Follow redirects** to have the monitored endpoint follow up to ten redirects.
3. Name your HTTP test.
4. Optionally, add tags to filter your HTTP test in the [Synthetics page][1].
5. Pick the locations to run the test from. Many AWS locations from around the world are available, the full list can be retrieved [through Datadog API][2].
6. Choose a check frequency between "1 run per minute" and "1 run per week".
7. Click on **Test URL** to try out the request configuration. You will see a response preview show up on the right side of your screen.

[1]: /synthetics
[2]: /api/?lang=bash#get-available-locations
{{% /tab %}}

{{% tab "SSL Test" %}}

Define the SSL request you want to be executed by Datadog:

{{< img src="synthetics/api_tests/make-ssl-request.png" alt="Make SSL Request" responsive="true" style="width:80%;" >}}

1. Specify the `Host` and the SSL `Port`. By default, it is set to _443_.
2. Name your SSL test.
3. Optionally, add tags to filter your SSL test in the [Synthetics page][1].
4. Pick the locations to run the test from. Many AWS locations from around the world are available, the full list can be retrieved [through Datadog API][2].
5. Choose a check frequency between "1 run per minute" and "1 run per week".
6. Click on **Test Connection** to try out the request configuration. You should see a response preview show up on the right side of your screen.

[1]: /synthetics
[2]: /api/?lang=bash#get-available-locations
{{% /tab %}}

{{< /tabs >}}

### Alert Conditions

Set alert conditions to determine the circumstances under which you want a test to send an alert. When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered if:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes, **AND**
* At one moment during the last *X* minutes, at least *n* locations were in failure

The uptime bar is displayed differently on your test result: location uptime is displayed on a per-evaluation basis (whether the last test was up or down). Total uptime is displayed based on the configured alert conditions. Notifications sent are based on the total uptime bar.

#### Assertions

When running an API test, you must define at least one assertion that should be monitored by Datadog.
An assertion is defined by a parameter, an optional property, a comparator and a target value.

{{< tabs >}}

{{% tab "HTTP Test" %}}

| Type          | Operator                                                                        | Value type                            |
| ------------- | ------------------------------------------------------------------------------- | ------------------------------------- |
| Status Code   | `is`, `is not`                                                                  | _Integer_                             |
| Response time | `less than`                                                                     | _Integer (ms)_                        |
| Headers       | `contains`, `does not contain`, `is`, `is not` <br> `matches`, `does not match` | _String_ <br> _[Regex][1]_ |
| Body          | `contains`, `does not contain`, `is`, `is not` <br> `matches`, `does not match` | _String_ <br> _[Regex][1]_ |

If you click on **Test URL**, then the basic assertions are automatically filled:

- `Response time` _less than_ 2000 ms
- `Header content-type` _is_ "returned value"
- `Status code` _is_ "returned value"


[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{% tab "SSL Test" %}}

| Type        | Operator               | Value type                 |
| ----------- | ---------------------- | -------------------------- |
| certificate | `expires in more than` | _Integer (number of days)_ |

If you click on **Test URL**, then the basic assertion is automatically filled:

- `certificate` _expires in more than_ 10 days

{{% /tab %}}

{{< /tabs >}}

You can create up to 10 assertions per API test by clicking on **Add new assertion** or by clicking directly on the response preview:

{{< img src="synthetics/api_tests/assertions_setup.gif" alt="Assertions Setup" responsive="true" style="width:80%;">}}

#### Test Failure

A test is considered `FAILED` if it does not satisfy its assertions or if the request failed for another reason. These reasons include:

| Error           | Description                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CONNRESET       | The connection was abruptly closed by the remote server. Possible causes include the webserver encountering an error or crashing while responding, loss of connectivity of the webserver, etc. |
| DNS             | DNS entry not found for the check URL. Possible causes include misconfigured check URL, wrong configuration of your DNS entries, etc.                                                          |
| INVALID_REQUEST | The configuration of the check is invalid (e.g., typo in the URL).                                                                                                                             |
| SSL             | The SSL connection couldn't be performed. [See the dedicated error page for more information][1].                                                                                     |
| TIMEOUT         | The request couldn't be completed in a reasonable time.                                                                                                                                        |

If a test fails, the uptime directly considers the endpoint as `down`. It is not re-tested until the next test run.

### Notify your team

A notification is sent according to the set of alerting conditions. To configure notifications:

1. Select users and/or [services][2] to send the notifications to. Note that you can use the [`@-notification` feature][3] in the **message** field.
2. Enter a **message** for the API test. This field allows standard [Markdown formatting][4]. Notification messages include the **message** defined in this section and information about which assertion failed and why.
3. Click **Save** to save your API test.

Notifications example:

{{< img src="synthetics/api_tests/notifications-example.png" alt="API Test Notifications" responsive="true" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/errors#ssl-errors
[2]: /integrations/#cat-notification
[3]: /developers/faq/what-do-notifications-do-in-datadog
[4]: http://daringfireball.net/projects/markdown/syntax
