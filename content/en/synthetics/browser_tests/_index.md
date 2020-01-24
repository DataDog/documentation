---
title: Browser Test
kind: documentation
description: Simulate and monitor user journeys from specific locations.
aliases:
  - /synthetics/browser_tests/actions
  - /synthetics/browser_tests/advance_options
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "https://www.datadoghq.com/blog/browser-tests/"
  tag: "Blog"
  text: "User experience monitoring with browser tests"
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/api_tests"
  tag: "Documentation"
  text: "Configure an API Test"
---

## Overview

Browser tests are scenarios executed by Datadog on your web applications. They run at configurable periodic intervals from multiple locations around the world, and from multiple devices. These checks verify both that your applications are up and responding to requests, and that any conditions defined in your scenarios are met.

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
4. **Devices**: The devices to run your check on. Available devices are `Laptop Large`, `Tablet`, and `Mobile Small`.
5. **Locations**: The Datadog managed locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][2]. You can also set up a [Private Location][3] to run a Synthetics Browser test on a private URL not accessible from the public internet.
6. **How often should Datadog run the test?** Intervals are available between every 15 minutes to once per week. [Contact support][4] to enable additional frequencies for your test.

### Use global variables

You can use the [global variables defined in the `Settings`][5] in the URL, as well as in the Advanced Options of your browser tests. To display your list of variables, type `{{` in your desired field.

{{< img src="synthetics/browser_tests/using_variables_browser.mp4" alt="Using Variables in Browser Tests" video="true"  width="80%" >}}

### Alert conditions

An alert is triggered if any assertion fails for `<INSERT_NUMBER>` minutes from any `<INSERT_NUMBER>` of `<NUMBER_OF_CHOSEN>` locations.

### Notifications

To configure your notifications:

1. Enter a **message** for the browser test. This field allows standard [Markdown formatting][6]. Notification messages include the **message** defined in this section and information about which assertion failed and why.
2. Choose your [services][7] and/or team members to notify.
3. Click **Save Details and Record Test** to save your browser test.
4. Start to record your test.

## Record test

Tests can be only recorded from **[Google Chrome][8]**. To record your test, download the [Datadog Record Test extension for Google Chrome][9].

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Browser test record test"  >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window in order to avoid sizing issues in the displayed window within Datadog's interface.
Hitting **Open in a pop-up** and **Shift** will open the pop up in incognito mode. This is useful to start recording your test from a fresh browser free from already logged in sessions, cookies from your existing browser, etc.
2. Click on **Start recording** to begin recording your browser test.
3. Your actions are recorded and used to create steps within your browser test scenario.
4. Use the actions available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_tests/browser_test_step.png" alt="Browser Test steps"  style="width:80%;">}}

    **Note**: **Your last browser test step must be an Assertion**, otherwise there is nothing to check.
5. Once you have finished your Scenario, click on **Save and Launch Test**.

## Actions

After saving a Browser Test you can record [Actions][10] as a series of steps, which you can then edit or build on. Actions can also be configured with [advanced settings][11].

## Test failure and errors

A test is considered `FAILED` if it does not satisfy its assertions or if the request failed for another reason. You can view specific browser test errors by clicking on the error in the step results.

Common failure reasons include:

| Error                                | Description                                                                                                          |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `Element located but it's invisible` | The element is on the page but cannot be clicked on—for instance, if another element is overlaid on top of it.       |
| `Cannot locate element`              | The element cannot be found in the HTML.                                                                             |
| `Select did not have option`         | The specified option is missing from the dropdown menu.                                                              |
| `Forbidden URL`                      | The test likely encountered a protocol that is not supported. Reach out to [Datadog support][4] for further details. |
| `General test failure`               | A general error message. [Contact support][4] for further details.                                                   |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/identify_synthetics_bots
[2]: /api/?lang=bash#get-available-locations
[3]: /synthetics/private_locations
[4]: /help
[5]: /synthetics/settings#global-variables
[6]: http://daringfireball.net/projects/markdown/syntax
[7]: /integrations/#cat-notification
[8]: https://www.google.com/chrome
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /synthetics/browser_tests/actions
[11]: /synthetics/browser_tests/advance_settings
