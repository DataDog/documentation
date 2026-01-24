---
title: SSL Testing
description: Monitor your SSL certificates from locations around the world
breadcrumbs: Docs > Synthetic Testing and Monitoring > API Testing > SSL Testing
sourceUrl: https://docs.datadoghq.com/synthetics/api_tests/ssl_tests/index.html
---

# SSL Testing

## Overview{% #overview %}

SSL tests allow you to proactively monitor the validity and expiration of your SSL/TLS certificates to ensure secure connections between your key services and users. If your certificate is about to expire or becomes compromised, Datadog sends you an alert with details on the failure, allowing you to pinpoint the root cause of the issue and fix it.

SSL tests can run from both managed and [private locations](https://docs.datadoghq.com/synthetics/private_locations) depending on your preference for running the test from outside or inside your network. SSL tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines](https://docs.datadoghq.com/synthetics/cicd_integrations).

## Configuration{% #configuration %}

You may create a test using one of the following options:

- **Create a test from a template**:

  1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Request Details, Assertions, Alert Conditions, and Monitor Settings.
  1. Click **+Create Test** to open the **Define Request** page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
  1. Click **Save Details** to submit your API test.
     {% video
        url="https://datadog-docs.imgix.net/images/getting_started/synthetics/synthetics_templates_api_video.mp4" /%}

- **Build a test from scratch**:

  1. To build a test from scratch, click the **+ Start from scratch** template, then select the SSL request type.

  1. Specify the **Host** and the **Port** to run your test on. The default SSL port is `443`.

  1. Add **Advanced Options** (optional) to your test:

     - **Accept self-signed certificates**: Bypasses any server error related to a self-signed certificate.
     - **Fail on revoked certificate in stapled OCSP**: Fail the test if the certificate is labeled as revoked by the OCSP stapling.
     - **Fail on incomplete certificate chain**: Disables AIA fetching, causing the test to fail if any intermediate certificates are missing from the server's certificate chain.
     - **Timeout**: Specify the amount of time in seconds before the test times out.
     - **Server Name**: Specifies on which server you want to initiate the TLS handshake, allowing the server to present one of multiple possible certificates on the same IP address and TCP port number. By default, the parameter is filled by the **Host** value.
     - **Client certificate**: Authenticate through mTLS by uploading your client certificate (`.crt`) and the associated private key (`.key`) in `PEM` format.

You can use the `openssl` library to convert your certificates. For example, convert a `PKCS12` certificate to `PEM` formatted private keys and certificates.

     ```
     openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
     openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
     ```

  1. **Name** your SSL test.

  1. Add Environment **Tags** as well as any other tag to your SSL test. You can then use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page](https://docs.datadoghq.com/synthetics/search/#search).

  1. Click **Test Certificate** to try out the request configuration. A response preview is displayed on the right side of your screen.

     {% image
        source="https://datadog-docs.imgix.net/images/synthetics/api_tests/synthetics_ssl_test_cert.555fde74f3546752a10a5a534dbfe80d.png?auto=format"
        alt="Define SSL request" /%}

  1. Click **Create Test** to submit your API test.

### Snippets{% #snippets %}

When setting up a new Synthetic Monitoring API test, use snippets to automatically fill in basic auth, performance, and regions, rather than selecting these options manually. The following snippets are available:

- **Basic Auth**: Automatically test your APIs using pre-populated basic auth headers, JavaScript, bearer token, and API/app key auth variables.

- **Performance**: Automatically configure a test with the shortest frequency (one minute), perform a gRPC health check, and test for overall response time latency with a breakdown of network timing.

- **Regions**: Automatically test your API endpoint against a location in each of the three primary geographic regions (AMER, APAC and EMEA).

### Define assertions{% #define-assertions %}

Assertions define what an expected test result is. After you click **Test URL**, basic assertions on certificate validity, expiration data, TLS version, and `response time` are added based on the response that was obtained. You must define at least one assertion for your test to monitor.

| Type                | Operator                                                                               | Value type                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| certificate         | `expires in more than`, `expires in less than`                                         | *Integer (number of days)*                                                                           |
| property            | `contains`, `does not contain`, `is`, `is not`,`matches`, `does not match`             | *String**[Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)* |
| response time       | `is less than`                                                                         | *Integer (ms)*                                                                                       |
| maximum TLS version | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | *Decimal*                                                                                            |
| minimum TLS version | `is more than`, `is more than or equal`                                                | *Decimal*                                                                                            |

You can create up to 20 assertions per API test by clicking **New Assertion** or by clicking directly on the response preview:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/api_tests/assertions_ssl.200be702657ee05b194cf98e491a4b03.png?auto=format"
   alt="Define assertions for your SSL test to succeed or fail on" /%}

To perform `OR` logic in an assertion, use the `matches regex` or `does not match regex` comparators to define a regex with multiple expected values for the same assertion type like `(0|100)`. The test result is successful if the property assertion's value is 0 or 100.

If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

### Select locations{% #select-locations %}

Select the **Locations** to run your SSL test from. SSL tests can run from both managed and [private locations](https://docs.datadoghq.com/synthetics/private_locations) depending on your preference for monitoring certificates from outside or inside your network.

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

SSL tests can run:

- **On a schedule** to ensure your SSL/TLS certificates are always valid and that a secure connection is ensured to the users of your key services. Select the frequency at which you want Datadog to run your SSL test.
- [**Within your CI/CD pipelines**](https://docs.datadoghq.com/synthetics/cicd_integrations).
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

You can use the [global variables defined on the **Settings** page](https://docs.datadoghq.com/synthetics/settings/#global-variables) in the URL, advanced options, and assertions of your SSL tests.

To display your list of variables, type `{{` in your desired field.

## Test failure{% #test-failure %}

A test is considered `FAILED` if it does not satisfy one or more assertions or if the request prematurely failed. In some cases, the test can fail without testing the assertions against the endpoint.

These reasons include the following:

{% dl %}

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

{% /dl %}

## Permissions{% #permissions %}

By default, only users with the [Datadog Admin and Datadog Standard roles](https://docs.datadoghq.com/account_management/rbac/) can create, edit, and delete Synthetic SSL tests. To get create, edit, and delete access to Synthetic SSL tests, upgrade your user to one of those two [default roles](https://docs.datadoghq.com/account_management/rbac/).

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
- [Get started with API tests](https://docs.datadoghq.com/getting_started/synthetics/api_test)
- [Run SSL tests on internal hosts](https://docs.datadoghq.com/synthetics/private_locations)
- [Learn about Synthetic test monitors](https://docs.datadoghq.com/synthetics/guide/synthetic-test-monitors)
