---
title: Browser Testing
kind: documentation
description: Simulate and monitor user journeys from specific locations.
aliases:
  - /synthetics/browser_check
  - /synthetics/browser_test
further_reading:
- link: "https://www.datadoghq.com/blog/browser-tests/"
  tag: "Blog"
  text: "User experience monitoring with browser tests"
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "https://learn.datadoghq.com/courses/intro-to-synthetic-tests"
  tag: "Learning Center"
  text: "Introduction to Synthetic Tests"
- link: "/getting_started/synthetics/browser_test"
  tag: "Documentation"
  text: "Getting started with browser tests"
- link: "/synthetics/guide/synthetic-test-monitors"
  tag: "Documentation"
  text: "Learn about Synthetic test monitors"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test"
  tag: "External Site"
  text: "Create and manage Synthetic Browser Tests with Terraform"
---

## Overview

Browser tests are scenarios executed by Datadog on your web applications. They run at configurable periodic intervals from multiple locations around the world, from multiple browsers, and devices. These tests verify both that your applications are up and responding to requests, and that any conditions defined in your scenarios are met.

<div class="alert alert-info">If you are interested in testing applications that sit behind MFA, read <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">the dedicated guide </a> and <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">send feedback</a> to the Synthetic Monitoring team to help improve the systems that matter most to your teams.</div>

## Test configuration

Define the configuration of your browser test.

1. Enter a **Starting URL**: The URL from which your browser test starts the scenario.
2. Add **Advanced Options** (optional): Set specific options for your browser test.

   {{< tabs >}}

   {{% tab "Request Options" %}}

   Select **Disable CORS** to prevent the cross-origin resource sharing (CORS) policy from blocking your test. To prevent the Content Security Policy (CSP) from blocking your test, select **Disable CSP**.

   * **Request Headers**: Define headers in the **Name** and **Value** fields to add to or override the default browser headers. For example, you can set the User Agent in the header to [identify Datadog scripts][1].
   * **Cookies**: Define cookies to add to the default browser cookies. Enter one cookie per line, using the syntax of [`Set-Cookie`][2].
   * **HTTP Authentication**: Authenticate through HTTP Basic, Digest, or NTLM with a username and a password. Your credentials are used in every step of your browser test.

   Request options are set at every test execution and apply to every step of your browser test at execution time, not recording time. If you need these options to remain active to record the following steps, manually apply the options on the page you are recording from and create subsequent steps in your test.


