---
title: Browser Test
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

{{< img src="synthetics/browser_tests/using_variables_browser.mp4" alt="Using Variables in Browser Tests" video="true" responsive="true" width="80%" >}}

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

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Browser test record test" responsive="true" >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window in order to avoid sizing issues in the displayed window within Datadog's interface.
2. Click on **Start recording** to begin recording your browser test.
3. Your actions are recorded and used to create steps within your browser test scenario. 
4. Use the actions available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_tests/browser_test_step.png" alt="Browser Test steps" responsive="true" style="width:80%;">}}

    **Note**: **Your last browser test step must be an Assertion**, otherwise there is nothing to check.
5. Once you have finished your Scenario, click on **Save and Launch Test**.

## Actions
### Assertion

{{< img src="synthetics/browser_tests/browser_test_assertions.png" alt="Assertion browser test" responsive="true" style="width:40%;">}}

Assertions allow you to check whether an element, some content, or some text is available on the current page. You can also check whether a specific email was sent.
The default timeout for each step is approximately 60 seconds. You can override the timeout for `Assert that an element is present on the page` by expanding the step and changing the `Timeout` value (in seconds).

| Assertion                                                 | Description                                                                                                                                                                            |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Test that an element is present on the active page`      | Asserts that an element (such as a specific `span`, `div`, `h`, `a`, etc.) is present on the current page.                                                                             |
| `Test an element's content`                               | Selects an element and checks if it contains a specific value. For instance, you could select a `div` and check whether it contains the word "hello".                                  |
| `Test that some text is present on the active page`       | Asserts that some specific text is present on the current page.                                                                                                                        |
| `Assert that some text is not present on the active page` | Asserts that some specific text is **NOT** present on the current page.                                                                                                                |
| `Test the content of the URL of the active page`          | Takes the URL of the last page that was interacted with, then asserts whether a specific value (`string`, `number`, `regex`) is present within it.                                     |
| `Test that an email was received`                         | Asserts that an email was sent and whether specific values (`string`, `number`, `regex`) are present within the email subject or body. This assertion leverages  [email variables][10]. |

*Advanced options* section for assertions allows you to specify a custom locator: an X-path or a CSS class/ID that you want to use to perform the element selection for any HTML element. For example, `div`, `h1`, or `.hero-body`. Once you have defined an element, hit **Test** to highlight the element in the recording on the right. If the defined locator fails, by default the test is considered as failed. You can decide to fallback on the regular Browser tests algorithm by unticking the `If user specified locator fails, fail test` box.

### Navigation

The navigation action allow you to:

* Refresh the current page of the scenario.
* Follow a specific link. In the "Enter link URL" box, you must prepend your URLs with `http` or `https`.
* Go to an email and click on a link. This step allows you to access your Synthetics mail inbox after creating an [email variable][10]. Choose the email you are interested in and click the link you want your browser test to click on.

### Hover

This browser test step isn’t added through an actual hovering mechanism (otherwise each element you are hovering would be added as a step) but using a dedicated action with a click.

After selecting the Hover action, click on the element you want to choose to create a new step.

### Variable

#### Create a variable

{{< img src="synthetics/browser_tests/browser_test_variables.mp4" alt="Setup Variable" video="true" responsive="true" width="60%">}}

To create a variable, first give it a name then define its value from:

* **An Element**: Create a variable out of a `span`, `div`, etc. content by extracting the text of this element.
* **A Global Variable**: Store and use global variables through [Synthetics Settings][11]).
* **An Email**: Generate a random Synthetics email address that can be used in your test steps to assert if an email was correctly sent or to perform actions over the sent email content (e.g. click a confirmation link).
* **A Pattern**:

| Pattern                 | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `{{ numeric(n) }}`      | Generates a numeric string with n digits.           |
| `{{ alphabetic(n) }}`   | Generates an alphabetic string with n letters.      |
| `{{ alphanumeric(n) }}` | Generates an alphanumeric string with n characters. |

#### Use the variable

Once created, use your variable to set an input text on a form or search bar. Use the little hand on your variable box to create an input step:

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="Variable Input" video="true" responsive="true" width="80%" >}}

You can also use your variables in some assertions, including:

* Check an element’s content
* Assert text is present on the page
* Assert the page does not contain text
* Check main page URL's content
* Check that an email was received

To use your variables in one of your assertions, hit *Use Variable* and select the variable you want to use:

{{< img src="synthetics/browser_tests/use_variable_in_assertion.png" alt="Use variable in assertion" responsive="true" style="width:40%;">}}

### Wait

By default, Datadog waits for a page to be fully loaded before performing an action or a next step—with a timeout after 60 seconds. In some cases, however, you may wish to set a custom waiting time. For instance, if you know that a page or a page element is taking more than 60 seconds to load, you can leverage the wait step in order to extend that default timeout. If you choose to use this functionality, the value for your wait step must not exceed 300 seconds.

**Note**: This additional time is systematically added to **each run** of your browser test scenario.

### Subtests

You can run browser tests within other browser tests:

{{< img src="synthetics/browser_tests/browser_test_subtest.mp4" alt="Browser test subtest" video="true" responsive="true" width="40%" >}}

Advanced options also allow you to choose where you want your subtest to be played:

* **Main** (default): Subtest is played in your main tab, in sequence with other steps.
* **New**: Subtest is played in a new tab, which is closed at the end of the subtest i.e. the tab cannot be reused.
* **Specific tab**: Subtest is played in a numbered tab, which can be reused by other subtests.

Opening your subtest in the main tab means that your subtest is the continuation of your main test: it uses the URL from the previous step. Opening your subtest in a new tab, or in a specific tab, means that the test starts running from the subtest start URL.

**Note**: If it does not make sense for you to run your subtest independently, you can pause it. It will continue to be called as part of your main test, but it will not be executed individually.

### Upload

You can record the uploading of files as an action. This is limited to 10 files, with a limit of 5MB each.

{{< img src="synthetics/browser_tests/upload_file_step.png" alt="Create an upload file step" responsive="true" style="width:50%;">}}

## Test failure and errors

A test is considered `FAILED` if it does not satisfy its assertions or if the request failed for another reason. You can view specific browser test errors by clicking on the error in the step results.

Common failure reasons include:

| Error                                | Description                                                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
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
[10]: /synthetics/browser_tests/#create-a-variable
[11]: /synthetics/settings/#secure-credential
