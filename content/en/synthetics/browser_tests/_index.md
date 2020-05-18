---
title: Browser Tests
kind: documentation
description: Simulate and monitor user journeys from specific locations.
aliases:
  - /synthetics/browser_check
  - /synthetics/browser_test
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "https://www.datadoghq.com/blog/browser-tests/"
  tag: "Blog"
  text: "User experience monitoring with browser tests"
- link: "/synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
- link: "/synthetics/browser_tests/test_results/"
  tag: "Documentation"
  text: "Browser test results"
---

## Overview

Browser tests are scenarios executed by Datadog on your web applications. They run at configurable periodic intervals from multiple locations around the world, and from multiple devices. These tests verify both that your applications are up and responding to requests, and that any conditions defined in your scenarios are met.

## Configuration

### Test details

Define the configuration of your browser test.

1. **Starting URL**: The URL from which your browser test starts the scenario.
    * Advanced Options (optional): Set custom request headers, cookies, or authenticate through Basic Auth.
        * Headers: Defined headers override the default browser headers. For example, set the User Agent in the header to [identify Datadog scripts][1].
        * Authentication: Authenticate through HTTP Basic Authentication with a username and a password.
        * Cookies: Defined cookies are added to the default browser cookies. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

2. **Name**: The name of your browser test.
3. **Select your tags**: The tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the Synthetics page.
4. **Devices**: The devices to run your test on. Available devices are `Laptop Large`, `Tablet`, and `Mobile Small`.
5. **Locations**: The Datadog managed locations to run the test from. Many AWS locations from around the world are available. You can also set up a [Private Location][2] to run a Synthetics Browser test on a private URL not accessible from the public internet.
6. **How often should Datadog run the test?** Intervals are available between every 5 minutes to once per week.

### Use global variables

You can use the [global variables defined in the **settings**][3] in the URL as well as in the Advanced Options of your browser tests. To display your list of variables, type `{{` in your desired field.

{{< img src="synthetics/browser_tests/using_variables_browser.mp4" alt="Using Variables in Browser Tests" video="true"  width="80%" >}}

### Define alert conditions

You can customize alert conditions to define the circumstances under which you want a test to send a notification alert.

* An alert is triggered if any assertion fails for `<INSERT_NUMBER>` minutes from any `<INSERT_NUMBER>` of `<NUMBER_OF_CHOSEN>` locations. This alerting rule allows you to specify for how much time and on how many locations a test needs to fail before triggering the notification using. 
* Retry `<INSERT_NUMBER>` times before location is marked as failed. This allows you to define how many consecutive test failures need to happen for a location to be considered as failed. By default, there is a 300ms wait before retrying a test that failed. This interval can be configured via the [API][4].

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="Browser test alerting rule"  >}}

### Notify your team

A notification is sent according to the set of alerting conditions. To configure your notifications:

1. Enter a **message** for the browser test. This field allows standard [Markdown formatting][5] and supports the following [conditional variables][6]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when monitor alerts                                            |
    | `{{^is_alert}}`            | Show unless monitor alerts                                          |
    | `{{#is_recovery}}`         | Show when monitor recovers from either ALERT   |
    | `{{^is_recovery}}`         | Show unless monitor recovers from either ALERT |

    Notification messages include the **message** defined in this section and information about the failing locations.

2. Choose your [services][6] and/or team members to notify.
3. Specify a renotification frequency. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.
4. Click **Save Details and Record Test**.
5. Record your test.

## Record test

Tests can be only recorded from **[Google Chrome][7]**. To record your test, download the [Datadog Record Test extension for Google Chrome][8].

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Browser test record test"  >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window in order to avoid sizing issues in the displayed window within Datadog's interface.
Hitting **Open in a pop-up** and **Shift** opens the pop up in incognito mode. This is useful to start recording your test from a fresh browser free from already logged in sessions, cookies from your existing browser, etc.
2. Click on **Start recording** to begin recording your browser test.
3. Your actions are recorded and used to create [steps][9] within your browser test scenario.
4. Use the [steps][9] available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_tests/browser_test_step.png" alt="Browser Test steps"  style="width:80%;">}}

    **Note**: **Your last browser test step must be an [assertion][10]** to confirm the journey executed by the browser test resulted in the expected state. 
5. Once you have finished your scenario, click on **Save and Launch Test**.

## Steps

After saving a browser test, you can record [steps][9] which you can then edit or build on.

Steps are a series of actions that you can record for a browser test which you can then edit or build on. You can define the steps you want your browser test to go through either by directly recording them with the Datadog test recorder extension or by manually adding the step of interest. You can also configure certain steps with [advanced options][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/identify_synthetics_bots/
[2]: /synthetics/private_locations/
[3]: /synthetics/settings/#global-variables
[4]: /api/v1/synthetics/#create-or-clone-a-test
[5]: http://daringfireball.net/projects/markdown/syntax
[6]: /integrations/#cat-notification
[7]: https://www.google.com/chrome
[8]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[9]: /synthetics/browser_tests/actions/
[10]: /synthetics/browser_tests/actions/#assertion
[11]: /synthetics/browser_tests/advanced_options/
