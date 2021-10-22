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

WebSocket tests allow you to proactively open WebSocket connections on your endpoints to verify responses and defined conditions, such as overall response time or expected header.

WebSocket tests can run from both [managed][1] and [private locations][2] depending on your preference for running the test from outside or inside your network. WebSocket tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][3].

## Configuration

After choosing to create an `WebSocket` test, define your test's request.

### Define request

[Screenshot 1: WebSocket Flow]

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

Click **Test URL** to try out the request configuration. A response preview is displayed on the right side of your screen.

### Define assertions

Assertions define what an expected test result is. When you click **Test URL**, basic assertions on `response time` and `string response` are added. You must define at least one assertion for your test to monitor.

| Type            | Operator                                                                         | Value Type                        |
|-----------------|----------------------------------------------------------------------------------|-----------------------------------|
| response time   | `is less than`                                                                   | _Integer (ms)_                    |
| string response | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match` | _String_                          |
| header          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match` | _String_ <br> _[Regex][5]_        |

Select the response preview directly or click **New Assertion** to create an assertion. You can create up to 20 assertions per WebSocket test.

[Screenshot 2: WebSocket Assertions]

### Select locations

Select the **Locations** to run your WebSocket test from. WebSocket tests can run from both [managed][1] and [private locations][2] depending on your preference for running the test from outside or inside your network.

### Specify test frequency

WebSocket tests can run:

* **On a schedule** to ensure your most important endpoints are always accessible to your users. Select the frequency you want Datadog to run your WebSocket test.

{{< img src="synthetics/api_tests/schedule.png" alt="Run API tests on schedule" style="width:90%;" >}}

* [**Within your CI/CD pipelines**][3] to start shipping without fearing faulty code might impact your customers experience.
* **On-demand** to run your tests whenever makes the most sense for your teams.

### Define alert conditions

Set alert conditions to determine the circumstances under which you want a test to fail and trigger an alert.

#### Alerting rule

When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes;
* At one moment during the last *X* minutes, at least *n* locations were in failure.

#### Fast retry

Your test can trigger retries `X` times after `Y` ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

### Notify your team

A notification is sent by your test based on the [alerting conditions](#define-alert-conditions) previously defined. Use this section to define how and what message to send to your teams.

1. [Similar to monitors][6], select **users and/or services** that should receive notifications either by adding a `@notification`to the message or by searching for team members and connected integrations with the drop-down box.

2. Enter the notification **message** for your test. This field allows standard [Markdown formatting][7] and supports the following [conditional variables][8]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the test alerts.                                          |
    | `{{^is_alert}}`            | Show unless the test alerts.                                        |
    | `{{#is_recovery}}`         | Show when the test recovers from alert.                             |
    | `{{^is_recovery}}`         | Show unless the test recovers from alert.                           |

3. Specify how often you want your test to **re-send the notification message** in case of test failure. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.

Email notifications include the message defined in this section as well as a summary of failed assertions. For example:

{{< img src="synthetics/api_tests/notifications-example.png" alt="API Test Notifications" style="width:90%;" >}}

Click **Save** to save and start your test.

## Variables

### Create local variables

You can create local variables by clicking on **Create Local Variable** at the top right hand corner of your test configuration form. You can define their values from one of the below available builtins:

`{{ numeric(n) }}`
: Generates a numeric string with `n` digits.

`{{ alphabetic(n) }}`
: Generates an alphabetic string with `n` letters.

`{{ alphanumeric(n) }}`
: Generates an alphanumeric string with `n` characters.

`{{ date(n, format) }}`
: Generates a date in one of our accepted formats with a value of the date the test is initiated + `n` days.

`{{ timestamp(n, unit) }}` 
: Generates a timestamp in one of our accepted units with a value of the timestamp the test is initiated at +/- `n` chosen unit.

### Use variables

You can use the [global variables defined in the `Settings`][5] and the [locally defined variables](#create-local-variables) in the URL, advanced options, and assertions of your WebSocket tests.

To display your list of variables, type `{{` in your desired field:

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Using Variables in API tests" video="true" width="90%" >}}

## Test failure

A test is considered `FAILED` if it does not satisfy one or several assertions or if the request prematurely failed. In some cases, the test can indeed fail without being able to test the assertions against the endpoint, these reasons include:

`CONNRESET`
: The connection was abruptly closed by the remote server. Possible causes include the webserver encountering an error or crashing while responding, or loss of connectivity of the webserver.

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
[6]: /monitors/notifications/?tab=is_alert#notification
[7]: https://www.markdownguide.org/basic-syntax/
[8]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[9]: /synthetics/api_tests/errors/#ssl-errors
[10]: /account_management/rbac/
[11]: /account_management/rbac#custom-roles
