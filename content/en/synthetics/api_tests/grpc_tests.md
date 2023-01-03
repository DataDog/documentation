---
title: GRPC Tests
kind: documentation
description: Simulate gRPC requests to monitor public and internal API endpoints.
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "https://www.datadoghq.com/blog/grpc-health-check-datadog-synthetic-monitoring/"
  tag: "Blog"
  text: "Monitor your gRPC APIs with Datadog"
- link: 'https://learn.datadoghq.com/courses/intro-to-synthetic-tests'
  tag: 'Learning Center'
  text: 'Introduction to Synthetic Tests'
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Run gRPC tests on internal endpoints"
- link: "/synthetics/guide/synthetic-test-monitors"
  tag: "Documentation"
  text: "Learn about Synthetic test monitors"
---
## Overview

gRPC tests allow you to proactively monitor your gRPC services and servers. You can choose from two types:

Unary Calls
: Send gRPC requests to your applications' API endpoints to verify responses and defined conditions, such as overall response time, header, or body content.

Health Checks 
: gRPC health checks are a standard for reporting the health of gRPC services. Determine if your gRPC servers and services are responsive, running, and capable of handling remote procedure calls (RPCs).<br> By implementing gRPC health checks, you can run gRPC health checks tests without having to provide a `.proto` file to Datadog. For more information, see the [example health checks `.proto` file][1] shared by the gRPC community.

gRPC tests can run from both [managed](#select-locations) and [private locations][2] depending on your preference for running the test from outside or inside your network. gRPC tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][3].

## Configuration

After choosing to create a `gRPC` test, define your test's request.

### Define request

1. Specify the **Host** and **Port** to run your test on. By default, the port is set to `50051`.

{{< tabs >}}
{{% tab "Unary Call" %}}

2. Upload a [`.proto` file][1] that defines your gRPC server.

   - Select the service and method you want to send a gRPC message to from the dropdown menu.  
     Datadog does not support streaming methods, which are greyed out in-app.
   - Add a request message.  


[1]: https://grpc.io/docs/what-is-grpc/introduction/#working-with-protocol-buffers
{{% /tab %}}
{{% tab "Health Check" %}}
2. Enter the service you want to send a health check. Leave this field blank if you want to send a health check on the gRPC server.

{{% /tab %}}
{{< /tabs >}}

3. Add **Advanced Options** (optional) to your test:

   {{< tabs >}}

   {{% tab "Request Options" %}}
   
   * **Timeout**: Specify the amount of time in seconds before the test times out.
   * **Ignore server certificate error**: Select to have your gRPC test go on with connection even if there are errors when validating the SSL certificate.
   * **gRPC metadata**: Add and define metadata to your gRPC request to pass metadata between services.

   {{% /tab %}}

   {{% tab "Authentication" %}}

   * **Client certificate**: Authenticate through mTLS by uploading your client certificate (`.crt`) and the associated private key (`.key`) in `PEM` format. 

     <br/> 
   
     You can use the `openssl` library to convert your certificates. For example, convert a `PKCS12` certificate to `PEM` formatted private keys and certificates.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   {{% /tab %}}

   {{< /tabs >}}

3. **Name** your gRPC test.

4. Add `env` **Tags** as well as any other tag to your gRPC test. You can then use these tags to quickly filter through your Synthetic tests on the [Synthetic Monitoring homepage][4].

   {{< img src="synthetics/api_tests/grpc_test_config.png" alt="Define gRPC request" style="width:90%;" >}}

Click **Test Service** to try out the request configuration. A response preview is displayed on the right side of your screen.

### Define assertions

Assertions define what an expected test result is. After you click **Test Service**, an assertion on the `response time` is added based on the response that was obtained. You must define at least one assertion for your test to monitor.

{{< tabs >}}
{{% tab "Unary Call" %}}
| Type                    | Operator                                        | Value type                           |
|-------------------------|-------------------------------------------------|--------------------------------------|
| response time           | `is less than`                                  | _Integer (ms)_                       |
| gRPC response           | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][1], [`xpath`][2] | _String_ <br> _[Regex][3]_ |


[1]: https://restfulapi.net/json-jsonpath/
[2]: https://www.w3schools.com/xml/xpath_syntax.asp
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}
{{% tab "Health Check" %}}
| Type                    | Operator                                        | Value type                           |
|-------------------------|-------------------------------------------------|--------------------------------------|
| response time           | `is less than`                                  | _Integer (ms)_                       |
| healthcheck status      | `is`, `is not`                                  | _Integer (ms)_                       |

{{% /tab %}}
{{< /tabs >}}

