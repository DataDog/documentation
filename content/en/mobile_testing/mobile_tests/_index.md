---
title: Mobile Application Tests
kind: documentation
description: Learn how to start monitoring key business flows with mobile application tests.
further_reading:
- link: "/mobile_testing/settings"
  tag: "Documentation"
  text: "Learn about mobile test settings"
- link: "/synthetics/browser_tests"
  tag: "Documentation"
  text: "Learn how to create Synthetic browser tests"
---

<div class="alert alert-info">Mobile Application Testing is in private beta. To register, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHny7qHl5w3u3DCI4Ilc-r4IQZSAFOeZgMvP3CKBO9hEl1qA/viewform" target="_blank">request access</a>.</div>

## Overview

Mobile application tests are scenarios executed by Datadog on your iOS and Android applications. They run at configurable periodic intervals—from multiple device types—to verify that your applications are up and responding to requests and actions, and that any conditions defined in your scenarios are met. 

Mobile tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][1].

You can create mobile tests in Datadog by navigating to [**UX Monitoring** > **New Test**][12] and selecting **Mobile Application Test**.

{{< img src="mobile_testing/new_test.png" alt="Create a Synthetic Mobile Test" style="width:50%;">}}

## Configuration

Define the configuration of your mobile test.

1. Create a mobile application on the [Applications List section][2] in the [Synthetic Monitoring & Continuous Testing Settings page][3] and select it from the mobile application dropdown menu.
2. Select a **version** of your mobile application or click **Always run the latest version**.
3. Add a **name** for your mobile test.
4. Select **environment and additional tags** that relate to your mobile test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>`.
4. Select **devices** including mobile devices and tablets to run your mobile test on.
5. Set the **test frequency** by clicking on basic time intervals or customizing your test frequency. 

{{% synthetics-variables %}}

### Use global variables

You can use the [global variables defined in **Settings**][4] in the **Starting URL** and **Advanced Options** of your mobile test details, as well as in your test recording to define local variables. To display a list of available variables, type `{{` in the desired field.

Define the variables you want to incorporate into the user journey before you start recording.

You can inject the variables available to you while recording. For more information about using variables in your mobile test recording, see [Mobile Test Steps][11].

### Define retry conditions

You can specify how much time a test needs to fail before triggering a notification alert.

* Retry `X` times after `Y` ms in case of failure. 

### Define scheduling and alert conditions

By default, mobile tests are set up for on-demand testing, meaning these tests can run [directly in a CI pipeline][1].

{{< img src="mobile_testing/alerting_rules.png" alt="Scheduling and alerting conditions for a mobile test" style="width:90%" >}}

You can customize alert conditions to define how often you want to send an alert and the circumstances under which you want a test to send a notification alert.

* An alert is triggered if any assertion fails for `X` minutes. 

### Configure the test monitor

A notification is sent according to the set of alerting conditions. Use this section to define how and what to message your teams.

1. Enter a **message** for the mobile test. This field allows standard [Markdown formatting][5] and supports the following [conditional variables][6]:

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
4. Click **Save & Edit Recording** to save your test configuration and record your mobile test steps.

For more information, see [Using Synthetic Test Monitors][7].

## Run tests in CI

You can run mobile tests in a CI pipeline by defining the `mobileApplicationVersionFilePath` option in a [test `synthetics.json` file][13] and a [global configuration `synthetics-ci.config` file][14] as needed. Global configuration file options take precedence over test configuration file options.

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

## Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][8] can create, edit, and delete Synthetic mobile tests. To get create, edit, and delete access to Synthetic mobile tests, upgrade your user to one of those two [default roles][8].

If you are using the [custom role feature][9], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions.

### Restrict access

Access restriction is available for customers using [custom roles][10] on their accounts.

You can restrict access to a mobile test based on the roles in your organization. When creating a mobile test, choose which roles (in addition to your user) can read and write your test. 

{{< img src="synthetics/settings/restrict_access.png" alt="Set permissions for your test" style="width:70%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/cicd_integrations/
[2]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[3]: /mobile_testing/settings/
[4]: /synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://daringfireball.net/projects/markdown/syntax
[6]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[7]: synthetics/guide/synthetic-test-monitors/
[8]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /account_management/rbac/?tab=datadogapplication#custom-roles
[10]: /account_management/rbac/?tab=datadogapplication#create-a-custom-role
[11]: /mobile_testing/mobile_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options