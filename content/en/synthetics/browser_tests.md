---
title: Browser Test
kind: documentation
beta: true
description: Simulate and monitor user journeys from specific locations.
aliases:
  - /synthetics/browser_check
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
    * Advanced Options (optional): Use custom request headers or cookies.
        * Headers: Defined headers override the default browser headers. For example, set the User Agent in the header to [identify Datadog scripts][1].
        * Cookies: Defined cookies are added to the default browser cookies. Set multiple cookies using the format `cookie1=<YOUR_COOKIE_1>; cookie2=<YOUR_COOKIE_2>`.
2. **Name**: The name of your browser test.
3. **Select your tags**: The tags attached to your browser test. Use the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` on the Synthetics page.
4. **Devices**: The devices to run your check on. Available devices are `Laptop Large`, `Tablet`, and `Mobile Small`.
5. **Locations**: The locations to run the test from. Many AWS locations from around the world are available. The full list is retrievable through the [Datadog API][2].
6. **How often should Datadog run the test?** Intervals are available between every five minutes to once per week.

### Alert conditions

An alert is triggered if any assertion fails for `<INSERT_NUMBER>` minutes from any `<INSERT_NUMBER>` of `<NUMBER_OF_CHOSEN>` locations.

### Notifications

To configure your notifications:

1. Enter a **message** for the browser test. This field allows standard [Markdown formatting][3]. Notification messages include the **message** defined in this section and information about which assertion failed and why.
2. Choose your [services][4] and/or team members to notify.
3. Click **Save Details and Record Test** to save your browser test.
4. Start to record your test.

## Record test

Tests can be only recorded from **[Google Chrome][5]**. To record your test, download the [Datadog Record Test extension for Google Chrome][6].

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Browser test record test" responsive="true" >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window in order to avoid sizing issues in the displayed window within Datadog's interface.
2. Click on **Start recording** to begin recording your browser test.
3. Your actions are recorded and used to create steps within your browser test scenario.
4. Use the actions available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_tests/browser_check_assertions.png" alt="Browser Test assertions" responsive="true" style="width:80%;">}}

    **Note**: **Your last browser test step must be an Assertion**, otherwise there is nothing to check.
5. Once you have finished your Scenario, click on **Save and Launch Test**.

### Actions
#### Assertion

{{< img src="synthetics/browser_tests/assertions_browser_check.png" alt="Assertion browser test" responsive="true" style="width:40%;">}}

Assertions allow you to check if an element, a content, or some text is available in the current page:

| Assertion                                               | Description                                                                                                                      |
| ----                                                    | ----                                                                                                                             |
| `Assert that an element is present on the page`         | Asserts that an element (such as a specific `span`, `div`, `h`, `a`, etc.) is present on the current page.                       |
| `Check an element's content`                            | Makes sure that a specific element is located or not on the current page.                                                        |
| `Assert that some text is present anywhere on the page` | Asserts that some specific text is present on the current page.                                                                  |
| `Assert that some text is nowhere on the page`          | Asserts that some specific text is **NOT** present on the current page.                                                          |
| `Check main page URL's content`                         | This takes the URL of the current page, and asserts whether a specific value (`string`, `number`, `regex`) is present within it. |

#### Navigation

The navigation action allow you to:

* Refresh the current page of the scenario.
* Follow a specific link.

#### Hover

This browser test step isn’t added through an actual hovering mechanism (otherwise each element you are hovering would be added as a step) but using a dedicated action with a click.

After selecting the Hover action, click on the element you want to choose to create a new step.

#### Variable

##### Create a variable

{{< img src="synthetics/browser_tests/setup_variable.png" alt="Setup Variable" responsive="true" style="width:80%;">}}

To create a variable, first give it a name then define its value from:

* **An Element**: Create a variable out of a `span`, `div`, etc. content by extracting the text of this element.
* **A Secure Credential**: Store and use secure credential through [Synthetics Settings][7])
* **A Pattern**:

| Pattern                 | Description                                         |
| ----                    | ---                                                 |
| `{{ numeric(n) }}`      | Generates a numeric string with n digits.           |
| `{{ alphabetic(n) }}`   | Generates an alphabetic string with n letters.      |
| `{{ alphanumeric(n) }}` | Generates an alphanumeric string with n characters. |

##### Use the variable

Once created, use your variable to set an input text on a form or search bar. Use the little hand on your variable box to create an input step:

{{< img src="synthetics/browser_tests/variable_input.gif" alt="Variable Input" responsive="true" style="width:80%;">}}

You can also use your variables in some assertions, including:

* Check an element’s content
* Assert text is present on the page
* Assert the page does not contain text
* Check main page URL's content

To use your variables in one of your assertions, hit *Use Variable* and select the variable you want to use:

{{< img src="synthetics/browser_tests/use_variable_in_assertion.png" alt="Use variable in assertion" responsive="true" style="width:40%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/identify_synthetics_bots
[2]: /api/?lang=bash#get-available-locations
[3]: http://daringfireball.net/projects/markdown/syntax
[4]: /integrations/#cat-notification
[5]: https://www.google.com/chrome
[6]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[7]: /sythetics/settings/#secure-credential
