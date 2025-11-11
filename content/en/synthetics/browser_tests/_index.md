---
title: Browser Testing
description: Simulate and monitor user journeys from specific locations.
aliases:
  - /synthetics/browser_check
  - /synthetics/browser_test
further_reading:
- link: "/synthetics/guide/version_history/"
  tag: "Guide"
  text: "Version History for Synthetic Monitoring"
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: 'https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing'
  tag: 'Learning Center'
  text: 'Datadog Learning Center: Getting started with Synthetic Browser Testing'
- link: "/getting_started/synthetics/browser_test"
  tag: "Documentation"
  text: "Getting started with Browser Tests"
- link: "/synthetics/guide/synthetic-test-monitors"
  tag: "Documentation"
  text: "Learn about Synthetic test monitors"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test"
  tag: "External Site"
  text: "Create and manage Synthetic Browser Tests with Terraform"
- link: "https://www.datadoghq.com/blog/ambassador-browser-tests/"
  tag: "Blog"
  text: "How I helped my client scale their browser tests with Datadog"
---

## Overview

Browser tests are scenarios executed by Datadog on your web applications. They run at configurable periodic intervals from multiple locations around the world, from multiple browsers, and devices. These tests verify both that your applications are up and responding to requests, and that any conditions defined in your scenarios are met.

<div class="alert alert-info">If you are interested in testing applications that sit behind MFA, read <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">the dedicated guide </a> and <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">send feedback</a> to the Synthetic Monitoring team to help improve the systems that matter most to your teams.</div>

## Test configuration

You may create a test using one of the following options:

### Create a test from a template

  1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Alert Conditions, Steps, and optionally Variables.
  2. Click **+Create Test** to open the configuration page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
  3. Click **Save & Quit** in the upper right hand corner to submit your Browser Test.<br /><br>
       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="Video of Synthetics Browser Test landing page with templates" video="true" >}}

