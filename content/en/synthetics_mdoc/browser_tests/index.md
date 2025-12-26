---
title: Browser Testing
description: Simulate and monitor user journeys from specific locations.
breadcrumbs: Docs > Synthetic Testing and Monitoring > Browser Testing
sourceUrl: https://docs.datadoghq.com/synthetics/browser_tests/index.html
---

# Browser Testing

## Overview{% #overview %}

Browser tests are scenarios executed by Datadog on your web applications. They run at configurable periodic intervals from multiple locations around the world, from multiple browsers, and devices. These tests verify both that your applications are up and responding to requests, and that any conditions defined in your scenarios are met.

{% alert level="info" %}
If you are interested in testing applications that sit behind MFA, read the dedicated guide and [send feedback](https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link) to the Synthetic Monitoring team to help improve the systems that matter most to your teams.
{% /alert %}

## Test configuration{% #test-configuration %}

You may create a test using one of the following options:

### Create a test from a template{% #create-a-test-from-a-template %}

1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Alert Conditions, Steps, and optionally Variables.
1. Click **+Create Test** to open the configuration page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
1. Click **Save & Quit** in the upper right hand corner to submit your Browser Test.
   {% video
      url="https://datadog-docs.imgix.net/images//synthetics/browser_tests/synthetics_templates_browser.mp4" /%}

### Build a test from scratch{% #build-a-test-from-scratch %}

1. Click the **+** template to start a new Browser Test from scratch.
1. Enter a **Starting URL**: The URL from which your browser test starts the scenario.
1. Add a **name**: The name of your browser test.
1. Select **environment and additional tags**: Set the `env` and related tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>`.

{% alert level="info" %}
See Advanced options for more options.
{% /alert %}

Select **browsers and devices**: The browsers (such as `Chrome`, `Firefox`, and `Edge`), and devices (such as `Laptop Large`, `Tablet`, and `Mobile Small`) to run your test on.

- For a large laptop device, the dimensions are 1440 pixels x 1100 pixels.
- For a tablet device, the dimensions are 768 pixels x 1020 pixels.
- For a small mobile device, the dimensions are 320 pixels x 550 pixels.

Select **managed and private locations**: Select from a list of locations around the world that are managed by Datadog, or create [private locations](https://docs.datadoghq.com/synthetics/private_locations/) to run your browser test from custom locations or inside private networks.

**Note**: You can also use the [Continuous Testing Tunnel](https://docs.datadoghq.com/continuous_testing/environments/proxy_firewall_vpn) to trigger tests on your local development setup or in your CI/CD pipeline to test internal environments.

Set the **test frequency**: The intervals vary from every five minutes to once per week. To request one-minute frequency, [contact Support](https://docs.datadoghq.com/help/).

Click **Save & Edit Recording** to submit your Browser Test.

### Locations{% #locations %}

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

### Snippets{% #snippets %}

When setting up a new Synthetic Monitoring browser test, use snippets to automatically fill in your devices and regions, rather than selecting these options manually. The following snippets are available:

- **Screen sizes**: Automatically perform your browser tests on a specifically sized screen across browsers:

  - **Large**
  - **Tablet**
  - **Mobile**

- **Multi-region check**: Automatically test your website against a location in each of the three primary geographic regions (AMER, APAC and EMEA).

  {% image
     source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/browser_snippets_2.488e04d90384368073740c50a8647b75.png?auto=format"
     alt="Screenshot of the left hand side of a browser test creation, showing the snippets examples" /%}

### Advanced options{% #advanced-options %}

{% tab title="Request Options" %}
Select **Disable CORS** to prevent the cross-origin resource sharing (CORS) policy from blocking your test. To prevent the Content Security Policy (CSP) from blocking your test, select **Disable CSP**.

- **Request Headers**: Define headers in the **Name** and **Value** fields to add to or override the default browser headers. For example, you can set the User Agent in the header to [identify Datadog scripts](https://docs.datadoghq.com/synthetics/guide/identify_synthetics_bots/?tab=apitests).
- **Cookies**: Define cookies to add to the default browser cookies. Enter one cookie per line, using the syntax of [`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie).
- **HTTP Authentication**: Authenticate through HTTP Basic, Digest, or NTLM with a username and a password. Your credentials are used in every step of your browser test. **Note**: Authentication through HTTP Basic can be used for websites that request user credentials through a browser system prompt.

Request options are set at every test execution and apply to every step of your browser test at execution time, not recording time. If you need these options to remain active to record the following steps, manually apply the options on the page you are recording from and create subsequent steps in your test.
{% /tab %}

{% tab title="Certificate" %}
Select **Ignore server certificate error** to instruct the test to skip errors in the server certificate.

