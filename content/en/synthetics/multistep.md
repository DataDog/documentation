---
title: Multistep API Tests
kind: documentation
description: Chain requests to monitor sophisticated transactions on your key services.
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-apis-with-datadog/"
  tag: "Blog"
  text: "Monitor your workflows with Datadog multistep API tests"
- link: 'https://learn.datadoghq.com/courses/intro-to-synthetic-tests'
  tag: 'Learning Center'
  text: 'Introduction to Synthetic Tests'
- link: "/getting_started/synthetics/api_test"
  tag: "Documentation"
  text: "Get started with API tests"
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Run Multistep API tests on internal endpoints"
- link: "/synthetics/guide/synthetic-test-monitors"
  tag: "Documentation"
  text: "Learn about Synthetic test monitors"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test"
  tag: "Terraform"
  text: "Create and manage Synthetic Multistep API Tests with Terraform"
---

## Overview

Multistep API tests allow you to chain several [HTTP requests][1] at once to proactively monitor and ensure that the sophisticated journeys on your key services are available at anytime, and from anywhere. If you want to perform single requests to your services, leverage [API tests][2].

You can accomplish the following:

* Execute HTTP requests on API endpoints requiring authentication (for example, through a token)
* Monitor key business transactions at the API level
* Simulate end-to-end mobile application journeys

{{< img src="synthetics/multistep_tests/multistep_test_steps.png" alt="Multiple test steps in a multistep API test" style="width:90%;" >}}

If one of your services starts answering more slowly, or in an unexpected way (for example, unexpected response body or status code), your test can [**alert your team**][3], [**block your CI pipeline**][4], or even [**roll back the faulty deployment**][4].

