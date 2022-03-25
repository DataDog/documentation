---
title: UDP Tests
kind: documentation
description: Simulate UDP connections on your hosts
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "https://www.datadoghq.com/blog/udp-websocket-api-tests/"
  tag: "Blog"
  text: "Run UDP and WebSocket tests to monitor latency-critical applications"
- link: "/getting_started/synthetics/api_test/"
  tag: "Documentation"
  text: "Get started with API tests"
---
## Overview

UDP tests allow you to monitor that low-level UDP connections can be established on the ports of given hosts, ensuring availability of any services living on UDP ports. With built-in response time data, you can keep track of the performance of your network applications and be alerted in case of unexpected slowness.

In normal UDP traffic, you transmit information from a source to a destination without asking for acknowledgement. 

In order to monitor your UDP services, Datadog recommends having a process on the receiving host that listens on the UDP port and responds back. After setting up this process, you can create a Synthetics test and set an assertion on the expected response.

UDP tests can run from both [managed][1] and [private locations][2] depending on your preference for running the test from outside or inside your network. UDP tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][3].

## Configuration

After choosing to create an `UDP` Test, define your test's request.

### Define request

1. Specify the **Host** and **Port** to run your test on. By default, the port is set to `443`.
2. Enter the string you want to send in your test. 
3. Specify the amount of time in seconds before the test times out (optional).
4. **Name** your UDP test.
5. Add `env` **Tags** as well as any other tag to your UDP test. You can then use these tags to quickly filter through your Synthetic tests on the [Synthetic Monitoring homepage][4].

{{< img src="synthetics/api_tests/udp_test_config.png" alt="Define UDP request" style="width:90%;" >}}

Click **Test URL** to try out the request configuration. A response preview is displayed on the right side of your screen. 

### Define assertions

Assertions define what an expected test result is. When you click **Test URL**, a basic assertion on `response time` is added. You must define at least one assertion for your test to monitor.

| Type            | Operator                                                                        | Value Type                        |
|-----------------|---------------------------------------------------------------------------------|-----------------------------------|
| response time   | `is less than`                                                                  | *Integer (ms)*                    |
| string response | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`| *String* <br> *[Regex][5]*        |

Select the response preview directly or click **New Assertion** to create an assertion. You can create up to 20 assertions per UDP test.

{{< img src="synthetics/api_tests/udp_assertions.png" alt="Define assertions for your UDP test" style="width:90%;" >}}

### Select locations

Select the **Locations** to run your UDP test from. UDP tests can run from both [managed][1] and [private locations][2] depending on your preference for running the test from outside or inside your network.

### Specify test frequency

UDP tests can run:

- **On a schedule** to ensure your most important services are always accessible to your users. Select the frequency at which you want Datadog to run your UDP test.
- [**Within your CI/CD pipelines**][3].
- **On-demand** to run your tests whenever makes the most sense for your team.

### Define alert conditions

You can set alert conditions to determine the circumstances under which a test should fail and trigger an alert.

#### Fast retry

Your test can trigger retries `X` times after `Y` ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

#### Alerting rule

When you set the alert conditions to `An alert is triggered if your test fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes;
* At one moment during the last *X* minutes, at least *n* locations were in failure.

### Notify your team

A notification is sent by your test based on the [alerting conditions](#define-alert-conditions) previously defined. Use this section to define how and what to message to send to your teams.

1. [Similar to how you configure monitors][6], select **users and/or services** that should receive notifications either by adding an `@notification`to the message or by searching for team members and connected integrations with the drop-down box.

2. Enter the notification **message** for your test. This field allows standard [Markdown formatting][7] and supports the following [conditional variables][8]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the test alerts.                                          |
    | `{{^is_alert}}`            | Show unless the test alerts.                                        |
    | `{{#is_recovery}}`         | Show when the test recovers from alert.                             |
    | `{{^is_recovery}}`         | Show unless the test recovers from alert.                           |

3. Specify how often you want your test to **re-send the notification message** in case of test failure. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.

Click **Save** to save and start your test.

## Variables

### Create local variables

To create a local variable, click **Create Local Variable** at the top right hand corner. You can define the value from one of the following available builtins:

`{{ numeric(n) }}`
: Generates a numeric string with `n` digits.

`{{ alphabetic(n) }}`
: Generates an alphabetic string with `n` letters.

`{{ alphanumeric(n) }}`
: Generates an alphanumeric string with `n` characters.

`{{ date(n unit, format) }}`
: Generates a date in one of our accepted formats with a value corresponding to the date the test is initiated at +/- `n` chosen unit.

`{{ timestamp(n, unit) }}` 
: Generates a timestamp in one of our accepted units with a value corresponding to the timestamp the test is initiated at +/- `n` chosen unit.

When you have entered a name and a value, click **Add Variable**.

### Use variables

You can use the [global variables defined in `Settings`][8] and [locally defined variables](#create-local-variables) in the URL and assertions of your UDP tests.

To display your list of variables, type `{{` in your desired field:

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Using Variables in API tests" video="true" width="90%" >}}

## Test failure

A test is considered `FAILED` if it does not satisfy one or more assertions or if the request prematurely failed. In some cases, the test can fail without testing the assertions against the endpoint. 

These reasons include the following:

`CONNRESET`
: The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or loss of connectivity of the web server.

`DNS`
: DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.

`INVALID_REQUEST` 
: The configuration of the test is invalid (for example, a typo in the URL).

`TIMEOUT`
: The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen:
  - `TIMEOUT: The request couldn’t be completed in a reasonable time.` indicates that the request duration hit the test defined timeout (default is set to 60s). 
  For each request only the completed stages for the request are displayed in the network waterfall. For example, in the case of `Total response time` only being displayed, the timeout occurred during the DNS resolution.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indicates that the test duration (request + assertions) hits the maximum duration (60.5s).

## Permissions

By default, only users with the Datadog Admin and Datadog Standard roles can create, edit, and delete Synthetic UDP tests. To get create, edit, and delete access to Synthetic UDP tests, upgrade your user to one of those two [default roles][9].

If you are using the [custom role feature][10], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

Access restriction is available for customers using [custom roles][11] on their accounts.

You can restrict access to a UDP test based on the roles in your organization. When creating a UDP test, choose which roles (in addition to your user) can read and write your test. 

{{< img src="synthetics/settings/restrict_access.png" alt="Set permissions for your test" style="width:70%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/synthetics/#get-all-locations-public-and-private
[2]: /synthetics/private_locations/
[3]: /synthetics/cicd_integrations
[4]: /synthetics/search/#search
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[6]: /monitors/notify/#notify-your-team
[7]: https://www.markdownguide.org/basic-syntax/
[8]: /synthetics/settings/#global-variables
[9]: /account_management/rbac/
[10]: /account_management/rbac#custom-roles
[11]: /account_management/rbac/#create-a-custom-role
