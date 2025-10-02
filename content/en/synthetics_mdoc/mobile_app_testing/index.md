---
title: Mobile Application Testing and Monitoring
description: >-
  Create intelligent, self-maintaining mobile tests to ensure the most critical
  parts of your mobile applications are up and running from real devices.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Mobile Application Testing and
  Monitoring
sourceUrl: https://docs.datadoghq.com/synthetics/mobile_app_testing/index.html
---

# Mobile Application Testing and Monitoring

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com

{% alert level="warning" %}
This product is not supported for your selected [Datadog site](https://docs.datadoghq.com/getting_started/site). ().
{% /alert %}

{% /callout %}

## Overview{% #overview %}

Mobile Application Testing allows you to test and monitor key business flows for Android and iOS applications using real devices. Datadog runs these tests on real devices to provide a realistic, step-by-step representation of key application workflows, screenshots of each step, and detailed pass or fail results so your team can quickly visualize what went wrong. Mobile app tests can run on a schedule, on demand, or directly within your [CI/CD pipelines](https://docs.datadoghq.com/continuous_testing/cicd_integrations/).

Optionally, link Synthetic mobile test data with RUM mobile data if the [RUM SDK](https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/) is used within the tested application.

You can create mobile app tests in Datadog by navigating to [**Digital Experience** > **New Test**](https://app.datadoghq.com/synthetics/mobile/create) and selecting **Mobile Application Test**.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/new_test_2.385255d3a3c52b1984e58b10d5f574c7.png?auto=format"
   alt="Create a Synthetic Mobile Test" /%}

## Configuration{% #configuration %}

You may create a test using one of the following options:

### Create a test from a template{% #create-a-test-from-a-template %}

1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Request Details, Alert Conditions, and Steps.
1. Click **+Create Test** to open the configuration page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
1. Click **Save & Quit** in the upper right hand corner to submit your Mobile Application Test.
   {% video
      url="https://datadog-docs.imgix.net/images//mobile_app_testing/templates_mobile_app.mp4" /%}

### Build a test from scratch{% #build-a-test-from-scratch %}

1. Click the **+** template, then select a mobile application from the dropdown menu. If you haven't created one already, create a mobile application in the [Applications List section](https://app.datadoghq.com/synthetics/settings/mobile-applications) on the [Synthetic Monitoring & Continuous Testing Settings page](https://docs.datadoghq.com/mobile_app_testing/settings/).
1. Select a **version** or click **Always run the latest version** to use the latest version of your mobile application whenever your test is run.
1. Add a **name** for your test.
1. Select **environment and additional tags** that relate to your test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>`.
1. Select the **devices** to run your test on.
1. Set retry conditions for your test.
1. Set the **test frequency** by clicking on basic time intervals or customizing your test frequency and **alert conditions** for your test monitor.
1. Enter a name for the test monitor, select a service or team member to notify, and add a message notification.
1. Click **Save & Edit Recording** to submit your Mobile Application Test.

### Snippets{% #snippets %}

When configuring a new Mobile Application test, use snippets to automatically populate your OS versions, device sizes, manufacturers, and uptime, instead of manually selecting these options. The following snippets are available:

- **Device Size**: Automatically perform your Mobile Application tests on a specifically sized screen across devices:

  - **Multi-screen size**
  - **Tablet**
  - **Large Screen (iOS only)**
  - **Standard Screen (iOS only)**
  - **Small Screen (iOS only)**

- **OS Version**: Automatically test your iOS or Android apps on multiple versions. This selection toggles to either iOS or Android depending on the choice of your Mobile Application.

- **Device Manufacturer (Android only)**: Automatically test your Android apps across multiple device manufacturers.

- **Uptime**: Automatically configure a test with the shortest frequency available (every 15 minutes).

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/mobile_app_snippets_2.61618b39ff5fde9d62570e9debb1384b.png?auto=format"
   alt="Screenshot of the left hand side of a mobile app test creation, showing the snippets examples" /%}

### Advanced options{% #advanced-options %}

You can configure advanced options when creating a mobile test to dynamically adjust app behavior without modifying your code. For example, you can auto-accept alerts, allow application crashes, and capture network resources. These configurations can be accessed in the **Advanced Options** section of your mobile test.

#### Test behavior options:{% #test-behavior-options %}

{% dl %}

{% dt %}
Auto-accept alerts
{% /dt %}

{% dd %}
When enabled, automatically accepts all OS system alerts during test execution.
{% /dd %}

{% dt %}
Allow application crash
{% /dt %}

{% dd %}
When enabled, prevents the test from failing if an application crash is detected. You must include a step to restart the application after the expected crash to continue the test.
{% /dd %}

{% dt %}
Capture network resources
{% /dt %}

{% dd %}
When enabled, collects network requests and responses for each test step and displays them in the results.**Note**: This setting can impact application performance and could prevent the app from starting.
{% /dd %}

{% /dl %}

#### Application arguments:{% #application-arguments %}

You can pass `key:value` pairs to your application when the test starts, allowing you to programmatically modify app behavior. Your application code must be configured to explicitly read and process these key-value pairs.

**Examples:**

{% tab title="Android (Initial Intent Extras)" %}
For Android tests, add the appropriate `key:value` pairs in the Advanced Options section of your test:

```json
{
  "username": "example_user",
  "password": "{{ EXAMPLE_VARIABLE }}"
}
```

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/advanced/mobile_app_advanced_android.27fd26d12d8440796686aea995a1bacd.png?auto=format"
   alt="Mobile app test creation page, showing an example of an advanced option for an Android device." /%}

{% /tab %}

{% tab title="iOS (Process Arguments)" %}
For iOS tests, add the appropriate `key:value` pairs in the Advanced Options section:

```json
{
  "username": "example_user",
  "password": "{{ EXAMPLE_VARIABLE }}",
  "enable_feature_x": "true"
}
```

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/advanced/mobile_app_advanced_iOS.e9adce60a121da3f09ebd5cb00963635.png?auto=format"
   alt="Mobile app test creation page, showing an example of an advanced option for an iOS device." /%}

{% /tab %}

## Devices{% #devices %}

On the device selection screen, you can choose to test mobile devices that are located in either Europe (EU) or the United States (US). To configure a mobile test to use either EU or US hosted devices:

1. Open the edit test page for an existing mobile test or create a new one.
1. Expand the Devices section and choose the device location(s) for your test:
   - **All locations**: Runs tests in both the EU and US.
   - **EU**: Runs tests only in the EU.
   - **US**: Runs tests only in the US.
1. Use the Select Device(s) dropdown to select the devices you want to test on.
1. Click **Save & Edit Recording** to save your test configuration.

**Notes**:

- Tests executed on US-hosted devices are run from AWS US West (Oregon). Similarly, tests on EU-hosted devices are run from AWS Germany (Frankfurt).
- Not all devices are available in both the EU and US. For more details, see the list of [supported devices](https://docs.datadoghq.com/synthetics/mobile_app_testing/devices).

{% video
   url="https://datadog-docs.imgix.net/images/mobile_app_testing/mobile_app_devices_EU.mp4" /%}

## Test retries{% #test-retries %}

You can specify how much time a test needs to fail before triggering a notification alert.

- Retry `X` times after `Y` ms in case of failure.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/retry_condition.2e87a6a7c6a3bff68ef546b3f55f663e.png?auto=format"
   alt="Retry condition step, showing retrying the test 0 times after 300ms in case of failure" /%}

## Scheduling and alerts{% #scheduling-and-alerts %}

By default, mobile app tests are set up for on-demand testing, meaning these tests can run directly in a CI pipeline.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/alerting_rules.4bc1581c966f15ab489b819177b7793a.png?auto=format"
   alt="Scheduling and alerting conditions for a mobile test" /%}

You can customize alert conditions to define how often you want to send an alert and the circumstances under which you want a test to send a notification alert.

- An alert is triggered if any assertion fails for `X` minutes.

### Configure the test monitor{% #configure-the-test-monitor %}

A notification is sent according to the set of alerting conditions. Use this section to define how and what to message your teams.

1. Enter a **message** or use pre-filled monitor messages for the mobile app test. This field allows standard [Markdown formatting](https://daringfireball.net/projects/markdown/syntax) and supports the following [conditional variables](https://docs.datadoghq.com/monitors/notify/variables/?tab=is_alert#conditional-variables):

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
      source="https://datadog-docs.imgix.net/images/mobile_app_testing/mobile_app_synthetic_monitor.ccc41b3bc722945e2146b695900602b0.png?auto=format"
      alt="Mobile app testing monitor section, highlighting the pre-filled monitor messages" /%}

For example, to create a monitor that iterates over steps extracting variables for mobile tests, add the following to the monitor message:

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

1. Click **Save & Edit Recording** to save your test configuration and record your mobile app test steps.

For more information, see [Synthetic Monitoring notifications](https://docs.datadoghq.com/synthetics/notifications/).

## Flakiness{% #flakiness %}

Flakiness is a pain point in end-to-end testing. Test failures are occasionally caused by valid frontend code changes that impact an identifier, not by an actual application issue.

To prevent flaky tests, Datadog uses an algorithm that leverages a set of locators to target elements in mobile app tests. A small change in the UI may modify an element (for example, moving it to another location). The mobile app test automatically locates the element again based on points of reference that are not affected by the change.

When the test runs successfully, the mobile app test recomputes (or "self heals") any broken locators with updated values. This ensures your tests do not break from simple UI updates and your tests are automatically adapting to your mobile application's UI.

## Run tests in CI{% #run-tests-in-ci %}

You can run mobile app tests in a CI pipeline by defining the `mobileApplicationVersionFilePath` option in a [test `synthetics.json` file](https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration?tab=npm#test-files) and a [global configuration `synthetics-ci.config` file](https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options) as needed. Global configuration file options take precedence over test configuration file options.

In this example, the test `aaa-aaa-aaa` runs with the override application version found in `application/path`.

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "aaa-aaa-aaa",
      "testOverrides": {
        "mobileApplicationVersionFilePath": "application/path"
      }
    }
  ]
}
```

Then, run `$ datadog-ci synthetics run-tests --config synthetics-ci.config`.

For more information, see [Continuous Testing and CI/CD](https://docs.datadoghq.com/continuous_testing/cicd_integrations/).

## Permissions{% #permissions %}

By default, only users with the Datadog Admin and Datadog Standard roles can create, edit, and delete Synthetic mobile app tests. To get create, edit, and delete access to Synthetic mobile app tests, upgrade your user to one of those two [default roles](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#datadog-default-roles).

If you are using the [custom role feature](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#custom-roles), add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

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

## Further reading{% #further-reading %}

- [Best practices for creating end-to-end tests](https://www.datadoghq.com/blog/test-creation-best-practices/)
- [Version History for Synthetic Monitoring](https://docs.datadoghq.com/synthetics/guide/version_history/)
- [How to build reliable and accurate synthetic tests for your mobile apps](https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/)
- [Learn how to create Synthetic mobile app tests](https://docs.datadoghq.com/synthetics/mobile_app_testing/)
- [Learn how to upload your iOS or Android mobile applications](https://docs.datadoghq.com/synthetics/mobile_app_testing/settings)
- [Learn about Continuous Testing & CI/CD](https://docs.datadoghq.com/continuous_testing/)