Multistep API tests can run from Datadog [managed](#select-locations) and [private locations][5], allowing **full coverage of your systems**, both external and internal.

## Configuration

### Name and tag your test

1. Name your Multistep API test.
2. Add `env` and other tags to your Multistep API test. You can use these tags to quickly filter through your Synthetic tests on the [Synthetic Monitoring homepage][6].

### Select locations

Select the **Locations** for your Multistep API test. Multistep API tests can run from both managed and [private locations][5] depending on your preference for running the test from outside or inside your network.

{{% managed-locations %}} 

### Define steps

To create an HTTP request step, click **Create Your First Step**.

{{< img src="synthetics/api_tests/ms_create_request.png" alt="Create your Multistep API test requests" style="width:90%;" >}}

By default, you can create up to 10 test steps. To increase this limit, contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a>.

#### Define the request

1. **Name** your step.
2. Choose the **HTTP Method** and specify the **URL** to query. Available methods are: `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE`, and `OPTIONS`. Both `http` and `https` URLs are supported.
3. Enrich your HTTP request with **Advanced Options** (optional):

   {{< tabs >}}

   {{% tab "Request Options" %}}

   * **Follow redirects**: Tick to have your HTTP test follow up to ten redirects when performing the request.
   * **Ignore server certificate error**: Tick to have your HTTP test go on with connection even if there are errors when validating the SSL certificate.
   * **Request headers**: Define headers to add to your HTTP request. You can also override the default headers (for example, the `user-agent` header).
   * **Cookies**: Define cookies to add to your HTTP request. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

   {{% /tab %}}

   {{% tab "Authentication" %}}

   * **Client certificate**: Authenticate through mTLS by uploading your client certificate and the associated private key.
   * **HTTP Basic Auth**: Add HTTP basic authentication credentials.
   * **Digest Auth**: Add Digest authentication credentials. 
   * **NTLM**: Add NTLM authentication credentials. Support both NTLMv2 and NTLMv1.
   * **AWS Signature v4**: Enter your Access Key ID and Secret Access Key. Datadog generates the signature for your request. This option uses the basic implementation of SigV4. Specific signatures such as AWS S3 are not supported out-of-the box.  
   For "Single Chunk" transfer requests to AWS S3 buckets, add `x-amz-content-sha256` containing the sha256-encoded body of the request as a header (for an empty body: `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).
   * **OAuth 2.0**: Choose between granting client credentials or a resource owner password and enter an access token URL. Depending on your selection, enter a client ID and secret, or a username and password. From the dropdown menu, select an option to either send the API token as a basic authentication header, or send the client credentials in the body. Optionally, you can provide additional information such as the audience, resource, and scope (as well as the client ID and secret, if you selected **Resource Owner Password**).

   {{% /tab %}}

   {{% tab "Query Parameters" %}}

   * **Encode parameters**: Add the name and value of query parameters that require encoding. 

   {{% /tab %}}

   {{% tab "Request Body" %}}

   * **Body type**: Select the type of the request body (`text/plain`, `application/json`, `text/xml`, `text/html`, `application/x-www-form-urlencoded`, `GraphQL`, or `None`) you want to add to your HTTP request.
   * **Request body**: Add the content of your HTTP request body. The request body is limited to a maximum size of 50 kilobytes.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **Proxy URL**: Specify the URL of the proxy the HTTP request should go through (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * **Proxy Header**: Add headers to include in the HTTP request to the proxy.

   {{% /tab %}}
  
   {{% tab "Privacy" %}}

   * **Do not save response body**: Select this option to prevent the response body from being saved at runtime. This is helpful to ensure no sensitive data is displayed in your test results, but it can make failure troubleshooting more difficult. For information about security recommendations, see [Synthetic Monitoring Data Security][1].

[1]: /data_security/synthetics
   {{% /tab %}}

   {{< /tabs >}}

Click **Test URL** to try out the request configuration. A response preview appears.

{{< img src="synthetics/api_tests/ms_define_request.png" alt="Define request for your Multistep API test" style="width:90%;" >}}

#### Add assertions

Assertions define what an expected test result is. After you click **Test URL**, basic assertions on `response time`, `status code`, and `header` `content-type` are added based on the response that was obtained. Assertions are optional in multistep API tests.

| Type          | Operator                                                                                               | Value type                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][7], [`xpath`][8] | _String_ <br> _[Regex][9]_ <br> _String_, _[Regex][9]_ |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _String_ <br> _[Regex][9]_                                      |
| response time | `is less than`                                                                                         | _Integer (ms)_                                                  |
| status code   | `is`, `is not`                                                                                         | _Integer_                                                      |

HTTP tests can decompress bodies with the following `content-encoding` headers: `br`, `deflate`, `gzip`, and `identity`.

- If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

- If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

{{< img src="synthetics/api_tests/ms_assertions.png" alt="Define assertions for your Multistep API test to succeed or fail on" style="width:90%;" >}}

You can create up to 20 assertions per step by clicking **New Assertion** or by clicking directly on the response preview.

#### Add execution parameters

Click **Continue with test if this step fails** to allow your test to move on with subsequent steps after step failure. This ensures your tests are able to clean up after themselves. For example, a test may create a resource, perform a number of actions on that resource, and end with the deletion of that resource. 

In case one of the intermediary steps fail, you want to have this setting enabled on every intermediary step to ensure that the resource is deleted at the end of the test and that no false positives are created.

The test generates an alert if an endpoint does not answer as expected. Your test can trigger retries X times after Y ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

#### Extract variables from the response

Optionally, extract variables from the response of your HTTP request by parsing its response headers or body. The value of the variable updates each time the HTTP request step runs.

To start parsing a variable, click **Extract a variable from response content**:

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores and must have at least three characters.
2. Decide whether to extract your variable from the response headers or from the response body.

   * Extract the value from **response header**: use the full response header of your HTTP request as the variable value, or parse it with a [`regex`][9].
   * Extract the value from **response body**: use the full response body of your HTTP request as the variable value or parse it with a [`regex`][9], a [`JSONPath`][7], or a [`XPath`][8].

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="Extract variables from HTTP requests in Multistep API test" style="width:90%;" >}}

You can extract up to ten variables per test step. Once created, this variable can be used in the following steps of your multistep API test. For more information, see [Use variables](#use-variables).

### Specify test frequency

Multistep API tests can run:

* **On a schedule** to ensure your most important endpoints are always accessible to your users. Select the frequency you want Datadog to run your Multistep API test.

{{< img src="synthetics/api_tests/schedule.png" alt="Run API tests on schedule" style="width:90%;" >}}

* [**Within your CI/CD pipelines**][4] to start shipping without fearing faulty code might impact your customers experience.
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

### Configure the test monitor

A notification is sent by your test based on the [alerting conditions](#define-alert-conditions) previously defined. Use this section to define how and what to message your team.

1. [Similar to monitors][10], select **users and/or services** that should receive notifications either by adding an `@notification` to the message or by searching for team members and connected integrations with the dropdown box.

2. Enter the notification **message** for your test. This field allows standard [Markdown formatting][11] and supports the following [conditional variables][12]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the test alerts.                                          |
    | `{{^is_alert}}`            | Show unless the test alerts.                                        |
    | `{{#is_recovery}}`         | Show when the test recovers from alert.                             |
    | `{{^is_recovery}}`         | Show unless the test recovers from alert.                           |

3. Specify how often you want your test to **re-send the notification message** in case of test failure. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.
4. Click **Create** to save your test configuration and monitor.

For more information, see [Using Synthetic Test Monitors][13].

## Variables

### Extract variables

In addition to creating local variables, you can [extract variables from any step](#extract-variables-from-the-response) of your multistep API test and [re-inject the values in subsequent steps](#use-variables).

### Create local variables

To create a local variable, click **Create a Local Variable** at the top right hand corner. You can select one of the following available builtins:

`{{ numeric(n) }}`
: Generates a numeric string with `n` digits.

`{{ alphabetic(n) }}`
: Generates an alphabetic string with `n` letters.

`{{ alphanumeric(n) }}`
: Generates an alphanumeric string with `n` characters.

`{{ uuid }}`
: Generates a version 4 universally unique identifier (UUID).

`{{ date(n unit, format) }}`
: Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at + or - `n` units.

`{{ timestamp(n, unit) }}` 
: Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at + or - `n` units.

To obfuscate local variable values in test results, select **Hide and obfuscate variable value**. Once you have defined the variable string, click **Add Variable**.

### Use variables

You can use the [global variables defined in the `Settings`][14] and the [locally defined variables](#create-local-variables) in the URL, advanced options, and assertions of your HTTP tests.

To display your list of variables, type `{{` in your desired field.

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Using Variables in Multistep API tests" video="true" width="90%" >}}

## Test failure

A test is considered `FAILED` if a step does not satisfy one or several assertions or if a step's request prematurely failed. In some cases, the test can indeed fail without being able to test the assertions against the endpoint, these reasons include:

`CONNREFUSED`
: No connection could be made because the target machine actively refused it.

`CONNRESET`
: The connection was abruptly closed by the remote server. Possible causes include the webserver encountering an error or crashing while responding, or loss of connectivity of the webserver.

`DNS`
: DNS entry not found for the test URL. Possible causes include a misconfigured test URL or a wrong configuration in your DNS entries.

`INVALID_REQUEST` 
: The configuration of the test is invalid (for example, a typo in the URL).

`SSL`
: The SSL connection couldn't be performed. [See the dedicated error page for more information][15].

`TIMEOUT`
: The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indicates that the request duration hit the test defined timeout (default is set to 60s). 
  For each request only the completed stages for the request are displayed in the network waterfall. For example, in the case of `Total response time` only being displayed, the timeout occurred during the DNS resolution.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indicates that the request and assertions duration hit the maximum duration (60.5s).

`MALFORMED_RESPONSE` 
: The remote server responded with a payload that does not comply with HTTP specifications.

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][16] can create, edit, and delete Synthetic multistep API tests. To get create, edit, and delete access to Synthetic multistep API tests, upgrade your user to one of those two [default roles][16].

If you are using the [custom role feature][17], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions for Synthetic Monitoring.

### Restrict access

Access restriction is available for customers using [custom roles][18] on their accounts.

You can restrict access to a multistep API test based on the roles in your organization. When creating a multistep API test, choose which roles (in addition to your user) can read and write your test. 

{{< img src="synthetics/settings/restrict_access.png" alt="Set permissions for your test" style="width:70%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests
[2]: /synthetics/api_tests/
[3]: /synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[4]: /synthetics/cicd_integrations
[5]: /synthetics/private_locations
[6]: /synthetics/search/#search
[7]: https://restfulapi.net/json-jsonpath/
[8]: https://www.w3schools.com/xml/xpath_syntax.asp
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[10]: /monitors/notify/?tab=is_alert#notification
[11]: http://daringfireball.net/projects/markdown/syntax
[12]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[13]: /synthetics/guide/synthetic-test-monitors
[14]: /synthetics/settings/#global-variables
[15]: /synthetics/api_tests/errors/#ssl-errors
[16]: /account_management/rbac/
[17]: /account_management/rbac#custom-roles
[18]: /account_management/rbac/#create-a-custom-role
