---
title: Browser Test Actions
kind: documentation
description: Record Actions for a Synthetics Browser Test
aliases:
- /synthetics/browser_tests
further_reading:
- link: "synthetics/browser_tests/advance_options"
  tag: "Documentation"
  text: "Learn how to configure advance options for Actions"
---

## Overview

Actions are a series of steps that you can record for a Browser Test, which you can then edit or build on. Certain actions can also be configured with [advance options][1].

### Assertion

{{< img src="synthetics/browser_tests/browser_test_assertions.png" alt="Browser Test Assertion"  style="width:40%;">}}

Assertions allow you to check whether an element, some content, or some text is available on the current page. You can also check whether a specific email was sent.

The default timeout for each step is approximately 60 seconds. You can override the [timeout][2] for `Assert that an element is present on the page` by expanding the step and changing the `Timeout` value (in seconds).

| Assertion                                                 | Description                                                                                                                                                                             |
|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Test that an element is present on the active page`      | Asserts that an element (such as a specific `span`, `div`, `h`, `a`, etc.) is present on the current page.                                                                              |
| `Test an element's content`                               | Selects an element and checks if it contains a specific value. For instance, you could select a `div` and check whether it contains the word "hello".                                   |
| `Test that some text is present on the active page`       | Asserts that some specific text is present on the current page.                                                                                                                         |
| `Assert that some text is not present on the active page` | Asserts that some specific text is **NOT** present on the current page.                                                                                                                 |
| `Test the content of the URL of the active page`          | Takes the URL of the last page that was interacted with, then asserts whether a specific value (`string`, `number`, `regex`) is present within it.                                      |
| `Test that an email was received`                         | Asserts that an email was sent and whether specific values (`string`, `number`, `regex`) are present within the email subject or body. This assertion leverages  [email variables][10]. |

[Advanced options][3] for assertions allows you to specify a custom locator: an X-path or a CSS class/ID that you want to use to perform the element selection for any HTML element. For example, `div`, `h1`, or `.hero-body`. Once you have defined an element, hit **Test** to highlight the element in the recording on the right. If the defined locator fails, by default the test is considered as failed. You can decide to fallback on the regular Browser tests algorithm by unticking the [`If user specified locator fails, fail test`][4] box.

### Navigation

The navigation action allows you to:

* Refresh the current page of the scenario.
* Follow a specific link. In the "Enter link URL" box, you must prepend your URLs with `http` or `https`.
* Go to an email and click on a link. This step allows you to access your Synthetics mail inbox after creating an [email variable][5]. Choose the email you are interested in and click the link you want your browser test to click on.

### Hover

This browser test step isn’t added through an actual hovering mechanism (otherwise each element you are hovering would be added as a step) but using a dedicated action with a click.

After selecting the Hover action, click on the element you want to choose to create a new step.

### Upload

You can record the uploading of files as an action. To record an upload step you can:

* Either open your desktop from the browser,
* Or drag and drop your file in the recording iframe.

{{< img src="synthetics/browser_tests/upload_file_step.png" alt="Create an upload file step"  style="width:50%;">}}

This is limited to 10 files, with a limit of 5MB each.

### Variable

#### Create a variable

{{< img src="synthetics/browser_tests/browser_test_variables.mp4" alt="Setup Variable" video="true"  width="60%">}}

To create a variable, first give it a name then define its value from:

* **An Element**: Create a variable out of a `span`, `div`, etc. content by extracting the text of this element.
* **A Global Variable**: Store and use global variables through [Synthetics Settings][6]).
* **An Email**: Generate a random Synthetics email address that can be used in your test steps to assert if an email was correctly sent or to perform actions over the sent email content (e.g. click a confirmation link).
* **A Pattern**:

| Pattern                 | Description                                         |
|-------------------------|-----------------------------------------------------|
| `{{ numeric(n) }}`      | Generates a numeric string with n digits.           |
| `{{ alphabetic(n) }}`   | Generates an alphabetic string with n letters.      |
| `{{ alphanumeric(n) }}` | Generates an alphanumeric string with n characters. |

#### Use the variable

Once created, use your variable to set an input text on a form or search bar. Use the little hand on your variable box to create an input step:

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="Variable Input" video="true"  width="80%" >}}

You can also use your variables in some assertions, including:

* Check an element’s content
* Assert text is present on the page
* Assert the page does not contain text
* Check main page URL's content
* Check that an email was received

To use your variables in one of your assertions, hit *Use Variable* and select the variable you want to use:

{{< img src="synthetics/browser_tests/use_variable_in_assertion.png" alt="Use variable in assertion"  style="width:40%;">}}

### Wait

By default, Datadog waits for a page to be fully loaded before performing an action or a next step—with a timeout after 60 seconds. In some cases, however, you may wish to set a custom waiting time. For instance, if you know that a page or a page element is taking more than 60 seconds to load, you can leverage the wait step in order to extend that default timeout. If you choose to use this functionality, the value for your wait step must not exceed 300 seconds.

**Note**: This additional time is systematically added to **each run** of your browser test scenario.

### Subtests

You can run browser tests within other browser tests:

{{< img src="synthetics/browser_tests/browser_test_subtest.mp4" alt="Browser test subtest" video="true"  width="40%" >}}

[Advanced options][7] also allow you to choose where you want your subtest to be played:

* **Main** (default): Subtest is played in your main tab, in sequence with other steps.
* **New**: Subtest is played in a new tab, which is closed at the end of the subtest i.e. the tab cannot be reused.
* **Specific tab**: Subtest is played in a numbered tab, which can be reused by other subtests.

Opening your subtest in the main tab means that your subtest is the continuation of your main test: it uses the URL from the previous step. Opening your subtest in a new tab, or in a specific tab, means that the test starts running from the subtest start URL.

**Note**: If it does not make sense for you to run your subtest independently, you can pause it. It will continue to be called as part of your main test, but it will not be executed individually.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/advance_options
[2]: /synthetics/browser_tests/advance_options/#timeout
[3]: /synthetics/browser_tests/advance_options/#custom-selector
[4]: /synthetics/browser_tests/advance_options/#optional-step
[5]: /synthetics/browser_tests/#create-a-variable
[6]: /synthetics/settings/#secure-credential
[7]: /synthetics/browser_tests/advance_options/#subtests
