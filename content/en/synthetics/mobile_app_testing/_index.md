---
title: Mobile Application Testing and Monitoring
description: "Create intelligent, self-maintaining mobile tests to ensure the most critical parts of your mobile applications are up and running from real devices."
aliases:
- /mobile_testing
- /mobile_app_testing
further_reading:
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "/synthetics/mobile_app_testing/mobile_app_tests"
  tag: "Documentation"
  text: "Learn how to create Synthetic mobile app tests"
- link: "/synthetics/mobile_app_testing/settings"
  tag: "Documentation"
  text: "Learn how to upload your iOS or Android mobile applications"
- link: "/continuous_testing/"
  tag: "Documentation"
  text: "Learn about Continuous Testing & CI/CD"
cascade:
  algolia:
    tags: ['mobile_testing']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Mobile Application Testing is not supported on this site.</div>
{{< /site-region >}}

## Overview

Mobile Application Testing allows you to test and monitor key business flows for Android and iOS applications using real devices.
Datadog runs these tests on real devices to provide a realistic, step-by-step representation of key application workflows, screenshots of each step, and detailed pass or fail results so your team can quickly visualize what went wrong.
Mobile app tests can run on a schedule, on demand, or directly within your [CI/CD pipelines][1].

You can create mobile app tests in Datadog by navigating to [**Digital Experience** > **New Test**][12] and selecting **Mobile Application Test**.

{{< img src="mobile_app_testing/new_test_2.png" alt="Create a Synthetic Mobile Test" style="width:50%;">}}

## Configuration

You may create a test using one of the following options:

- **Create a test from a template**:

    1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Request Details, Alert Conditions, and Steps.
    2. Click **+Create Test** to open the configuration page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
    3. Click **Save & Quit** in the upper right hand corner to submit your Mobile Application Test.<br /><br>
       {{< img src="/mobile_app_testing/templates_mobile_app.mp4" alt="Video of Mobile Application test landing page with templates" video="true" >}}

