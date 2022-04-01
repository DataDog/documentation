---
title: GRPC Health Checks
kind: documentation
description: Simulate gRPC requests to monitor public and internal API endpoints
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: 'https://learn.datadoghq.com/course/view.php?id=39'
  tag: 'Learning Center'
  text: 'Introduction to Synthetic Tests'
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Run gRPC healthchecks on internal endpoints"
---
## Overview

gRPC health checks is a standard for reporting the health of gRPC services. It allows you to determine whether or not your gRPC servers and services are responsive, running, and capable of handling remote procedure calls (RPCs). 

You can implement the health checking mechanism as a gRPC service on a gRPC server. To access the health checks proto file example shared by the gRPC community, see the [open-source gRPC repository][1].

gRPC health check tests can run from both [managed][2] and [private locations][3] depending on your preference for running the test from outside or inside your network. gRPC tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][4].

<div class="alert alert-warning">
Share feedback about your gRPC use cases for Synthetic tests with the <a href="https://docs.datadoghq.com/help/">Support</a> team.
</div>

## Configuration

After choosing to create a `gRPC` health check test, define your test's request.

### Define request

1. Specify the **Host** and **Port** to run your health check test on. By default, the port is set to `50051`.
2. Enter the service you want to send a health check. Leave this field blank if you want to send a health check on the gRPC server.

3. **Name** your gRPC health check test.

4. Add `env` **Tags** as well as any other tag to your gRPC health check test. You can then use these tags to quickly filter through your Synthetic tests on the [Synthetic Monitoring homepage][5].

{{< img src="synthetics/api_tests/grpc_test_config.png" alt="Define gRPC request" style="width:90%;" >}} 

Click **Test Service** to try out the request configuration. A response preview is displayed on the right side of your screen.

### Define assertions

Assertions define what an expected test result is. After you click **Test Service**, an assertion on the `response time` and the `healthcheck status` are added based on the response that was obtained. You must define at least one assertion for your test to monitor.

| Type                    | Operator                                        | Value type                           |
|-------------------------|-------------------------------------------------|--------------------------------------|
| response time           | `is less than`                                  | _Integer (ms)_                       |
| healthcheck status      | `is`, `is not`                                  | _Integer (ms)_                       |

You can create up to 20 assertions per API test by clicking **New Assertion** or by clicking directly on the response preview:

{{< img src="synthetics/api_tests/assertions_grpc.png" alt="Define assertions for your gRPC test" style="width:90%;" >}}

### Select locations

Select the **Locations** to run your gRPC health check test from. gRPC health check tests can run from both [managed][2] and [private locations][3] depending on your preference for running the health check test from outside or inside your network.

### Specify test frequency

gRPC health check tests can run:

* **On a schedule** to ensure your most important services are always accessible to your users. Select the frequency at which you want Datadog to run your gRPC test.
* [**Within your CI/CD pipelines**][4] to start shipping without fearing faulty code might impact your customers experience.
* **On-demand** to run your tests whenever makes the most sense for your team.

### Define alert conditions

Set alert conditions to determine the circumstances under which you want a health check test to fail and trigger an alert.

#### Alerting rule

When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes;
* At one moment during the last *X* minutes, at least *n* locations were in failure.

#### Fast retry

Your health check test can trigger retries `X` times after `Y` ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

### Notify your team

A notification is sent by your test based on the [alerting conditions](#define-alert-conditions) previously defined. Use this section to define how and what message to send to your teams.

1. [Similar to how you configure monitors][6], select **users and/or services** that should receive notifications either by adding a `@notification`to the message or by searching for team members and connected integrations with the drop-down box.

2. Enter the notification **message** for your health check test. This field allows standard [Markdown formatting][7] and supports the following [conditional variables][8]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the test alerts.                                          |
    | `{{^is_alert}}`            | Show unless the test alerts.                                        |
    | `{{#is_recovery}}`         | Show when the test recovers from alert.                             |
    | `{{^is_recovery}}`         | Show unless the test recovers from alert.                           |

3. Specify how often you want your health check test to **re-send the notification message** in case of test failure. To prevent renotification on failing health check tests, leave the option as `Never renotify if the monitor has not been resolved`.

Click **Save** to save and start your health check test.

## Variables

### Create local variables

You can create local variables by clicking on **Create Local Variable** at the top right hand corner of your health check test configuration form. You can define their values from one of the below available builtins:

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

You can use the [global variables defined in the `Settings`][9] and the [locally defined variables](#create-local-variables) in the URL, advanced options, and assertions of your gRPC tests.

To display your list of variables, type `{{` in your desired field:

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Using Variables in API tests" video="true" width="90%" >}}

## Test failure

A health check test is considered `FAILED` if it does not satisfy one or more assertions or if the request prematurely failed. In some cases, the health check test can fail without testing the assertions against the endpoint. 

These reasons include the following:

`gRPC specific errors`
: gRPC has a list of specific status codes that can be found in the [official gRPC documentation][10].

`CONNRESET`
: The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or losing connectivity to the web server.

`DNS`
: DNS entry not found for the test URL. Possible causes include a misconfigured test URL or the wrong configuration of your DNS entries.

`INVALID_REQUEST` 
: The configuration of the test is invalid (for example, a typo in the URL).

`SSL`
: The SSL connection couldn't be performed. [See the dedicated error page for more information][11].

`TIMEOUT`
: The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen:
  - `TIMEOUT: The request couldn’t be completed in a reasonable time.` indicates that the request duration hit the test defined timeout (default is set to 60 seconds). 
  For each request, only the completed stages for the request are displayed in the network waterfall. For example, in the case of `Total response time` only being displayed, the timeout occurred during the DNS resolution.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indicates that the test duration (request and assertions) hits the maximum duration of 60.5 seconds.

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][12] can create, edit, and delete Synthetic gRPC health check tests. To get create, edit, and delete access to Synthetic gRPC health check tests, upgrade your user to one of those two [default roles][12].

If you are using the [custom role feature][13], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

## Restrict access

Access restriction is available for customers using [custom roles][14] on their accounts. 

You can restrict access to a browser test based on the roles in your organization. When creating a browser test, choose which roles (in addition to your user) can read and write your test. 

{{< img src="synthetics/settings/restrict_access.png" alt="Set permissions for your test" style="width:70%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: /api/v1/synthetics/#get-all-locations-public-and-private
[3]: /synthetics/private_locations
[4]: /synthetics/cicd_testing
[5]: /synthetics/search/#search
[6]: /monitors/notify/#notify-your-team
[7]: https://www.markdownguide.org/basic-syntax/
[8]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[9]: /synthetics/settings/#global-variables
[10]: https://grpc.github.io/grpc/core/md_doc_statuscodes.html
[11]: /synthetics/api_tests/errors/#ssl-errors
[12]: /account_management/rbac/
[13]: /account_management/rbac#custom-roles
[14]: /account_management/rbac/#create-a-custom-role
