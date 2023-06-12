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

## Overview

Mobile application tests are scenarios executed by Datadog on your iOS and Android applications. They run at configurable periodic intervals—from multiple device types—to verify that your applications are up and responding to requests and actions, and that any conditions defined in your scenarios are met. 

Mobile tests can run on a schedule, on-demand, or directly within your [CI/CD pipelines][1].

<div class="alert alert-info">Mobile Application Testing is in private beta. To register, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHny7qHl5w3u3DCI4Ilc-r4IQZSAFOeZgMvP3CKBO9hEl1qA/viewform" target="_blank">request access</a>.</div>

## Configuration

Define the configuration of your mobile test.

1. Create a mobile application on the [Applications List section][2] in the [Synthetic Monitoring & Continuous Testing Settings page][3] and select it from the application dropdown menu.
2. Select a **version** of your mobile application or click **Always run the latest version**.
3. Add a **name** for your mobile test.
4. Select **environment and additional tags** that relate to your mobile test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>`.
4. Select **devices** including mobile devices and tablets to run your mobile test on.
5. Set the **test frequency** by clicking on basic time intervals or customizing your test frequency. 

## Variables

### Create local variables

To create a local variable, click **Create a Local Variable** at the top right hand corner. You can select one of the following available builtins:

`{{ numeric(n) }}`
: Generates a numeric string with `n` digits.

`{{ alphabetic(n) }}`
: Generates an alphabetic string with `n` letters.

`{{ alphanumeric(n) }}`
: Generates an alphanumeric string with `n` characters.

`{{ uuid }}`
: Generates a version 4 universally unique identifier (UUID).

`{{ date(n unit, format) }}`
: Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at + or - `n` units.

`{{ timestamp(n, unit) }}` 
: Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at + or - `n` units.

To obfuscate local variable values in test results, select **Hide and obfuscate variable value**. Once you have defined the variable string, click **Add Variable**.

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