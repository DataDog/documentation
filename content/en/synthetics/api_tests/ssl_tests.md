---
title: SSL Tests
kind: documentation
description: Monitor your SSL certificates from locations around the world
aliases:
  - /synthetics/ssl_test
  - /synthetics/ssl_check
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "/getting_started/synthetics/api_test"
  tag: "Documentation"
  text: "Get started with API tests"
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Run SSL tests on internal hosts"
---

## Overview

SSL tests allow you to proactively monitor the validity and expiration of your SSL/TLS certificates to ensure secure connections between your key services and users. If your certificate is about to expire or becomes compromised, Datadog sends you an alert with details on the failure, allowing you to quickly pinpoint the root cause of the issue and fix it.

SSL tests can run from both [managed][1] and [private locations][2] depending on your preference for running the test from outside or inside your network. SSL tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][3].

## Configuration

After choosing to create a `SSL` test, define your test's request.

### Define request

1. Specify the **Host** and the **Port** to run your test on. By default, the port is set to `443`.
2. Add **Advanced Options** (optional) to your test:
    * **Accept self-signed certificates**: Bypasses any server error related to a self-signed certificate.
    * **Fail on revoked certificate in stapled OCSP**: Fail the test if the certificate is labeled as revoked by the OCSP stapling.
    * **Timeout**: Specify the amount of time in seconds before the test times out.
    * **Server Name**: Specifies on which server you want to initiate the TLS handshake, allowing the server to present one of multiple possible certificates on the same IP address and TCP port number. By default, the parameter is filled by the **Host** value.
    * **Client certificate**: Authenticates through mTLS by uploading your client certificate (`.crt`) and the associated private key (`.key`) in `PEM` format. **Note**: You can use the `openssl` library to convert your certificates. For example, convert a `PKCS12` certificate to `PEM` formatted private keys and certificates.

  ```
  openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
  openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
  ```

3. **Name** your SSL test.

4. Add `env` **Tags** as well as any other tag to your SSL test. You can then use these tags to quickly filter through your Synthetic tests on the [Synthetic Monitoring homepage][4].

{{< img src="synthetics/api_tests/ssl_test_config.png" alt="Define SSL request" style="width:90%;" >}}

Click **Test URL** to try out the request configuration. A response preview is displayed on the right side of your screen.

### Define assertions

Assertions define what an expected test result is. After you click **Test URL**, basic assertions on certificate validity, expiration data, TLS version, and `response time` are added based on the response that was obtained. You must define at least one assertion for your test to monitor.

| Type                  | Operator                                                                               | Value type                 |
|-----------------------|----------------------------------------------------------------------------------------|----------------------------|
| certificate           | `expires in more than`, `expires in less than`                                         | _Integer (number of days)_ |
| property              | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`       | _String_ <br> _[Regex][5]_ |
| response time         | `is less than`                                                                         | _Integer (ms)_             |
| maximum TLS version   | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _Decimal_                  |
| minimum TLS version   | `is more than`, `is more than or equal`                                                | _Decimal_                  |

You can create up to 20 assertions per API test by clicking **New Assertion** or by clicking directly on the response preview:

{{< img src="synthetics/api_tests/assertions.png" alt="Define assertions for your SSL test" style="width:90%;" >}}

### Select locations

Select the **Locations** to run your SSL test from. SSL tests can run from both [managed][1] and [private locations][2] depending on whether you want to monitor certificates from outside or inside your network.

### Specify test frequency

SSL tests can run:

* **On a schedule** to ensure your SSL/TLS certificates are always valid and that a secure connection is ensured to the users of your key services. Select the frequency at which you want Datadog to run your SSL test.
* [**Within your CI/CD pipelines**][3].
* **On-demand** to run your tests whenever makes the most sense for your team.

### Define alert conditions

Set alert conditions to determine the circumstances under which you want a test to fail and trigger an alert.

#### Alerting rule

When you set the alert conditions to: `An alert is triggered if your test fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes.
* At one moment during the last *X* minutes, at least *n* locations were in failure.

#### Fast retry

Your test can trigger retries `X` times after `Y` ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

### Notify your team

A notification is sent by your test based on the [alerting conditions](#define-alert-conditions) previously defined. Use this section to define how and what message to send to your teams.

1. [Similar to how you configure monitors][6], select **users and/or services** that should receive notifications either by adding a `@notification`to the message or by searching for team members and connected integrations with the drop-down box.

2. Enter the notification **message** for your test. This field allows standard [Markdown formatting][7] and supports the following [conditional variables][8]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the test alerts.                                          |
    | `{{^is_alert}}`            | Show unless the test alerts.                                        |
    | `{{#is_recovery}}`         | Show when the test recovers from alert.                             |
    | `{{^is_recovery}}`         | Show unless the test recovers from alert.                           |

3. Specify how often you want your test to **re-send the notification message** in case of test failure. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.

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
: Generates a date in one of our accepted formats with a value of the date the test is initiated + `n` days.

`{{ timestamp(n, unit) }}` 
: Generates a timestamp in one of our accepted units with a value of the timestamp the test is initiated at +/- `n` chosen unit.

### Use variables

You can use the [global variables defined in the `Settings`][9] and the [locally defined variables](#create-local-variables) in the URL, Advanced Options, and assertions of your SSL tests.

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

`SSL`
: The SSL connection couldn't be performed. [See the dedicated error page for more information][10].

`TIMEOUT`
: The request couldn't be completed in a reasonable time. Two types of `TIMEOUT` can happen:
  - `TIMEOUT: The request couldn’t be completed in a reasonable time.` indicates that the request duration hit the test defined timeout (default is set to 60s). 
  For each request only the completed stages for the request are displayed in the network waterfall. For example, in the case of `Total response time` only being displayed, the timeout occurred during the DNS resolution.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indicates that the test duration (request + assertions) hits the maximum duration (60.5s).

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][11] can create, edit, and delete Synthetic SSL tests. To get create, edit, and delete access to Synthetic SSL tests, upgrade your user to one of those two [default roles][11].

If you are using the [custom role feature][12], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

Access restriction is available for customers using [custom roles][13] on their accounts.

You can restrict access to an SSL test based on the roles in your organization. When creating an SSL test, choose which roles (in addition to your user) can read and write your test. 

{{< img src="synthetics/settings/restrict_access.png" alt="Set permissions for your test" style="width:70%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/synthetics/#get-all-locations-public-and-private
[2]: /synthetics/private_locations
[3]: /synthetics/cicd_integrations
[4]: /synthetics/search/#search
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[6]: /monitors/notify/#notify-your-team
[7]: https://www.markdownguide.org/basic-syntax/
[8]: /monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[9]: /synthetics/settings/#global-variables
[10]: /synthetics/api_tests/errors/#ssl-errors
[11]: /account_management/rbac/
[12]: /account_management/rbac#custom-roles
[13]: /account_management/rbac/#create-a-custom-role
