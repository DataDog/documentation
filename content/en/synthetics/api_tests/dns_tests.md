---
title: DNS Tests
kind: documentation
description: Monitor resolvability and lookup times of your DNS records
aliases:
  - /synthetics/dns_test
  - /synthetics/dns_check
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "/getting_started/synthetics/api_test"
  tag: "Documentation"
  text: "Get started with API tests"
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Test DNS resolution of your internal endpoints"
- link: "https://www.datadoghq.com/blog/monitor-dns-with-datadog/"
  tag: "Blog"
  text: "DNS monitoring with Datadog"
---

## Overview

DNS tests allow you to proactively monitor the **resolvability and lookup times of your DNS records using any nameserver**. If resolution is unexpectedly slow or if a DNS server answers with unexpected A, AAAA, CNAME, TXT, or MX entries, Datadog sends you an **alert with details on the failure**, allowing you to quickly pinpoint the root cause of the issue and fix it.
DNS tests can run from [managed][1] and [private locations][2] allowing you to run tests on **public domains** as well as **internal services** that might be using internal DNS.

## Configuration

After choosing the type of test you are willing to create ([`HTTP`][3], [`SSL`][4], [`TCP`][5], or [`DNS` test][6]), you can define your test's request.

### Define request

{{< img src="synthetics/api_tests/dns_test_config.png" alt="Define DNS query"  style="width:90%;" >}}

1. Specify the **Domain** you want your test to query. For example, `www.example.com`.
2. Specify the `DNS Server` to use (optional), it can be a domain name or an IP address. If not specified, your DNS test performs resolution using `8.8.8.8`, with a fallback on `1.1.1.1` and an internal AWS DNS server.
3. **Name** your DNS test.
4. Add `env` **Tags** as well as any other tag to your DNS test. You can then use these tags to quickly filter through your Synthetic tests on the [Synthetic Monitoring homepage][7].
5. Select the **Locations** to run your DNS test from: DNS tests can run from [managed][1] and [private locations][2] depending on whether you are willing to monitor a public or a private domain.

Click on **Test URL** to try out the request configuration. You will see a response preview show up on the right side of your screen.

### Specify test frequency

DNS tests can run:

* **On a schedule** to ensure your most important services are always accessible to your users. Select the frequency you want Datadog to run your DNS test.

{{< img src="synthetics/api_tests/schedule.png" alt="Run API tests on schedule"  style="width:90%;" >}}

* [**Within your CI/CD pipelines**][8].
* **On-demand** to run your tests whenever makes the most sense for your teams.

### Define assertions

Assertions define what an expected test result is. When hitting `Test URL` basic assertions on `response time` and available records are added. You must define at least one assertion for your test to monitor.

| Type                | Record type                                                     | Operator                                           | Value type                 |
|---------------------|-----------------------------------------------------------------|----------------------------------------------------|----------------------------|
| response time       |                                                                 | `is less than`                                     | _Integer (ms)_             |
| every record        | of type A, of type AAAA, of type MX, of type TXT, of type CNAME | `is`, `contains`, <br> `matches`, `does not match` | _String_ <br> _[Regex][9]_ |
| at least one record | of type A, of type AAAA, of type MX, of type TXT, of type CNAME | `is`, `contains`, <br> `matches`, `does not match` | _String_ <br> _[Regex][9]_ |

You can create up to 10 assertions per API test by clicking on **New Assertion** or by clicking directly on the response preview:

{{< img src="synthetics/api_tests/assertions.png" alt="Define assertions for your DNS test" style="width:90%;" >}}

### Define alert conditions

Set alert conditions to determine the circumstances under which you want a test to fail and trigger an alert.

#### Alerting rule

When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes;
* At one moment during the last *X* minutes, at least *n* locations were in failure.

#### Fast retry

Your test can trigger retries in case of failed test result. By default, the retries are performed 300 ms after the first failed test result-this interval can be configured via the [API][10].


Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

### Notify your team

A notification is sent by your test based on the [alerting conditions](#define-alert-conditions) previously defined. Use this section to define how and what message to send to your teams.

1. [Similar to monitors][11], select **users and/or services** that should receive notifications either by adding an `@notification `to the message or by searching for team members and connected integrations with the drop-down box.

2. Enter the notification **message** for your test. This field allows standard [Markdown formatting][12] and supports the following [conditional variables][13]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the test alerts.                                          |
    | `{{^is_alert}}`            | Show unless the test alerts.                                        |
    | `{{#is_recovery}}`         | Show when the test recovers from alert.                             |
    | `{{^is_recovery}}`         | Show unless the test recovers from alert.                           |

3. Specify how often you want your test to **re-send the notification message** in case of test failure. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.

Email notifications include the message defined in this section as well as a summary of failed assertions. Notifications example:

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

You can use the [global variables defined in the `Settings`][14] and the [locally defined variables](#create-local-variables) in the URL, Advanced Options, and assertions of your HTTP tests.
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
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[10]: /api/v1/synthetics/#create-a-test
[11]: /monitors/notifications/?tab=is_alert#notification
[12]: https://www.markdownguide.org/basic-syntax/
[13]: /monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[14]: /synthetics/settings/#global-variables
