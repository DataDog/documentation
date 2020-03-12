---
title: Browser Test Actions
kind: documentation
description: Record Actions for a Synthetics Browser Test
further_reading:
- link: "synthetics/browser_tests/advanced_options"
  tag: "Documentation"
  text: "Learn how to configure advanced options for Actions"
---

Actions are a series of steps that you can record for a browser test, which you can then edit or build on. You can also configure certain actions with [advanced options][1].

**Note**: The default timeout for each step is approximately 60 seconds. You can override the timeout with [advanced options][2].

## Click

[Datadog’s extension][4] automatically records clicks on your page. 

Specify the type of click you want your browser test to perform at execution time:

{{< img src="synthetics/browser_tests/browser_test_click_step.mp4" alt="Browser Test Click Step" video="true" width="60%">}}

Choose from:

* Primary click (corresponds to a left click)
* Double click
* Contextual click (corresponds to a right click)

## Assertion

{{< img src="synthetics/browser_tests/browser_test_assertions.png" alt="Browser Test Assertion"  style="width:40%;">}}

Assertions allow you to validate that your browser test is in the state you expect it to be in, at any given point of a simulated user journey. This is why you must end your browser tests by an assertion to confirm it ended up in an expected state.

Some assertions are performed on the active page. **Active page** refers to the page that was last interacted with, using a click or an assertion on a page element for instance.

| Assertion                                                 | Description                                                                                                                                                                             |
|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Test an element's content`                               | Selects an element and checks if it contains a specific value. For instance, you could select a `div` and check whether it contains the word "hello".                                   |
| `Test that some text is present on the active page`       | Asserts that some specific text is present on the current page.                                                                                                                         |
| `Test that some text is not present on the active page` | Asserts that some specific text is **NOT** present on the current page.                                                                                                                 |
| `Test the content of the URL of the active page`          | Takes the URL of the last page that was interacted with, then asserts whether a specific value (`string`, `number`, `regex`) is present within it.                                      |
| `Test that an element is present on the active page`      | Asserts that an element (such as a specific `span`, `div`, `h`, `a`, etc.) is present on the current page.                                                                              |
| `Test that an email was received`                         | Asserts that an email was sent and whether specific values (`string`, `number`, `regex`) are present within the email subject or body. This assertion leverages [email variables][3]. |
| `Test your UI with custom JavaScript`                         | Test a custom assertion using your own JavaScript scripts. By default the assertion is done on the active page. If you want your JavaScript function to leverage a specific page element, you can select it using **Target Element** and then refer to it as the `element` parameter in your function. |
| `Test a downloaded file`                         | Perform verifications on files downloaded in previous steps. You can assert: the file name, size, and MD5 value. |

[Advanced options][1] are also available for assertions.

## Navigation

The navigation action allows you to:

* Refresh the current page of the scenario.
* Follow a specific link. In the **Enter link URL** box, you must prepend your URLs with `http` or `https`.
* Go to an email and click on a link. This step allows you to access your Synthetics mail inbox after creating an [email variable][3].
* Choose the email you are interested in and click the link you want your browser test to click on.

## Special Actions

[The provided Datadog extension][4] records most actions. However, some actions—such as hover, press key, and scroll—are not recorded automatically. Explicitly add a step for them using the **Special Actions** menu located at the top left-hand corner of the recorder.

### Hover

This browser test step isn’t added through an actual hovering mechanism (otherwise each element you are hovering would be added as a step) but using a dedicated action with a click.

After selecting the Hover action, click on the element you want to choose to create a new step.

### Press key

You can simulate users entering keystrokes using **Press Key** steps. The keys below can be recorded using the [Datadog extension][4]:

* Enter
* Arrows (up, down, right, and left)
* Tab (outside a form)
* Escape 
* Backspace

To press keys that are not being automatically recorded, specify which values need to be pressed in the value box of the **Press Key** special action:

{{< img src="synthetics/browser_tests/browser_test_press_key.png" alt="Browser Test Press Key"  style="width:60%;">}}

The below modifiers can also be applied to the inputted value:

* Alt
* Control
* Meta
* Shift

### Scroll

Your browser test automatically scrolls to the element it needs to interact with. Consequently, in most cases, you do not need to manually add a scroll step. The scroll step should only be added when needed to trigger an additional network request, such as in an infinite scroll.

{{< img src="synthetics/browser_tests/browser_test_scroll_step.png" alt="Browser Test Scroll Step"  style="width:60%;">}}

You need to specify the number of pixels your browser test should scroll vertically or horizontally.

By default, the scroll step scrolls on the whole page. If you need to scroll on a specific element (for instance a specific `<div>`), use the **Target Element** option to select the element you want your browser test to scroll on.

## Upload

You can record the uploading of files as an action. To record an upload step you can:

* Either open your desktop from the browser,
* Or drag and drop your file in the recording iframe.

{{< img src="synthetics/browser_tests/upload_file_step.png" alt="Create an upload file step"  style="width:50%;">}}

This is limited to 10 files, with a limit of 5MB each.

## Variable

### Create a variable

{{< img src="synthetics/browser_tests/browser_test_variables.mp4" alt="Setup Variable" video="true"  width="60%">}}

To create a variable, first give it a name then define its value from:

* **An Element**: Create a variable out of a `span`, `div`, etc. content by extracting the text of this element.
* **JavaScript**: Generate custom variables using your own JavaScript scripts. By default the step is being performed at the page level. If you want your JavaScript function to leverage a specific page element, you can select it using **Target Element** and then refer to it as the `element` parameter in your function.
* **A Global Variable**: Store and use global variables through [Synthetics Settings][6].
* **An Email**: Generate a random Synthetics email address that can be used in your test steps to assert if an email was correctly sent or to perform actions over the sent email content (e.g. click a confirmation link).
* **A Pattern**:

| Pattern                 | Description                                         |
|-------------------------|-----------------------------------------------------|
| `{{ numeric(n) }}`      | Generates a numeric string with n digits.           |
| `{{ alphabetic(n) }}`   | Generates an alphabetic string with n letters.      |
| `{{ alphanumeric(n) }}` | Generates an alphanumeric string with n characters. |

### Use the variable

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

Alternatively, you can record a step inputting `{{ <YOUR_VARIABLE> }}` in the desired field. 

### Use variables in JavaScript steps

If you need to use variables in JavaScript steps (assertion or variable), use `vars.<YOUR_VARIABLE>`.

## Wait

By default, Datadog waits for a page to be fully loaded before performing an action or a next step—with a timeout after 60 seconds. In some cases, however, you may wish to set a custom waiting time. For instance, if you know that a page or a page element is taking more than 60 seconds to load, you can leverage the wait step in order to extend that default timeout. If you choose to use this functionality, the value for your wait step must not exceed 300 seconds.

**Note**: This additional time is systematically added to **each run** of your browser test scenario.

## Subtests

You can run browser tests within other browser tests, up to two levels of nesting. [Advanced options][7] also allow you to choose where you want your subtest to be played.

**Note**: If it does not make sense for you to run your subtest independently, you can pause it. It will continue to be called as part of your main test, but it will not be executed individually.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/advanced_options
[2]: /synthetics/browser_tests/advanced_options/#timeout
[3]: /synthetics/browser_tests/#create-a-variable
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[5]: /synthetics/browser_tests/advanced_options/#custom-selector
[6]: /synthetics/settings
[7]: /synthetics/browser_tests/advanced_options/#subtests
