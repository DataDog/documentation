---
title: TCP Tests
kind: documentation
description: Simulate TCP connections on your hosts from specific connections
aliases:
  - /synthetics/tcp_test
  - /synthetics/tcP_check
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "/getting_started/synthetics/api_test"
  tag: "Documentation"
  text: "Get started with API tests"
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Run TCP tests on internal hosts"
---

## Overview

TCP tests allow you to easily **monitor that low-level TCP connections can be established on the ports of given hosts**, ensuring availability of a variety of key services: e.g., `SSH` (22), `SMTP` (25), `DNS` (53), VPN over `HTTPS` (443), and any custom services living on other ports. Thanks to built-in response time data, you can keep track of the performance of your network applications and be alerted in case of unexpected slowness.
TCP tests can run from [managed][1] and [private locations][2] depending on whether you are willing to launch your TCP connections from **outside or inside your network**.

## Configuration

After choosing the type of test you are willing to create ([`HTTP`][3], [`SSL`][4], [`TCP`][5], or [`DNS` test][6]), you can define your test's request.

### Define request

{{< img src="synthetics/api_tests/tcp_test_config.png" alt="Define TCP connection"  style="width:90%;" >}}

1. Specify the **Host** and the **Port** to run your test on. By default, the port is set to `443`.
2. **Name** your TCP test.
3. Add `env` **Tags** as well as any other tag to your TCP test. You can then use these tags to quickly filter through your Synthetic tests on the [Synthetic Monitoring homepage][7].
4. Select the **Locations** to run your TCP test from: TCP tests can run from [managed][1] and [private locations][2] depending on whether you are willing to launch the connection from outside or inside your network.

Click on **Test URL** to try out the request configuration. You should see a response preview show up on the right side of your screen.

### Specify test frequency

TCP tests can run:

* **On a schedule** to ensure your most important services are always accessible to your users. Select the frequency you want Datadog to run your TCP test.

{{< img src="synthetics/api_tests/schedule.png" alt="Run API tests on schedule"  style="width:90%;" >}}

* [**Within your CI/CD pipelines**][8].
* **On-demand** to run your tests whenever makes the most sense for your teams.

### Define assertions

Assertions define what an expected test result is. When hitting `Test URL` basic assertions on `response time` is added. You must define at least one assertion for your test to monitor.

| Type          | Operator                                                                | Value type     |
|---------------|-------------------------------------------------------------------------|----------------|
| response time | `is less than`                                                          | _Integer (ms)_ |

You can create up to 10 assertions per API test by clicking on **New Assertion** or by clicking directly on the response preview:

{{< img src="synthetics/api_tests/assertions.png" alt="Define assertions for your TCP test" style="width:90%;" >}}

### Define alert conditions

Set alert conditions to determine the circumstances under which you want a test to fail and trigger an alert.

#### Alerting rule

When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes;
* At one moment during the last *X* minutes, at least *n* locations were in failure.

#### Fast retry

Your test can trigger retries in case of failed test result. By default, the retries are performed 300 ms after the first failed test result-this interval can be configured via the [API][9].


Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

### Notify your team

A notification is sent by your test based on the [alerting conditions](#define-alert-conditions) previously defined. Use this section to define how and what message to send to your teams.

1. [Similar to monitors][10], select **users and/or services** that should receive notifications either by adding an `@notification `to the message or by searching for team members and connected integrations with the drop-down box.

2. Enter the notification **message** for your test. This field allows standard [Markdown formatting][11] and supports the following [conditional variables][12]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the test alerts.                                          |
    | `{{^is_alert}}`            | Show unless the test alerts.                                        |
    | `{{#is_recovery}}`         | Show when the test recovers from alert.                             |
    | `{{^is_recovery}}`         | Show unless the test recovers from alert.                           |

3. Specify how often you want your test to **re-send the notification message** in case of test failure. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.

Email notifications include the message defined in this section as well as a summary of failed assertions.
Notifications example:

{{< img src="synthetics/api_tests/notifications-example.png" alt="API Test Notifications"  style="width:90%;" >}}

Click on **Save** to save your test and have Datadog start executing it.

## Variables

### Create local variables

You can create local variables by defining their values from one of the below available builtins:

| Pattern                    | Description                                                                                                 |
|----------------------------|-------------------------------------------------------------------------------------------------------------|
| `{{ numeric(n) }}`         | Generates a numeric string with `n` digits.                                                                 |
| `{{ alphabetic(n) }}`      | Generates an alphabetic string with `n` letters.                                                            |
| `{{ alphanumeric(n) }}`    | Generates an alphanumeric string with `n` characters.                                                       |
| `{{ date(n, format) }}`    | Generates a date in one of our accepted formats with a value of the date the test is initiated + `n` days.        |
| `{{ timestamp(n, unit) }}` | Generates a timestamp in one of our accepted units with a value of the timestamp the test is initiated at +/- `n` chosen unit. |

### Use variables

You can use the [global variables defined in the `Settings`][13] and the [locally defined variables](#create-local-variables) in the URL, Advanced Options, and assertions of your HTTP tests.
To display your list of variables, type `{{` in your desired field:

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Using Variables in API tests" video="true" width="90%" >}}

## Test failure

A test is considered `FAILED` if it does not satisfy one or several assertions or if the request prematurely failed. In some cases, the test can indeed fail without being able to test the assertions against the endpoint, these reasons include:

| Error             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CONNRESET`       | The connection was abruptly closed by the remote server. Possible causes include the webserver encountering an error or crashing while responding, or loss of connectivity of the webserver.                                                                                                                                                                                                                                                         |
| DNS               | DNS entry not found for the test URL. Possible causes include misconfigured test URL, wrong configuration of your DNS entries, etc.                                                                                                                                                                                                                                                                                                                  |
| `INVALID_REQUEST` | The configuration of the test is invalid (for example, a typo in the URL).                                                                                                                                                                                                                                                                                                                                                                                     |
| `TIMEOUT`         | The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen. <br> - `TIMEOUT: The request couldn’t be completed in a reasonable time.` indicates that the timeout happened at the TCP socket connection level. <br> - `TIMEOUT: Retrieving the response couldn’t be completed in a reasonable time.` indicates that the timeout happened on the overall run (which includes TCP socket connection, data transfer, and assertions). |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/synthetics/#get-all-locations-public-and-private
[2]: /synthetics/private_locations
[3]: /synthetics/api_tests/http_tests
[4]: /synthetics/api_tests/ssl_tests
[5]: /synthetics/api_tests/tcp_tests
[6]: /synthetics/api_tests/dns_tests
[7]: /synthetics/search/#search
[8]: /synthetics/ci
[9]: /api/v1/synthetics/#create-a-test
[10]: /monitors/notifications/?tab=is_alert#notification
[11]: https://www.markdownguide.org/basic-syntax/
[12]: /monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[13]: /synthetics/settings/#global-variables
[14]: /synthetics/api_tests/errors/#ssl-errors