- **Build a test from scratch**:

    1. Click the **+** template, then select a mobile application from the dropdown menu. If you haven't created one already, create a mobile application in the [Applications List section][2] on the [Synthetic Monitoring & Continuous Testing Settings page][3]. 
    1. Select a **version** or click **Always run the latest version** to use the latest version of your mobile application whenever your test is run.
    1. Add a **name** for your test.
    1. Select **environment and additional tags** that relate to your test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>`.
    1. Select the **devices** to run your test on.
    1. Set retry conditions for your test.
    1. Set the **test frequency** by clicking on basic time intervals or customizing your test frequency and **alert conditions** for your test monitor. 
    1. Enter a name for the test monitor, select a service or team member to notify, and add a message notification.
    1. Click **Save & Edit Recording** to submit your Mobile Application Test.

### Snippets

When configuring a new Mobile Application test, use snippets to automatically populate your OS versions, device sizes, manufacturers, and uptime, instead of manually selecting these options. The following snippets are available:

* **Device Size**: Automatically perform your Mobile Application tests on a specifically sized screen across devices:

  - **Multi-screen size**
  - **Tablet**
  - **Large Screen (iOS only)**
  - **Standard Screen (iOS only)**
  - **Small Screen (iOS only)**

* **OS Version**: Automatically test your iOS or Android apps on multiple versions. This selection toggles to either iOS or Android depending on the choice of your Mobile Application.

* **Device Manufacturer (Android only)**: Automatically test your Android apps across multiple device manufacturers.

* **Uptime**: Automatically configure a test with the shortest frequency available (every 15 minutes).

<br/>
  {{< img src="mobile_app_testing/mobile_app_snippets_2.png" alt="Screenshot of the left hand side of a mobile app test creation, showing the snippets examples" width="70%" >}}

## Variables

{{% synthetics-variables %}}

### Use global variables

You can use the [global variables defined in **Settings**][4] in the **Starting URL** and **Advanced Options** of your mobile app test details, as well as in your test recording to define local variables. To display a list of available variables, type `{{` in the desired field.

Define the variables you want to incorporate into the user journey before you start recording.

You can inject the variables available to you while recording. For more information about using variables in your mobile test recording, see [Mobile App Test Steps][11].

## Test retries

You can specify how much time a test needs to fail before triggering a notification alert.

* Retry `X` times after `Y` ms in case of failure.

## Scheduling and alerts

By default, mobile app tests are set up for on-demand testing, meaning these tests can run [directly in a CI pipeline](#run-tests-in-ci).

{{< img src="mobile_app_testing/alerting_rules.png" alt="Scheduling and alerting conditions for a mobile test" style="width:90%" >}}

You can customize alert conditions to define how often you want to send an alert and the circumstances under which you want a test to send a notification alert.

* An alert is triggered if any assertion fails for `X` minutes.

### Configure the test monitor

A notification is sent according to the set of alerting conditions. Use this section to define how and what to message your teams.

1. Enter a **message** for the mobile app test. This field allows standard [Markdown formatting][5] and supports the following [conditional variables][6]:

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
4. Click **Save & Edit Recording** to save your test configuration and record your mobile app test steps.

For more information, see [Using Synthetic Test Monitors][7].

## Flakiness 

Flakiness is a pain point in end-to-end testing. Test failures are occasionally caused by valid frontend code changes that impact an identifier, not by an actual application issue.

To prevent flaky tests, Datadog uses an algorithm that leverages a set of locators to target elements in mobile app tests. A small change in the UI may modify an element (for example, moving it to another location). The mobile app test automatically locates the element again based on points of reference that are not affected by the change. 

When the test runs successfully, the mobile app test recomputes (or "self heals") any broken locators with updated values. This ensures your tests do not break from simple UI updates and your tests are automatically adapting to your mobile application's UI. 

## Run tests in CI

You can run mobile app tests in a CI pipeline by defining the `mobileApplicationVersionFilePath` option in a [test `synthetics.json` file][13] and a [global configuration `synthetics-ci.config` file][14] as needed. Global configuration file options take precedence over test configuration file options.

In this example, the test `aaa-aaa-aaa` runs with the override application version found in `application/path`.

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "aaa-aaa-aaa",
      "config": {
        "mobileApplicationVersionFilePath": "application/path"
      }
    }
  ]
}
```

Then, run `$ datadog-ci synthetics run-tests --config synthetics-ci.config`.

For more information, see [Continuous Testing and CI/CD][1].

## Permissions

By default, only users with the Datadog Admin and Datadog Standard roles can create, edit, and delete Synthetic mobile app tests. To get create, edit, and delete access to Synthetic mobile app tests, upgrade your user to one of those two [default roles][8].

If you are using the [custom role feature][9], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

{{< img src="synthetics/settings/grace_1.png" alt="Set permissions for your test" style="width:70%;" >}}

Use [granular access control][10] to limit who has access to your test based on roles, teams, or individual users.

To do so:

1. Open the permissions section of the form
2. Click on `edit access`

{{< img src="synthetics/settings/grace_2.png" alt="Set permissions for your test" style="width:70%;" >}}

3. Click on `restrict access`
4. Select teams, roles, or users
5. Click `add`
6. Select the level of access you want to associate with each of them
7. Click on done

| Access level | View test configuration | Edit test configuration | View test results | Run test  |
| ------------ | ----------------------- | ----------------------- | ------------------| --------- |
| No access    |                         |                         |                   |           |
| Viewer       | {{< X >}}               |                         | {{< X >}}         |           |
| Editor       | {{< X >}}               | {{< X >}}               | {{< X >}}         | {{< X >}} |

<div class="alert alert-info"><strong>Note</strong>: You will be able to see results from Private Location even if you don't have Viewer access to that Private Location.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/cicd_integrations/
[2]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[3]: /mobile_app_testing/settings/
[4]: /synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://daringfireball.net/projects/markdown/syntax
[6]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[7]: /synthetics/guide/synthetic-test-monitors/
[8]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /account_management/rbac/?tab=datadogapplication#custom-roles
[10]: /account_management/rbac/granular_access
[11]: /mobile_app_testing/mobile_app_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
