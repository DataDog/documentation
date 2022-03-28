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
  text: "Run ICMP pings on internal endpoints"
---

## Overview

ICMP tests allow you to monitor the availability of your hosts and diagnose network communication issues. By asserting on the values received from one or more ICMP pings to your endpoint, Datadog can help detect connectivity issues, above-quota latency for round trip times, and unexpected changes in security firewall configuration. The tests can also track the number of network hops (TTL) required to connect to your host and view traceroute results to discover details on each network hop along the path.

ICMP tests can run from both [managed][1] and [private locations][2] depending on whether you want to trigger ICMP pings to your endpoints from outside or inside your network. You can run ICMP tests on a defined schedule, on demand, or from within your [CI/CD pipelines][3].

## Configuration

After choosing to create an `ICMP` test, define your test's request.

### Define request

1. Specify the **Domain Name** or **IP address** to run your test on.
2. Select or deselect **Track number of network hops (TTL)**. When selected, this option turns on a "traceroute" probe to discover all gateways along the path to the host destination.
3. Select the **Number of Pings** to trigger per test session. By default, the number of pings is set to four. You can choose to decrease this number or increase it up to ten.
4. **Name** your ICMP test.
5. Add `env` **Tags** as well as any other tags to your ICMP test. You can then use these tags to quickly filter through your Synthetic tests on the [Synthetic Monitoring homepage][4].

{{< img src="synthetics/api_tests/icmp_test_config.png" alt="Define ICMP request" style="width:90%;" >}}

Click **Test URL** to try out the request configuration. A response preview is displayed on the right side of your screen.

### Define assertions

Assertions define what an expected test result is. After you click **Test URL**, basic assertions on `latency`, `packet loss`, and `packet received` are added. You must define at least one assertion for your test to monitor.

| Type          | Aggregation    |Operator                                                                               | Value Type       |
|-----------------|----------------|------------------------------------------------------------------------|------------------|
| latency         | `avg`, `max`, `min` or `stddev` (aka `jitter`) |`is less than`, `is less than or equal`, <br> `is`, `is more than`, `is more than or equal` | _integer (ms)_    |
| packet loss     | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _percentage (%)_ |
| packet received | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _integer_        |
| network hops    | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _integer_        |

You can create up to 20 assertions per API test by selecting **New Assertion** or by selecting the response preview directly:

{{< img src="synthetics/api_tests/icmp_assertion.png" alt="Define assertions for your ICMP test" style="width:90%;" >}}

### Select locations

Select the **Locations** to run your ICMP test from. ICMP tests can run from both [managed][1] and [private locations][2] depending on whether you want to trigger the ICMP pings from outside or inside your network.

### Specify test frequency

ICMP tests can run:

* **On a schedule** to ensure your most important services are always accessible to your users. Select the frequency at which you want Datadog to run your ICMP test.
* [**Within your CI/CD pipelines**][3].
* **On-demand** to run your tests whenever makes the most sense for your team.

### Define alert conditions

You can set alert conditions to determine the circumstances under which a test should fail and trigger an alert.

#### Alerting rule

When you set the alert conditions to: `An alert is triggered if your test fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes.
* At one moment during the last *X* minutes, at least *n* locations were in failure.

#### Fast retry

Your test can trigger retries `X` times after `Y` ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

### Notify your team

Your test sends a notification based on the [alerting conditions](#define-alert-conditions) previously defined. Use this section to define what messages to send to your teams and how to send them.

1. [Similar to how you configure monitors][5], select **users and/or services** that should receive notifications either by adding a `@notification` to the message or by searching for team members and connected integrations with the drop-down box.

2. Enter the notification **message** for your test. This field allows standard [Markdown formatting][6] and supports the following [conditional variables][7]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the test alerts.                                          |
    | `{{^is_alert}}`            | Show unless the test alerts.                                        |
    | `{{#is_recovery}}`         | Show when the test recovers from alert.                             |
    | `{{^is_recovery}}`         | Show unless the test recovers from alert.                           |

3. Specify how often you want your test to **resend the notification message** in the case of test failure. To prevent renotifications from failing tests, leave the option as `Never renotify if the monitor has not been resolved`.

Click **Save** to save your test and have Datadog start executing it.

## Variables

### Create local variables

You can create local variables by clicking **Create Local Variable** at the top right hand corner of your test configuration form. You can define their values from one of the below available builtins:

`{{ numeric(n) }}`
: Generates a numeric string with `n` digits.

`{{ alphabetic(n) }}`
: Generates an alphabetic string with `n` letters.

`{{ alphanumeric(n) }}`
: Generates an alphanumeric string with `n` characters.

`{{ date(n, format) }}`
: Generates a date in one of Datadog's accepted formats with the value of the date the test is initiated + `n` days.

`{{ timestamp(n, unit) }}` 
: Generates a timestamp in one of Datadog's accepted units with a value of the timestamp the test is initiated at +/- `n` chosen units.

### Use variables

You can use the [global variables defined in the `Settings`][8] and the [locally defined variables](#create-local-variables) in the URL and assertions of your ICMP tests.

To display your list of variables, type `{{` in your desired field:

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Using Variables in API tests" video="true" width="90%" >}}

## Test failure

A test is considered `FAILED` if it does not satisfy one or more assertions or if the request prematurely failed. In some cases, the test can fail without testing the assertions against the endpoint. 

These reasons include the following:

`DNS`
: DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][9] can create, edit, and delete Synthetic ICMP tests. To get create, edit, and delete access to Synthetic ICMP tests, upgrade your user to one of those two [default roles][9].

If you are using the [custom role feature][10], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

Access restriction is available for customers using [custom roles][11] on their accounts.

You can restrict access to an ICMP test based on the roles in your organization. When creating an ICMP test, choose which roles (in addition to your user) can read and write your test. 

{{< img src="synthetics/settings/restrict_access.png" alt="Set permissions for your test" style="width:70%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/synthetics/#get-all-locations-public-and-private
[2]: /synthetics/private_locations
[3]: /synthetics/cicd_integrations
[4]: /synthetics/search/#search
[5]: /monitors/notify/#notify-your-team
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /synthetics/settings/#global-variables
[9]: /account_management/rbac/
[10]: /account_management/rbac#custom-roles
[11]: /account_management/rbac/#create-a-custom-role