[1]: /synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   {{% /tab %}}

   {{% tab "Certificate" %}}

   Select **Ignore server certificate error** to instruct the test to skip errors in the server certificate.

   * **Client Certificate**: Perform tests on systems that require client certificates by clicking **Upload File** and uploading your certificate file and private key. Only PEM certificates are accepted.
   * **Client Certificate Domains**: Once the certificate files are uploaded, the client certificate applies to the starting URL's domain. To apply the client certificate on another domain, specify the domain in the **Value** field.

   You can include wildcards in the URL.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   Enter a URL for a proxy you want to send requests through in the **Proxy URL** field as `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`.

   You can include [global variables](#use-global-variables) in the URL.

   {{% /tab %}}

   {{% tab "Privacy" %}}

   Select **Do not capture any screenshots for this test** to prevent screenshots from being taken in your test steps.

   This privacy option is available as an [advanced option][1] at the individual test step level and ensures that no sensitive data appears in your test results. Preventing the test from taking screenshots makes troubleshooting failures more difficult. For more information, see [Data Security][2].

[1]: /synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /data_security/synthetics
   {{% /tab %}}

   {{% tab "Starting URL" %}}

   Enter an amount of time in seconds for the test to wait before declaring the initial test step as failed.

   {{% /tab %}}

   {{< /tabs >}}

3. Add a **name**: The name of your browser test.
4. Select **environment and additional tags**: Set the `env` and related tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>`.
5. Select **browsers and devices**: The browsers (such as `Chrome`, `Firefox`, and `Edge`), and devices (such as `Laptop Large`, `Tablet`, and `Mobile Small`) to run your test on.
   - For a large laptop device, the dimensions are 1440 pixels x 1100 pixels.
   - For a tablet device, the dimensions are 768 pixels x 1020 pixels.
   - For a small mobile device, the dimensions are 320 pixels x 550 pixels.
6. Select **managed and private locations**: Select locations around the world that are managed by Datadog or create [private locations][1] to run your browser test from custom locations or inside private networks.

   {{% managed-locations %}}

   You can also use the [Continuous Testing Tunnel][15] to trigger tests on your local development setup or in your CI/CD pipeline to test internal environments.

7. Set the **test frequency**: The intervals vary from every five minutes to once per week. To request one-minute frequency, [contact Support][2].

{{% synthetics-variables %}}

### Use global variables

You can use the [global variables defined in **Settings**][3] in the **Starting URL** and **Advanced Options** of your browser test details, as well as in your test recording.

To display a list of available variables:

- In your browser test's details: Type `{{` in the desired field.

  {{< img src="synthetics/browser_tests/recording_global_variable_1.mp4" alt="Defining a local variable from global variables" video="true" width="90%" >}}

- In your browser test's recorder: Import the variable in your test, then type `{{` in the desired field or inject the variable in your application to use it.

  {{< img src="synthetics/browser_tests/recording_inject_variable_1.mp4" alt="Injecting a local variable into a field during a browser recording" video="true" width="90%" >}}

For more information about using variables in your browser test recording, see [Browser Test Steps][4].

### Define alert conditions

You can customize alert conditions to define the circumstances under which you want a test to send a notification alert.

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="Browser test alerting rule" style="width:80%" >}}

* An alert is triggered if any assertion fails for `X` minutes from any `n` of `N` locations. This alerting rule allows you to specify for how much time and in how many locations a test needs to fail before triggering the notification.
* Retry `X` times before location is marked as failed. This allows you to define how many consecutive test failures need to happen for a location to be considered as failed. By default, there is a 300ms wait before retrying a test that failed. This interval can be configured with the [API][5].

### Configure the test monitor

A notification is sent according to the set of alerting conditions. Use this section to define how and what to message your teams.

1. Enter a **message** for the browser test. This field allows standard [Markdown formatting][6] and supports the following [conditional variables][17]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the monitor alerts.                                       |
    | `{{^is_alert}}`            | Show unless the monitor alerts.                                     |
    | `{{#is_recovery}}`         | Show when the monitor recovers from `alert`.                          |
    | `{{^is_recovery}}`         | Show unless the monitor recovers from `alert`.                        |
    | `{{#is_renotify}}`         | Show when the monitor renotifies.                                   |
    | `{{^is_renotify}}`         | Show unless the monitor renotifies.                                 |
    | `{{#is_priority}}`         | Show when the monitor matches priority (P1 to P5).                  |
    | `{{^is_priority}}`         | Show unless the monitor matches priority (P1 to P5).                |

    Notification messages include the **message** defined in this section and information about the failing locations.

2. Choose team members and services to notify.
3. Specify a renotification frequency. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.
4. Click **Save Details and Record Test** to save your test configuration and record your browser steps.

For more information, see [Using Synthetic Test Monitors][7].

## Record your steps

Tests can be only recorded from [Google Chrome][8]. To record your test, download the [Datadog Record Test extension for Google Chrome][9].

You can switch tabs in a browser test recording in order to perform an action on your application (such as clicking on a link that opens another tab) and add another test step. Your browser test must interact with the page first (through a click) before it can perform an [assertion][10]. By recording all of the test steps, the browser test can switch tabs automatically at test execution.

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Browser test record test" width="90%" >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window. This is useful if your application does not support being opened in an iframe or if you want to avoid sizing issues at recording. You can also open the pop-up in **Incognito mode** to start recording your test from a fresh browser free from already logged-in sessions, cookies from your existing browser, and more.
2. Optionally, enable Datadog to automatically collect RUM data when running step recordings from your browser test. For more information, see [Explore RUM & Session Replay][11].
3. Click **Start Recording** to begin recording your browser test.
4. As you click on your application going through the user journey you want to monitor, your actions are automatically recorded and used to create [steps][12] within your browser test scenario on the left.
5. In addition to the automatically recorded steps, you can also use the [steps][12] available in the upper left corner to enrich your scenario:
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="Browser Test steps" style="width:80%;">}}

   Datadog recommends ending your browser test with an **[assertion][10]** to confirm the journey executed by the browser test resulted in the expected state.
6. Once you have finished your scenario, click **Save and Launch Test**.

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][13] can create, edit, and delete Synthetic browser tests. To get create, edit, and delete access to Synthetic browser tests, upgrade your user to one of those two [default roles][13].

If you are using the [custom role feature][13], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

Access restriction is available for customers using [custom roles][14] on their accounts.

You can restrict access to a browser test based on the roles in your organization. When creating a browser test, choose which roles (in addition to your user) can read and write your test.

{{< img src="synthetics/settings/restrict_access_1.png" alt="Set permissions for your test" style="width:70%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations/
[2]: /help/
[3]: /synthetics/settings/#global-variables
[4]: /synthetics/browser_tests/actions#variables
[5]: /api/latest/synthetics/#create-or-clone-a-test
[6]: http://daringfireball.net/projects/markdown/syntax
[7]: /synthetics/guide/synthetic-test-monitors
[8]: https://www.google.com/chrome
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /synthetics/browser_tests/actions/#assertion
[11]: /synthetics/guide/explore-rum-through-synthetics/
[12]: /synthetics/browser_tests/actions/
[13]: /account_management/rbac#custom-roles
[14]: /account_management/rbac/#create-a-custom-role
[15]: /continuous_testing/environments/proxy_firewall_vpn
[16]: /synthetics/guide/browser-tests-passkeys
[17]: /monitors/notify/variables/?tab=is_alert#conditional-variables
