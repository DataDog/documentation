---
title: Mobile App Testing
description: Learn how to start monitoring key business flows with mobile app tests.
aliases:
- /mobile_testing/mobile_app_tests
- /mobile_app_testing/mobile_app_tests
further_reading:
- link: "/synthetics/mobile_app_testing/settings"
  tag: "Documentation"
  text: "Learn about mobile test settings"
- link: "/synthetics/browser_tests"
  tag: "Documentation"
  text: "Learn how to create Synthetic browser tests"
- link: "https://www.datadoghq.com/blog/test-maintenance-best-practices/"
  tag: "Blog"
  text: "Best practices for maintaining end-to-end tests"
---


{{< site-region region="gov" >}}
<div class="alert alert-warning">Mobile Application Testing is not supported on this site.</div>
{{< /site-region >}}

## Overview

Mobile Application Testing allows you to test and monitor key business flows for Android and iOS applications using real devices. 

Mobile app tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][1].

You can create mobile app tests in Datadog by navigating to [**Digital Experience** > **New Test**][12] and selecting **Mobile Application Test**.

{{< img src="mobile_app_testing/new_test.png" alt="Create a Synthetic Mobile Test" style="width:50%;">}}

### Flakiness 

Flakiness is a pain point in end-to-end testing because tests occasionally fail. When a frontend team implements a change, an identifier in your test may alert on it instead of an actual application issue.

To prevent flaky tests, Datadog uses an algorithm that leverages a set of locators to target elements in mobile app tests. A small change in the UI may modify an element (for example, moving it to another location). The mobile app test automatically locates the element again based on points of reference that are not affected by the change. 

When the test runs successfully, the mobile app test recomputes (or "self heals") any broken locators with updated values. This ensures your tests do not break from simple UI updates and your tests are automatically adapting to your mobile application's UI. 

## Configuration

Define the configuration of your mobile app test.

1. Select a mobile application from the dropdown menu. If you haven't created one already, create a mobile application in the [Applications List section][2] on the [Synthetic Monitoring & Continuous Testing Settings page][3]. 
2. Select a **version** or click **Always run the latest version** to use the latest version of your mobile application whenever your test is run.
3. Add a **name** for your test.
4. Select **environment and additional tags** that relate to your test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>`.
4. Select the **devices** to run your test on.
5. Set retry conditions for your test.
6. Set the **test frequency** by clicking on basic time intervals or customizing your test frequency and **alert conditions** for your test monitor. 
7. Enter a name for the test monitor, select a service or team member to notify, and add a message notification.

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

Access restriction is available for customers using [custom roles][10] on their accounts.

You can restrict access to a mobile app test based on the roles in your organization. When creating a mobile app test, choose which roles (in addition to your user) can read and write your test. 

{{< img src="synthetics/settings/restrict_access_1.png" alt="Set permissions for your test" style="width:70%;" >}}

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
[10]: /account_management/rbac/?tab=datadogapplication#create-a-custom-role
[11]: /mobile_app_testing/mobile_app_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options