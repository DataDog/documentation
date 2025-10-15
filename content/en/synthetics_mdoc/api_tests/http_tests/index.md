---
title: HTTP Testing
description: Simulate HTTP requests to monitor public and internal API endpoints.
breadcrumbs: Docs > Synthetic Testing and Monitoring > API Testing > HTTP Testing
sourceUrl: https://docs.datadoghq.com/synthetics/api_tests/http_tests/index.html
---

# HTTP Testing

## Overview{% #overview %}

HTTP tests allow you to send HTTP requests to your applications' API endpoints to verify responses and defined conditions, such as overall response time, expected status code, header, or body content.

HTTP tests can run from both managed and [private locations](https://docs.datadoghq.com/synthetics/private_locations) depending on your preference for running the test from outside or inside your network. HTTP tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines](https://docs.datadoghq.com/synthetics/cicd_integrations).

## Configuration{% #configuration %}

You may create a test using one of the following options:

- **Create a test from a template**:

  1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Request Details, Assertions, Alert Conditions, and Monitor Settings.

  1. Click **+Create Test** to open the **Define Request** page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.

  1. Click **Save Details** to submit your API test.

     {% video
        url="https://datadog-docs.imgix.net/images/getting_started/synthetics/synthetics_templates_api_video.mp4" /%}

- **Build a test from scratch**:

  1. To build a test from scratch, click the **+ Start from scratch** template, then select the `HTTP` request type and specify the **URL** to query. Available methods are: `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE`, and `OPTIONS`. Both `http` and `https` URLs are supported.
Important alert (level: info): See Advanced options for more options.
  1. **Name** your HTTP test.

  1. Add Environment **Tags** as well as any other tag to your HTTP test. You can then use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page](https://docs.datadoghq.com/synthetics/search/#search).

  1. Click **Send** to try out the request configuration. A response preview is displayed on the right side of your screen.

  {% image
     source="https://datadog-docs.imgix.net/images/getting_started/synthetics/api-test-config-4.7ab513fd164d341c7f31c4749a240ab8.png?auto=format"
     alt="Define HTTP request" /%}
Click **Create Test** to submit your API test.

### Snippets{% #snippets %}

When setting up a new Synthetic Monitoring API test, use snippets to automatically fill in basic auth, performance, and regions, rather than selecting these options manually. The following snippets are available:

- **Basic Auth**: Automatically test your APIs using pre-populated basic auth headers, JavaScript, bearer token, and API/app key auth variables.

- **Performance**: Automatically configure a test with the shortest frequency (one minute), perform a gRPC health check, and test for overall response time latency with a breakdown of network timing.

- **Regions**: Automatically test your API endpoint against a location in each of the three primary geographic regions (AMER, APAC and EMEA).

### Advanced options{% #advanced-options %}

{% tab title="Request Options" %}

- **HTTP version**: Select `HTTP/1.1 only`, `HTTP/2 only`, or `HTTP/2 fallback to HTTP/1.1`.
- **Follow redirects**: Select to have your HTTP test follow up to ten redirects when performing the request.
- **Ignore server certificate error**: Select to have your HTTP test go on with connection even if there are errors when validating the SSL certificate.
- **Timeout**: Specify the amount of time in seconds before the test times out.
- **Request headers**: Define headers to add to your HTTP request. You can also override the default headers (for example, the `user-agent` header).
- **Cookies**: Define cookies to add to your HTTP request. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

{% /tab %}

{% tab title="Authentication" %}

- **Client Certificate**: Authenticate through mTLS by uploading your client certificate (`.crt`) and the associated private key (`.key`) in `PEM` format. You can use the `openssl` library to convert your certificates. For example, convert a `PKCS12` certificate to `PEM` formatted private keys and certificates.

  ```
  openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
  openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
  ```

- **HTTP Basic Auth**: Add HTTP basic authentication credentials.

- **Digest Auth**: Add Digest authentication credentials.

- **NTLM**: Add NTLM authentication credentials. Support both NTLMv2 and NTLMv1.

- **AWS Signature v4**: Enter your Access Key ID and Secret Access Key. Datadog generates the signature for your request. This option uses the basic implementation of SigV4. Specific signatures such as Amazon S3 are not supported out-of-the box. For "Single Chunk" transfer requests to Amazon S3 buckets, add `x-amz-content-sha256` containing the sha256-encoded body of the request as a header (for an empty body: `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).

- **OAuth 2.0**: Choose between granting client credentials or a resource owner password and enter an access token URL. Depending on your selection, enter a client ID and secret, or a username and password. From the dropdown menu, select an option to either send the API token as a basic authentication header, or send the client credentials in the body. Optionally, you can provide additional information such as the audience, resource, and scope (as well as the client ID and secret, if you selected **Resource Owner Password**).

{% /tab %}

{% tab title="Query Parameters" %}

- **Encode parameters**: Add the name and value of query parameters that require encoding.

{% /tab %}

{% tab title="Request Body" %}

- **Body type**: Select the type of the request body (`application/json`, `application/octet-stream`, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/html`, `text/plain`, `text/xml`, `GraphQL`, or `None`) you want to add to your HTTP request.
- **Request body**: Add the content of your HTTP request body.
  - The request body is limited to a maximum size of 50 kilobytes for `application/json`, `application/x-www-form-urlencoded`, `text/html`, `text/plain`, `text/xml`, `GraphQL`.
  - The request body is limited to one file of 3 megabytes for `application/octet-stream`.
  - The request body is limited to three files of 3 megabytes each for `multipart/form-data`.

{% /tab %}

{% tab title="Proxy" %}

- **Proxy URL**: Specify the URL of the proxy the HTTP request should go through (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
- **Proxy header**: Add headers to include in the HTTP request to the proxy.

{% /tab %}

{% tab title="Privacy" %}

- **Do not save response body**: Select this option to prevent response body from being saved at runtime. This can be helpful to ensure no sensitive data gets featured in your test results. Use mindfully as it can make failures troubleshooting more difficult. For more security recommendations, see [Synthetic Monitoring Security](https://docs.datadoghq.com/data_security/synthetics).

{% /tab %}

{% tab title="Javascript" %}
Define variables for your HTTP API tests with JavaScript:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/api_tests/http_javascript.66fe410698cb2c156ee0634db040393e.png?auto=format"
   alt="Define HTTP API test with Javascript" /%}

{% alert level="info" %}
JavaScript capabilities are not supported for API tests in Windows private locations.
{% /alert %}

{% /tab %}

### Define assertions{% #define-assertions %}

Assertions define what an expected test result is. After you click **Test URL**, basic assertions on `response time`, `status code`, and `header` `content-type` are added based on the response that was obtained. You must define at least one assertion for your test to monitor.

| Type          | Operator                                                                                                                                                                                  | Value type                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| body          | `contains`, `does not contain`, `is`, `is not`,`matches`, `does not match`,[`jsonpath`](https://restfulapi.net/json-jsonpath/), [`xpath`](https://www.w3schools.com/xml/xpath_syntax.asp) | *String**[Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)*  |
| header        | `contains`, `does not contain`, `is`, `is not`,`matches`, `does not match`                                                                                                                | *String**[Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)*  |
| response time | `is less than`                                                                                                                                                                            | *Integer (ms)*                                                                                        |
| status code   | `is`, `is not`,`matches`, `does not match`                                                                                                                                                | *Integer**[Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)* |

HTTP tests can decompress bodies with the following `content-encoding` headers: `br`, `deflate`, `gzip`, and `identity`.

You can create up to 20 assertions per API test by clicking **New Assertion** or by clicking directly on the response preview:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/api_tests/assertions_http.b039f400ba909bd0095e32fd009f63a0.png?auto=format"
   alt="Define assertions for your HTTP test to succeed or fail on" /%}

To perform `OR` logic in an assertion, use the `matches regex` comparator to define a regex with multiple expected values like `(200|302)`. For example, you may want your HTTP test to succeed when a server must respond with a `200` or `302` status code. The `status code` assertion succeeds if the status code is 200 or 302. You can also add `OR` logic on a `body` or `header` assertion.

If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

### Select locations{% #select-locations %}

Select the **Locations** to run your HTTP test from. HTTP tests can run from both managed and [private locations](https://docs.datadoghq.com/synthetics/private_locations) depending on your preference for running the test from outside or inside your network.

Datadog's out-of-the-box managed locations allow you to test public-facing websites and endpoints from regions where your customers are located.

**AWS**:

| Americas            | Asia Pacific | EMEA      |
| ------------------- | ------------ | --------- |
| Canada Central      | Hong Kong    | Bahrain   |
| Northern California | Jakarta      | Cape Town |
| Northern Virginia   | Mumbai       | Frankfurt |
| Ohio                | Osaka        | Ireland   |
| Oregon              | Seoul        | London    |
| São Paulo           | Singapore    | Milan     |
| Sydney              | Paris        |
| Tokyo               | Stockholm    |

**GCP**:

| Americas    | Asia Pacific | EMEA      |
| ----------- | ------------ | --------- |
| Dallas      | Tokyo        | Frankfurt |
| Los Angeles |
| Oregon      |
| Virginia    |

**Azure**:

| Region   | Location |
| -------- | -------- |
| Americas | Virginia |

The Datadog for Government site (US1-FED) uses the following managed location:

| Region   | Location |
| -------- | -------- |
| Americas | US-West  |

### Specify test frequency{% #specify-test-frequency %}

HTTP tests can run:

- **On a schedule** to ensure your most important endpoints are always accessible to your users. Select the frequency at which you want Datadog to run your HTTP test.
- [**Within your CI/CD pipelines**](https://docs.datadoghq.com/synthetics/cicd_integrations) to start shipping without fearing faulty code might impact your customers' experience.
- **On-demand** to run your tests whenever makes the most sense for your team.

### Define alert conditions{% #define-alert-conditions %}

Set alert conditions to determine the circumstances under which you want a test to fail and trigger an alert.

#### Alerting rule{% #alerting-rule %}

When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

- At least one location was in failure (at least one assertion failed) during the last *X* minutes;
- At one moment during the last *X* minutes, at least *n* locations were in failure.

#### Fast retry{% #fast-retry %}

Your test can trigger retries `X` times after `Y` ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

### Configure the test monitor{% #configure-the-test-monitor %}

A notification is sent by your test based on the alerting conditions previously defined. Use this section to define how and what to message your team.

1. [Similar to how you configure monitors](https://docs.datadoghq.com/monitors/notify/?tab=is_alert#configure-notifications-and-automations), select **users and/or services** that should receive notifications either by adding an `@notification` to the message or by searching for team members and connected integrations with the dropdown menu.

1. Enter the notification **message** for your test or use pre-filled monitor messages. This field allows standard [Markdown formatting](http://daringfireball.net/projects/markdown/syntax) and supports the following [conditional variables](https://docs.datadoghq.com/monitors/notify/variables/?tab=is_alert#conditional-variables):

| Conditional Variable | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `{{#is_alert}}`      | Show when the test alerts.                           |
| `{{^is_alert}}`      | Show unless the test alerts.                         |
| `{{#is_recovery}}`   | Show when the test recovers from alert.              |
| `{{^is_recovery}}`   | Show unless the test recovers from alert.            |
| `{{#is_renotify}}`   | Show when the monitor renotifies.                    |
| `{{^is_renotify}}`   | Show unless the monitor renotifies.                  |
| `{{#is_priority}}`   | Show when the monitor matches priority (P1 to P5).   |
| `{{^is_priority}}`   | Show unless the monitor matches priority (P1 to P5). |

Notification messages include the **message** defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

Specify how often you want your test to **re-send the notification message** in case of test failure. To prevent renotification on failing tests, check the option `Stop re-notifying on X occurrences`.

Click **Save & Start Recording** to save your test configuration and monitor.

For more information, see [Synthetic Monitoring notifications](https://docs.datadoghq.com/synthetics/notifications/).

## One-click{% #one-click %}

API test creation suggests endpoints from the [Software Catalog](https://docs.datadoghq.com/api_catalog) and existing API tests to prefill your test form with relevant options. Use existing Datadog data sources such as APM traces, Software Catalog endpoints discovery, and existing similar Synthetic tests created by users.

Start typing in the API test **URL** input to get endpoint suggestions or similar tests in Synthetic Monitoring:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/api_tests/api-one-click.e20725502763be87399e79063e64ea27.png?auto=format"
   alt="HTTP API Test showing a GET search for an existing API test" /%}

Then, select a suggestion to prefill your test configuration (request options and headers, authentication, and variables):

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/api_tests/api-test-monitor-search.6af780ef032c9753dea91464e081b684.png?auto=format"
   alt="Select" /%}

### Create local variables{% #create-local-variables %}

To create a local variable, click **+ All steps > Variables**. You can select one of the following available builtins to add to your variable string:

{% dl %}

{% dt %}
{{ numeric(n) }}
{% /dt %}

{% dd %}
Generates a numeric string with `n` digits.
{% /dd %}

{% dt %}
{{ alphabetic(n) }}
{% /dt %}

{% dd %}
Generates an alphabetic string with `n` letters.
{% /dd %}

{% dt %}
{{ alphanumeric(n) }}
{% /dt %}

{% dd %}
Generates an alphanumeric string with `n` characters.
{% /dd %}

{% dt %}
{{ date(n unit, format) }}
{% /dt %}

{% dd %}
Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at + or - `n` units.
{% /dd %}

{% dt %}
{{ timestamp(n, unit) }}
{% /dt %}

{% dd %}
Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at +/- `n` units.
{% /dd %}

{% dt %}
{{ uuid }}
{% /dt %}

{% dd %}
Generates a version 4 universally unique identifier (UUID).
{% /dd %}

{% dt %}
{{ public-id }}
{% /dt %}

{% dd %}
Injects the Public ID of your test.
{% /dd %}

{% dt %}
{{ result-id }}
{% /dt %}

{% dd %}
Injects the Result ID of your test run.
{% /dd %}

{% /dl %}

To obfuscate local variable values in test results, select **Hide and obfuscate variable value**. Once you have defined the variable string, click **Add Variable**.

### Use variables{% #use-variables %}

You can use the [global variables defined on the **Settings** page](https://docs.datadoghq.com/synthetics/settings/#global-variables) in the URL, advanced options, and assertions of your HTTP tests.

To display your list of variables, type `{{` in your desired field:

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/api_tests/http_use_variable.mp4" /%}

## Test failure{% #test-failure %}

A test is considered `FAILED` if it does not satisfy one or more assertions or if the request prematurely failed. In some cases, the test can fail without testing the assertions against the endpoint.

The most common errors include the following:

{% dl %}

{% dt %}
`AUTHENTICATION_ERROR`
{% /dt %}

{% dd %}
Synthetic Monitoring automatically disables test retries when authentication failures occur. This safety measure remains in effect until you update the test with valid credentials. This prevents unnecessary test executions that would generate false alerts and increase billable usage.
{% /dd %}

{% dt %}
`CONNREFUSED`
{% /dt %}

{% dd %}
No connection could be made because the target machine actively refused it.
{% /dd %}

{% dt %}
`CONNRESET`
{% /dt %}

{% dd %}
The connection was abruptly closed by the remote server. Possible causes include the web server encountering an error or crashing while responding, or loss of connectivity of the web server.
{% /dd %}

{% dt %}
`DNS`
{% /dt %}

{% dd %}
DNS entry not found for the test URL. Possible causes include misconfigured test URL or the wrong configuration of your DNS entries.
{% /dd %}

{% dt %}
`Error performing HTTP/2 request`
{% /dt %}

{% dd %}
The request could not be performed. See the dedicated [error](https://docs.datadoghq.com/synthetics/api_tests/errors/#http-errors) page for more information.
{% /dd %}

{% dt %}
`INVALID_REQUEST`
{% /dt %}

{% dd %}
The configuration of the test is invalid (for example, a typo in the URL).
{% /dd %}

{% dt %}
`SSL`
{% /dt %}

{% dd %}
The SSL connection couldn't be performed. [See the dedicated error page for more information](https://docs.datadoghq.com/synthetics/api_tests/errors/#ssl-errors).
{% /dd %}

{% dt %}
`TIMEOUT`
{% /dt %}

{% dd %}
The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen:
- `TIMEOUT: The request couldn't be completed in a reasonable time.` indicates that the request duration hit the test defined timeout (default is set to 60s). For each request only the completed stages for the request are displayed in the network waterfall. For example, in the case of `Total response time` only being displayed, the timeout occurred during the DNS resolution.
- `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indicates that the test duration (request + assertions) hits the maximum duration (60.5s).

{% /dd %}

{% dt %}
`MALFORMED_RESPONSE`
{% /dt %}

{% dd %}
The remote server responded with a payload that does not comply with HTTP specifications. This error can happen when remote servers differ in their HTTP support. To prevent issues, run tests with a consistent HTTP version: either HTTP/2 (if available) or HTTP/1.1.
{% /dd %}

{% /dl %}

## Permissions{% #permissions %}

By default, only users with the [Datadog Admin and Datadog Standard roles](https://docs.datadoghq.com/account_management/rbac/) can create, edit, and delete Synthetic HTTP tests. To get create, edit, and delete access to Synthetic HTTP tests, upgrade your user to one of those two [default roles](https://docs.datadoghq.com/account_management/rbac/).

If you are using the [custom role feature](https://docs.datadoghq.com/account_management/rbac#custom-roles), add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access{% #restrict-access %}

Use [granular access control](https://docs.datadoghq.com/account_management/rbac/granular_access) to limit who has access to your test based on roles, teams, or individual users:

1. Open the permissions section of the form.
1. Click **Edit Access**.
Click **Restrict Access**.Select teams, roles, or users.Click **Add**.Select the level of access you want to associate with each of them.Click **Done**.
{% alert level="info" %}
**Note**: You can view results from a Private Location even without Viewer access to that Private Location.
{% /alert %}

| Access level | View test configuration | Edit test configuration | View test results | Run test |
| ------------ | ----------------------- | ----------------------- | ----------------- | -------- |
| No access    |
| Viewer       | Yes                     | Yes                     |
| Editor       | Yes                     | Yes                     | Yes               | Yes      |

## Further Reading{% #further-reading %}

- [Introducing Datadog Synthetic Monitoring](https://www.datadoghq.com/blog/introducing-synthetic-monitoring/)
- [Introduction to Synthetic Tests](https://learn.datadoghq.com/courses/intro-to-synthetic-tests)
- [Get started with HTTP tests](https://docs.datadoghq.com/getting_started/synthetics/api_test)
- [Run HTTP tests on internal endpoints](https://docs.datadoghq.com/synthetics/private_locations)
- [Run multistep HTTP tests](https://docs.datadoghq.com/synthetics/multistep)
- [Learn about Synthetic test monitors](https://docs.datadoghq.com/synthetics/guide/synthetic-test-monitors)