You can create up to 20 assertions per API test by clicking **New Assertion** or by clicking directly on the response preview:

{{< img src="synthetics/api_tests/assertions_grpc.png" alt="Define assertions for your gRPC test to succeed or fail on" style="width:90%;" >}}

If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

### Select locations

Select the **Locations** to run your gRPC test from. gRPC tests can run from both managed and [private locations][2] depending on your preference for running the test from outside or inside your network.

{{% managed-locations %}} 

### Specify test frequency

gRPC tests can run:

* **On a schedule** to ensure your most important services are always accessible to your users. Select the frequency at which you want Datadog to run your gRPC test.
* [**Within your CI/CD pipelines**][3] to start shipping without fearing faulty code might impact your customers experience.
* **On-demand** to run your tests whenever makes the most sense for your team.

### Define alert conditions

Set alert conditions to determine the circumstances under which you want a test to fail and trigger an alert.

#### Alerting rule

When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes;
* At one moment during the last *X* minutes, at least *n* locations were in failure.

#### Fast retry

Your test can trigger retries `X` times after `Y` ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

### Configure the test monitor

A notification is sent by your test based on the [alerting conditions](#define-alert-conditions) previously defined. Use this section to define how and what to message your teams.

1. [Similar to how you configure monitors][5], select **users and/or services** that should receive notifications either by adding a `@notification`to the message or by searching for team members and connected integrations with the drop-down box.

2. Enter the notification **message** for your test. This field allows standard [Markdown formatting][6] and supports the following [conditional variables][7]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the test alerts.                                          |
    | `{{^is_alert}}`            | Show unless the test alerts.                                        |
    | `{{#is_recovery}}`         | Show when the test recovers from an alert.                          |
    | `{{^is_recovery}}`         | Show unless the test recovers from an alert.                        |
    | `{{#is_renotify}}`         | Show when the monitor renotifies.                                   |
    | `{{^is_renotify}}`         | Show unless the monitor renotifies.                                 |
    | `{{#is_priority}}`         | Show when the monitor matches priority (P1 to P5).                  |
    | `{{^is_priority}}`         | Show unless the monitor matches priority (P1 to P5).                |

3. Specify how often you want your test to **re-send the notification message** in case of test failure. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.

4. Click **Create** to save your test configuration and monitor.

For more information, see [Using Synthetic Test Monitors][8].

## Variables

### Create local variables

To create a local variable, click **Create a Local Variable** at the top right hand corner. You can select one of the following available builtins:

`{{ numeric(n) }}`
: Generates a numeric string with `n` digits.

`{{ alphabetic(n) }}`
: Generates an alphabetic string with `n` letters.

`{{ alphanumeric(n) }}`
: Generates an alphanumeric string with `n` characters.

`{{ date(n unit, format) }}`
: Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at + or - `n` units.

`{{ timestamp(n, unit) }}` 
: Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at +/- `n` units.

To obfuscate local variable values in test results, select **Hide and obfuscate variable value**. Once you have defined the variable string, click **Add Variable**.

### Use variables

You can use the [global variables defined in the `Settings`][9] in the URL, advanced options, and assertions of your gRPC tests.

To display your list of variables, type `{{` in your desired field:

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Using Variables in API tests" video="true" width="90%" >}}

## Test failure

A test is considered `FAILED` if it does not satisfy one or more assertions or if the request prematurely failed. In some cases, the test can fail without testing the assertions against the endpoint.

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

By default, only users with the [Datadog Admin and Datadog Standard roles][12] can create, edit, and delete Synthetic gRPC tests. To get create, edit, and delete access to Synthetic gRPC tests, upgrade your user to one of those two [default roles][12].

If you are using the [custom role feature][13], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

## Restrict access

Access restriction is available for customers using [custom roles][14] on their accounts.

You can restrict access to a browser test based on the roles in your organization. When creating a browser test, choose which roles (in addition to your user) can read and write your test.

{{< img src="synthetics/settings/restrict_access.png" alt="Set permissions for your test" style="width:70%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: /synthetics/private_locations
[3]: /synthetics/cicd_testing
[4]: /synthetics/search/#search
[5]: /monitors/notify/#notify-your-team
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /synthetics/guide/synthetic-test-monitors
[9]: /synthetics/settings/#global-variables
[10]: https://grpc.github.io/grpc/core/md_doc_statuscodes.html
[11]: /synthetics/api_tests/errors/#ssl-errors
[12]: /account_management/rbac/
[13]: /account_management/rbac#custom-roles
[14]: /account_management/rbac/#create-a-custom-role