- **Client Certificate**: Perform tests on systems that require client certificates by clicking **Upload File** and uploading your certificate file and private key. Only PEM certificates are accepted.
- **Client Certificate Domains**: Once the certificate files are uploaded, the client certificate applies to the starting URL's domain. To apply the client certificate on another domain, specify the domain in the **Value** field.

You can include wildcards in the URL.
{% /tab %}

{% tab title="Proxy" %}
Enter a URL for a proxy you want to send requests through in the **Proxy URL** field as `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`.

You can include global variables in the URL.
{% /tab %}

{% tab title="Privacy" %}
Select **Do not capture any screenshots for this test** to prevent screenshots from being taken in your test steps.

This privacy option is available as an [advanced option](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options#prevent-screenshot-capture) at the individual test step level and ensures that no sensitive data appears in your test results. Preventing the test from taking screenshots makes troubleshooting failures more difficult. For more information, see [Data Security](https://docs.datadoghq.com/data_security/synthetics).
{% /tab %}

{% tab title="Starting URL" %}
Enter an amount of time in seconds for the test to wait before declaring the initial test step as failed.
{% /tab %}

{% tab title="Time & Language" %}
By default, timezone is set to UTC, and language is set to English (en). To define a language, use the corresponding 2 or 3 digit [ISO code](https://www.loc.gov/standards/iso639-2/php/code_list.php).
{% /tab %}

{% tab title="Blocked Requests" %}
Enter one or more request patterns to block from loading while the test is run. Enter one request pattern per line using the [match pattern format](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns). Wildcards (for example, `*://*.example.com/*`) are supported.

Blocked requests are skipped during test execution but do not affect page rendering when [recording steps](https://docs.datadoghq.com/synthetics/browser_tests/actions). View blocked requests in the [Resources tab](https://docs.datadoghq.com/synthetics/browser_tests/test_results#resources) of test runs. Blocked requests have a status of `blocked`.
{% /tab %}

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

### Use global variables{% #use-global-variables %}

You can use the [global variables defined in **Settings**](https://docs.datadoghq.com/synthetics/settings/#global-variables) in the **Starting URL** and **Advanced Options** of your browser test details, as well as in your test recording.

To display a list of available variables:

- In your browser test's details: Type `{{` in the desired field.

  {% video
     url="https://datadog-docs.imgix.net/images/synthetics/browser_tests/use_global_variables_1.mp4" /%}

- In your browser test's recorder: Import the variable in your test, then type `{{` in the desired field or inject the variable in your application to use it.

  {% video
     url="https://datadog-docs.imgix.net/images/synthetics/browser_tests/use_global_variables_2.mp4" /%}

For more information about using variables in your browser test recording, see [Browser Test Steps](https://docs.datadoghq.com/synthetics/browser_tests/actions#variables).

### Define alert conditions{% #define-alert-conditions %}

You can customize alert conditions to define the circumstances under which you want a test to send a notification alert.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/alerting_rules.5c9cede9a64d42bf9bb49b3011bf42ea.png?auto=format"
   alt="Browser test alerting rule" /%}

- An alert is triggered if any assertion fails for `X` minutes from any `n` of `N` locations. This alerting rule allows you to specify for how much time and in how many locations a test needs to fail before triggering the notification.
- Retry `X` times before location is marked as failed. This allows you to define how many consecutive test failures need to happen for a location to be considered as failed. By default, there is a 300ms wait before retrying a test that failed. This interval can be configured with the [API](https://docs.datadoghq.com/api/latest/synthetics/#create-or-clone-a-test).

### Configure the test monitor{% #configure-the-test-monitor %}

A notification is sent according to the set of alerting conditions. Use this section to define how and what to message your teams.

1. Enter a **message** for the browser test or use pre-filled monitor messages. This field allows standard [Markdown formatting](http://daringfireball.net/projects/markdown/syntax) and supports the following [conditional variables](https://docs.datadoghq.com/monitors/notify/variables/?tab=is_alert#conditional-variables):

| Conditional Variable | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `{{#is_alert}}`      | Show when the monitor alerts.                        |
| `{{^is_alert}}`      | Show unless the monitor alerts.                      |
| `{{#is_recovery}}`   | Show when the monitor recovers from `alert`.         |
| `{{^is_recovery}}`   | Show unless the monitor recovers from `alert`.       |
| `{{#is_renotify}}`   | Show when the monitor renotifies.                    |
| `{{^is_renotify}}`   | Show unless the monitor renotifies.                  |
| `{{#is_priority}}`   | Show when the monitor matches priority (P1 to P5).   |
| `{{^is_priority}}`   | Show unless the monitor matches priority (P1 to P5). |

Notification messages include the **message** defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/browser_tests_pre-filled.eef403be90ebd068c86ad195e8e71d10.png?auto=format"
      alt="Synthetic Monitoring monitor section, highlighting the pre-filled monitor messages" /%}

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

1. Choose team members and services to notify.

1. Specify a renotification frequency. To prevent renotification on failing tests, check the option `Stop re-notifying on X occurrences`.

1. Click **Save & Start Recording** to save your test configuration and record your browser steps.

For more information, see [Synthetic Monitoring notifications](https://docs.datadoghq.com/synthetics/notifications/).

## Record your steps{% #record-your-steps %}

Tests can be only recorded from [Google Chrome](https://www.google.com/chrome). To record your test, download the [Datadog Record Test extension for Google Chrome](https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa).

You can switch tabs in a browser test recording in order to perform an action on your application (such as clicking on a link that opens another tab) and add another test step. Your browser test must interact with the page first (through a click) before it can perform an [assertion](https://docs.datadoghq.com/synthetics/browser_tests/actions/#assertion). By recording all of the test steps, the browser test can switch tabs automatically at test execution.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/browser_check_record_test.51a8806df6633a177e0b7d213063a794.png?auto=format"
   alt="Browser test record test" /%}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window. This is useful if your application does not support being opened in an iframe or if you want to avoid sizing issues at recording. You can also open the pop-up in **Incognito mode** to start recording your test from a fresh browser free from already logged-in sessions, cookies from your existing browser, and more.

1. Optionally, enable Datadog to automatically collect RUM data when running step recordings from your browser test. For more information, see [Explore RUM & Session Replay](https://docs.datadoghq.com/synthetics/guide/explore-rum-through-synthetics/).

1. Click **Start Recording** to begin recording your browser test.

1. As you click on your application going through the user journey you want to monitor, your actions are automatically recorded and used to create [steps](https://docs.datadoghq.com/synthetics/browser_tests/actions/) within your browser test scenario on the left.

1. In addition to the automatically recorded steps, you can also use the [steps](https://docs.datadoghq.com/synthetics/browser_tests/actions/) available in the upper left corner to enrich your scenario:

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/manual_steps.238b7ef71abc972af410ffa146a763d0.png?auto=format"
      alt="Browser Test steps" /%}



Datadog recommends ending your browser test with an **[assertion](https://docs.datadoghq.com/synthetics/browser_tests/actions/#assertion)** to confirm the journey executed by the browser test resulted in the expected state.

1. Once you have finished your scenario, click **Save and Launch Test**.

## Permissions{% #permissions %}

By default, only users with the [Datadog Admin and Datadog Standard roles](https://docs.datadoghq.com/account_management/rbac#custom-roles) can create, edit, and delete Synthetic browser tests. To get create, edit, and delete access to Synthetic browser tests, upgrade your user to one of those two [default roles](https://docs.datadoghq.com/account_management/rbac#custom-roles).

If you are using the [custom role feature](https://docs.datadoghq.com/account_management/rbac#custom-roles), add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access{% #restrict-access %}

Use [granular access control](https://docs.datadoghq.com/account_management/rbac/granular_access) to limit who has access to your test based on roles, teams, or individual users:

1. Open the permissions section of the form.
1. Click **Edit Access**.
   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/settings/grace_2.09d79bb84cb15017d170b008af71c0f9.png?auto=format"
      alt="Set permissions for your test from Private Locations configuration form" /%}
1. Click **Restrict Access**.
1. Select teams, roles, or users.
1. Click **Add**.
1. Select the level of access you want to associate with each of them.
1. Click **Done**.

{% alert level="info" %}
**Note**: You can view results from a Private Location even without Viewer access to that Private Location.
{% /alert %}

| Access level | View test configuration | Edit test configuration | View test results | Run test | View recording | Edit recording |
| ------------ | ----------------------- | ----------------------- | ----------------- | -------- | -------------- | -------------- |
| No access    |
| Viewer       | yes                     | yes                     |
| Editor       | yes                     | yes                     | yes               | yes      | yes            | yes            |

## Further Reading{% #further-reading %}

- [Version History for Synthetic Monitoring](https://docs.datadoghq.com/synthetics/guide/version_history/)
- [Best practices for creating end-to-end tests](https://www.datadoghq.com/blog/test-creation-best-practices/)
- [Datadog Learning Center: Getting started with Synthetic Browser Testing](https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing)
- [Getting started with Browser Tests](https://docs.datadoghq.com/getting_started/synthetics/browser_test)
- [Learn about Synthetic test monitors](https://docs.datadoghq.com/synthetics/guide/synthetic-test-monitors)
- [Create and manage Synthetic Browser Tests with Terraform](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test)
- [How I helped my client scale their browser tests with Datadog](https://www.datadoghq.com/blog/ambassador-browser-tests/)
