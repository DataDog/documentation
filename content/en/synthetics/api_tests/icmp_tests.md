---
title: ICMP Tests
kind: documentation
description: Monitor availability of your hosts and diagnose network issues
aliases:
  - /synthetics/icmp_test
  - /synthetics/icmp_check
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "/getting_started/synthetics/api_test"
  tag: "Documentation"
  text: "Get started with API tests"
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Run ICMP Pings on internal endpoints"
---


## Overview

ICMP tests allow you to easily monitor the availability of your hosts and diagnose network communication issues. By asserting on the values received from one or more ICMP pings to your endpoint, Datadog can help detect connectivity issues, above-quota latency for round trip times, and unexpected changes in security firewall configuration. The tests can also track the number of network hops (TTL) required to connect to your host and view traceroute results to discover details on each network hop along the path.

ICMP tests can run from [managed][1] and [private locations][2] depending on whether you want to trigger ICMP pings to your endpoints from outside or inside your network. You can run ICMP tests on a defined schedule, on demand or from within your [CI/CD pipelines][3].

## Configuration

After choosing the type of test you want to create ([`HTTP`][4], [`SSL`][5], [`TCP`][6], [`DNS`][7], or [`ICMP` test][8]), you can define your test's request.

### Define Request

{{< img src="synthetics/api_tests/icmp_test_config.png" alt="Define ICMP request" style="width:90%;" >}}

1. Specify the **Domain Name** or **IP address** to run your test on.
2. Select or Deselect **Track number of network hops (TTL)**. This option turns on a "traceroute" probe to discover all gateways along the path to the host destination.
3. Select the **Number of Pings** to trigger per test session. By default, the number of pings is set to 4 - you can choose to decrease or increase up to 10.
4. **Name** your ICMP test.
5. Add `env` **Tags** as well as any other tag to your ICMP test. You can then use these tags to quickly filter through your Synthetic tests on the [Synthetic Monitoring homepage][9].
6. Select the **Locations** to run your ICMP test from: ICMP tests can run from [managed][1] and [private locations][2] depending on whether you want to trigger the ICMP pings from outside or inside your network.

Click **Test URL** to try out the request configuration. A response preview should be displayed on the right side of your screen.


### Specify test frequency

ICMP tests can run:

* **On a schedule** to ensure your most important services are always accessible to your users. Select the frequency you want Datadog to run your ICMP test.

{{< img src="synthetics/api_tests/schedule.png" alt="Run API tests on schedule"  style="width:90%;" >}}

* [**Within your CI/CD pipelines**][3].
* **On-demand** to run your tests whenever makes the most sense for your teams.


### Define assertions

Assertions define what an expected test result is. When hitting `Test URL` basic assertions on `latency`, `packet loss` and `packet received` is added. You must define at least one assertion for your test to monitor.

| Type          | Aggregation    |Operator                                                                               | Value Type       |
|-----------------|----------------|------------------------------------------------------------------------|------------------|
| latency         | `avg`, `max`, `min` or `stddev` (aka `jitter`) |`is less than`, `is less than or equal`, <br> `is`, `is more than`, `is more than or equal` | _integer (ms)_    |
| packet loss     | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _percentage (%)_ |
| packet received | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _integer_        |
| network hops    | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _integer_        |

You can create up to 20 assertions per API test by selecting **New Assertion** or by selecting the response preview directly:

{{< img src="synthetics/api_tests/icmp_assertion.png" alt="Define assertions for your ICMP test" style="width:90%;" >}}


### Define alert conditions

You can set alert conditions to determine the circumstances when a test should fail and trigger an alert.

#### Alerting rule

When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes;
* At one moment during the last *X* minutes, at least *n* locations were in failure.

#### Fast retry

Your test can trigger retries in case of failed test result. By default, the retries are performed 300 milliseconds after the first failed test result. This interval can be configured via the [API][10].

Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

### Notify your team

A notification is sent by your test based on the [alerting conditions](#define-alert-conditions) previously defined. Use this section to define how and what message to send to your teams.

1. [Similar to monitors][11], select **users and/or services** that should receive notifications either by adding an `@notification` to the message or by searching for team members and connected integrations with the drop-down box.

2. Enter the notification **message** for your test. This field allows standard [Markdown formatting][12] and supports the following [conditional variables][13]:

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

Click **Save** to save your test and have Datadog start executing it.

## Variables

### Create local variables

You can create local variables by defining their values from one of the below available built-ins:

| Pattern                    | Description                                                                                                 |
|----------------------------|-------------------------------------------------------------------------------------------------------------|
| `{{ numeric(n) }}`         | Generates a numeric string with `n` digits.                                                                 |
| `{{ alphabetic(n) }}`      | Generates an alphabetic string with `n` letters.                                                            |
| `{{ alphanumeric(n) }}`    | Generates an alphanumeric string with `n` characters.                                                       |
| `{{ date(n, format) }}`    | Generates a date in one of our accepted formats with a value of the date the test is initiated + `n` days.        |
| `{{ timestamp(n, unit) }}` | Generates a timestamp in one of our accepted units with a value of the timestamp the test is initiated at +/- `n` chosen unit. |

### Use variables

You can use the [global variables defined in the `Settings`][13] and the [locally defined variables](#create-local-variables) in the URL and assertions of your ICMP tests.
To display your list of variables, type `{{` in your desired field:

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Using Variables in API tests" video="true" width="90%" >}}

## Test failure

A test is considered `FAILED` if it does not satisfy one or several assertions or if the request prematurely failed. In some cases, the test can fail without being able to test the assertions against the endpoint, these reasons include:

| Error             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                          |
| DNS               | DNS entry not found for the test URL. Possible causes include misconfigured test URL, wrong configuration of your DNS entries, etc.                    |                                                                                                                                                                                                                          

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/synthetics/#get-all-locations-public-and-private
[2]: /synthetics/private_locations
[3]: /api/v1/synthetics/#create-a-test
[4]: /synthetics/api_tests/http_tests
[5]: /synthetics/api_tests/ssl_tests
[6]: /synthetics/api_tests/tcp_tests
[7]: /synthetics/api_tests/dns_tests
[8]: /synthetics/api_tests/icmp_tests
[9]: /synthetics/ci
[10]: /monitors/notifications/?tab=is_alert#notification
[11]: https://www.markdownguide.org/basic-syntax/
[12]: /monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[13]: /synthetics/settings/#global-variables