### Build a test from scratch

  1. Click the **+** template to start a new Browser Test from scratch.
  1. Enter a **Starting URL**: The URL from which your browser test starts the scenario.
  1. Add a **name**: The name of your browser test.
  1. Select **environment and additional tags**: Set the `env` and related tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>`.

  <div class="alert alert-info">See <a href=#advanced-options>Advanced options</a> for more options.</div>

  5. Select **browsers and devices**: The browsers (such as `Chrome`, `Firefox`, and `Edge`), and devices (such as `Laptop Large`, `Tablet`, and `Mobile Small`) to run your test on.

      - For a large laptop device, the dimensions are 1440 pixels x 1100 pixels.
      - For a tablet device, the dimensions are 768 pixels x 1020 pixels.
      - For a small mobile device, the dimensions are 320 pixels x 550 pixels.

  6. Select **managed and private locations**: Select from a list of [locations](#locations) around the world that are managed by Datadog, or create [private locations][1] to run your browser test from custom locations or inside private networks.

     **Note**: You can also use the [Continuous Testing Tunnel][2] to trigger tests on your local development setup or in your CI/CD pipeline to test internal environments.

  7. Set the **test frequency**: The intervals vary from every five minutes to once per week. To request one-minute frequency, [contact Support][3].
  8. Click **Save & Edit Recording** to submit your Browser Test.

### Locations

{{% managed-locations %}}

### Snippets

When setting up a new Synthetic Monitoring browser test, use snippets to automatically fill in your devices and regions, rather than selecting these options manually. The following snippets are available:

* **Screen sizes**: Automatically perform your browser tests on a specifically sized screen across browsers:
   * **Large**
   * **Tablet**
   * **Mobile**

* **Multi-region check**: Automatically test your website against a location in each of the three primary geographic regions (AMER, APAC and EMEA).
</br><br>

  {{< img src="synthetics/browser_tests/browser_snippets_2.png" alt="Screenshot of the left hand side of a browser test creation, showing the snippets examples" width="70%" >}}

### Advanced options

{{< tabs >}}

   {{% tab "Request Options" %}}

   Select **Disable CORS** to prevent the cross-origin resource sharing (CORS) policy from blocking your test. To prevent the Content Security Policy (CSP) from blocking your test, select **Disable CSP**.

   * **Request Headers**: Define headers in the **Name** and **Value** fields to add to or override the default browser headers. For example, you can set the User Agent in the header to [identify Datadog scripts][1].
   * **Cookies**: Define cookies to add to the default browser cookies. Enter one cookie per line, using the syntax of [`Set-Cookie`][2].
   * **HTTP Authentication**: Authenticate through HTTP Basic, Digest, or NTLM with a username and a password. Your credentials are used in every step of your browser test. **Note**: Authentication through HTTP Basic can be used for websites that request user credentials through a browser system prompt.

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

   {{% tab "Time & Language" %}}

  By default, timezone is set to UTC, and language is set to English (en). To define a language, use the corresponding 2 or 3 digit [ISO code][1].

[1]: https://www.loc.gov/standards/iso639-2/php/code_list.php

   {{% /tab %}}

   {{% tab "Blocked Requests" %}}

   Enter one or more request patterns to block from loading while the test is run. Enter one request pattern per line using the [match pattern format][1]. Wildcards (for example, `*://*.example.com/*`) are supported.

   Blocked requests are skipped during test execution but do not affect page rendering when [recording steps](/synthetics/browser_tests/actions). View blocked requests in the [Resources tab](/synthetics/browser_tests/test_results#resources) of test runs. Blocked requests have a status of `blocked`.

[1]: https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns

   {{% /tab %}}

   {{< /tabs >}}

{{% synthetics-variables %}}

### Use global variables

You can use the [global variables defined in **Settings**][4] in the **Starting URL** and **Advanced Options** of your browser test details, as well as in your test recording.

To display a list of available variables:

- In your browser test's details: Type `{{` in the desired field.

  {{< img src="synthetics/browser_tests/use_global_variables_1.mp4" alt="Defining a local variable from global variables" video="true" width="90%" >}}

- In your browser test's recorder: Import the variable in your test, then type `{{` in the desired field or inject the variable in your application to use it.

  {{< img src="synthetics/browser_tests/use_global_variables_2.mp4" alt="Injecting a local variable into a field during a browser recording" video="true" width="90%" >}}

For more information about using variables in your browser test recording, see [Browser Test Steps][5].

### Define alert conditions

You can customize alert conditions to define the circumstances under which you want a test to send a notification alert.

{{< img src="synthetics/browser_tests/alerting_rules_2.png" alt="Browser test alerting rule" style="width:80%" >}}

#### Alerting rule

An alert is triggered if any assertion fails for `X` minutes from any `n` of `N` locations. This alerting rule allows you to specify for how much time and in how many locations a test needs to fail before triggering the notification.

An alert is triggered only if these two conditions are true:

- At least one location was in failure (at least one assertion failed) during the last X minutes;
- At one moment during the last X minutes, at least n locations were in failure.

In case of failure, retry `X` times before location is marked as failed. This allows you to define how many consecutive test failures need to happen for a location to be considered as failed. By default, there is a `300ms` wait before retrying a test that failed. This interval can be configured with the [API][6].

#### Fast retry

When a test fails, fast retry allows you to retry the test X times after Y ms before marking it as failed. Customizing the retry interval helps reduce false positives and improves your alerting accuracy.

Since location uptime is computed based on the final test result after retries complete, fast retry intervals directly impact what appears in your total uptime graph. The total uptime is computed based on the configured alert conditions, and notifications are sent based on the total uptime.

### Configure the test monitor

A notification is sent according to the set of alerting conditions. Use this section to define how and what to message your teams.

1. Enter a **message** for the browser test or use pre-filled monitor messages. This field allows standard [Markdown formatting][7] and supports the following [conditional variables][8]:

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

    Notification messages include the **message** defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

     {{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Synthetic Monitoring monitor section, highlighting the pre-filled monitor messages" style="width:100%;" >}}

     For example, to create a monitor that iterates over steps extracting variables for browser tests, add the following to the monitor message:

   ```text
   {{! List extracted variables across all successful steps }}
   # Extracted variables
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **Name**: `{{extractedValue.name}}`
   **Value:** {{#if extractedValue.secure}}*Obfuscated (value hidden)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

2. Choose team members and services to notify.
3. Specify a renotification frequency. To prevent renotification on failing tests, check the option `Stop re-notifying on X occurrences`.
4. Click **Save & Start Recording** to save your test configuration and record your browser steps.

For more information, see [Synthetic Monitoring notifications][9].

## Record your steps

Tests can be only recorded from [Google Chrome][10] and [Microsoft Edge][18]. To record your test, download the [Datadog Record Test extension][11].

You can switch tabs in a browser test recording to perform an action on your application (such as clicking on a link that opens another tab) and add another test step. Your browser test must interact with the page first (through a click) before it can perform an [assertion][12]. By recording all of the test steps, the browser test can switch tabs automatically at test execution.

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Browser test record test" width="90%" >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window. This is useful if your application does not support being opened in an iframe or if you want to avoid sizing issues at recording. You can also open the pop-up in **Incognito mode** to start recording your test from a fresh browser free from already logged-in sessions, cookies from your existing browser, and more.
2. Optionally, enable Datadog to automatically collect RUM data when running step recordings from your browser test. For more information, see [Explore RUM & Session Replay][13].
3. Click **Start Recording** to begin recording your browser test.
4. As you click on your application going through the user journey you want to monitor, your actions are automatically recorded and used to create [steps][14] within your browser test scenario on the left.
5. In addition to the automatically recorded steps, you can also use the [steps][14] available in the upper left corner to enrich your scenario:
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="Browser Test steps" style="width:80%;">}}

   Datadog recommends ending your browser test with an **[assertion][12]** to confirm the journey executed by the browser test resulted in the expected state.
6. Once you have finished your scenario, click **Save and Launch Test**.

## Step replay

Step replay allows you to re-run one or more steps of your browser test directly in your browser with the [Datadog Record Test extension][11]. This feature helps you establish the correct state when adding or editing steps in the middle of a test, so you don't need to do it manually.

### Debugger permission

JavaScript-based steps and keystroke simulations require the debugger permission.

The first time the extension is updated to a version requiring debugger permission, you'll see a permission request and the extension is disabled until you approve it:
{{< img src="synthetics/browser_tests/recording__replay--accepting-permission_2.mp4" alt="Accepting the debugger permission" video="true" height="400px" >}}
<p style="text-align: center;"><em>Click on the three dots {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} menu to accept the permission.</em></p>

### How to use step replay

You can replay steps in three ways:

<strong>1. Single step replay:</strong> Re-execute a single step:
{{< img src="synthetics/browser_tests/recording__replay--replay-one-step_1.mp4" alt="Single Step Replay" video="true" height="400px" >}}
<p style="text-align: center;"><em>Hover over the step, and click on the play button to replay only this step.</em></p>

<strong>2. Replay all steps:</strong> Run the entire sequence of steps as defined in the recorder:
{{< img src="synthetics/browser_tests/recording__replay--replay-all-steps_1.mp4" alt="Replay All Steps" video="true" height="400px" >}}
<p style="text-align: center;"><em>Click on the replay all button (⏩︎) on top of the step list to replay all steps.</em></p>

<strong>3. Replay selected steps:</strong> Run a subset of steps you select in the step list:
{{< img src="synthetics/browser_tests/recording__replay--replay-selected-steps_1.mp4" alt="Replay Selected Steps" video="true">}}
<p style="text-align: center;"><em>Select the steps you want to replay then click on the replay selected button (⏩︎) on top of the step list.</em></p>

### Step replay feature support

The following table summarizes which Browser Test step types are supported by step replay:

| Step type                | Supported by Step Replay | Notes |
|--------------------------|:------------------------:|-------|
| Extract variable         | {{< X >}}                       |       |
| Go to URL                | {{< X >}}                       |       |
| Refresh                  | {{< X >}}                       |       |
| Scroll                   | {{< X >}}                       |       |
| Select option            | {{< X >}}                       |       |
| Wait                     | {{< X >}}                       |       |
| Run API test             | {{< X >}}                       |       |
| Assert checkbox state    | {{< X >}}                       |       |
| Assert current URL       | {{< X >}}                       |       |
| Assert element attribute | {{< X >}}                       |       |
| Assert element content   | {{< X >}}                       |       |
| Assert element present   | {{< X >}}                       |       |
| Assert file download     | {{< X >}}                       |       |
| Assert page contains     | {{< X >}}                       |       |
| Assert page lacks        | {{< X >}}                       |       |
| Assert from JavaScript   | {{< X >}}                       |       |
| Extract from JavaScript  | {{< X >}}                       |       |
| Press key                | {{< X >}}                       |       |
| Type text                | {{< X >}}                       |       |
| Click                    | {{< X >}}*                      | *Click steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |
| Hover                    | {{< X >}}*                      | *Hover steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |

### Step types not supported by step replay

| Step type                | Supported by step replay |
|--------------------------|:------------------------:|
| Assert email             | Not supported yet        |
| Assert requests          | Not supported yet        |
| Extract from email body  | Not supported yet        |
| Go to email link         | Not supported yet        |
| Upload files             | Not supported yet        |
| Assert natural language  | Not supported yet        |

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][15] can create, edit, and delete Synthetic browser tests. To get create, edit, and delete access to Synthetic browser tests, upgrade your user to one of those two [default roles][15].

If you are using the [custom role feature][15], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

Use [granular access control][17] to limit who has access to your test based on roles, teams, or individual users:

1. Open the permissions section of the form.
2. Click **Edit Access**.
  {{< img src="synthetics/settings/grace_2.png" alt="Set permissions for your test from Private Locations configuration form" style="width:100%;" >}}
3. Click **Restrict Access**.
4. Select teams, roles, or users.
5. Click **Add**.
6. Select the level of access you want to associate with each of them.
7. Click **Done**.

<div class="alert alert-info">You can view results from a Private Location even without Viewer access to that Private Location.</div>

| Access level | View test configuration | Edit test configuration | View test results | Run test  | View recording | Edit recording |
| ------------ | ----------------------- | ----------------------- | ------------------| --------- | -------------- | -------------- |
| No access    |                         |                         |                   |           |                |                |
| Viewer       | {{< X >}}               |                         | {{< X >}}         |           |                |                |
| Editor       | {{< X >}}               | {{< X >}}               | {{< X >}}         | {{< X >}} | {{< X >}}      | {{< X >}}      |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations/
[2]: /continuous_testing/environments/proxy_firewall_vpn
[3]: /help/
[4]: /synthetics/settings/#global-variables
[5]: /synthetics/browser_tests/actions#variables
[6]: /api/latest/synthetics/#create-or-clone-a-test
[7]: http://daringfireball.net/projects/markdown/syntax
[8]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[9]: /synthetics/notifications/
[10]: https://www.google.com/chrome
[11]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[12]: /synthetics/browser_tests/actions/#assertion
[13]: /synthetics/guide/explore-rum-through-synthetics/
[14]: /synthetics/browser_tests/actions/
[15]: /account_management/rbac#custom-roles
[16]: /account_management/rbac/#create-a-custom-role
[17]: /account_management/rbac/granular_access
[18]: https://www.microsoft.com/edge
