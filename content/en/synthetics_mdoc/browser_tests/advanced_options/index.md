---
title: Advanced Options for Browser Testing Steps
description: Configure advanced options for Browser Test Steps
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Browser Testing > Advanced Options
  for Browser Testing Steps
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/index.html
---

# Advanced Options for Browser Testing Steps

## Overview{% #overview %}

This page describes advanced options for Synthetic browser tests.

## Locate an element{% #locate-an-element %}

### Datadog algorithm{% #datadog-algorithm %}

Flakiness is a pain point in end-to-end testing because tests occasionally fail when a frontend team implements changes, causing an identifier in your test to alert instead of an actual application issue.

To prevent flaky tests, Datadog uses an algorithm that leverages a set of locators to target elements in browser tests. A small change in the UI may modify an element (for example, moving it to another location). The browser test automatically locates the element again based on points of reference that were not affected by the change.

When the test runs successfully, the browser test recomputes (or "self heals") any broken locators with updated values, ensuring your tests do not break from simple UI updates and that your tests are automatically adapting to your application's UI.

To ensure that your browser test does not validate an unexpected change, use [assertions](https://docs.datadoghq.com/synthetics/browser_tests/actions/#assertion) in your test creation. Assertions allow you to define what is and what is not expected behavior associated with the test step journey.

### User specified locator{% #user-specified-locator %}

By default, browser tests use the Datadog locator system. When a test searches for a specific element to interact with (for example, a checkout button), instead of looking at an element with a specific XPath or a specific CSS selector, the test uses several different points of reference to locate the element (for example, XPath, text, classes, and nearby elements).

These points of reference become a set of locators, each of which uniquely define the element. You should only use custom selectors in edge cases because the Datadog locator system enables tests to be self-maintaining.

Custom selectors are created by performing a step of interest in the recorder (such as a **click**, **hover**, or **assert**) on any element of your page. This specifies the kind of step that needs to be performed.

To use a specific identifier (for example, to click on the `nth` element in a dropdown menu regardless of what the content of the element is):

1. Record or manually add a [step](https://docs.datadoghq.com/synthetics/browser_tests/actions/) to your recording.
1. Click on the recorded step and click **Advanced options**.
1. Enter an XPath 1.0 selector or CSS class/ID under **User Specified Locator**, for example: `div`, `h1`, or `.hero-body`, for the HTML element.
1. Optionally, use handlebars (`{{`) syntax to insert dynamic content. A pre-populated dropdown list of variables is shown:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/advanced_options/advanced_user_locator_2.ccebad03ed0f0ce3f70449b87a760162.png?auto=format"
   alt="User specified locator field highlighting handlebar syntax with variables" /%}
Once you have defined an element, click **Highlight** to highlight the element in the recording to the right.
By default, the **If user specified locator fails, fail test** checkbox is selected. This means that if the defined locator fails, the test is considered a failure.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/browser_tests/advanced_options/css_2.mp4" /%}

You can decide to fall back on the regular browser test algorithm by clearing the **If user specified locator fails, fail test** box.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/advanced_options/fail_test.ecdf98b954ddf7ee15ead31d72957e9c.png?auto=format"
   alt="Fail test option" /%}

## Timeout{% #timeout %}

If a browser test cannot locate an element, it retries the step for 60 seconds.

You can decide to decrease or increase this time out up to 300 seconds if you want your test to wait for less or more time to be able to find the step targeted element.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/advanced_options/time_before_fail.e575a6ca42f22f297bc8135df9abaff7.png?auto=format"
   alt="Time before fail" /%}

## Optional step{% #optional-step %}

In some cases, such as in the event of a pop-up, you may want to make some steps optional. To configure this option, select **Allow this step to fail**. If the step fails after the amount of minutes specified on the timeout option (60 seconds by default), then the test moves on and executes the next step.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/advanced_options/timeout.5a71ef45a66a3b9e313657534c8bf79c.png?auto=format"
   alt="Timeout" /%}

## Exit on success{% #exit-on-success %}

Configure this option to exit the test after a successful step completion. This prevents running unnecessary steps and avoids marking the test as a failure.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/advanced_options/exit_on_success_browser.3c1285adcdd68825187bec24d71fc848.png?auto=format"
   alt="Exit on success" /%}

## Always run this step{% #always-run-this-step %}

Configure this option to run this step even if the previous steps have failed. This can be useful for clean-up tasks when you want subsequent steps to proceed.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/advanced_options/always_run_step.20d782d1fcf866c45606874072399037.png?auto=format"
   alt="Always run step even if previous steps have failed" /%}

## Prevent screenshot capture{% #prevent-screenshot-capture %}

You can prevent a step screenshot from being captured at test execution. This is helpful to ensure no sensitive data gets featured in your test results. Use mindfully as it can make failure troubleshooting more difficult. For more information, see [Synthetic Monitoring Data Security](https://docs.datadoghq.com/data_security/synthetics/).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/advanced_options/screenshot_capture_option.d0423868271bee09ebda64f70b77a45e.png?auto=format"
   alt="Screenshot capture option" /%}

**Note:** This feature is also available at the global test level as an [advanced option](https://docs.datadoghq.com/synthetics/browser_tests/?tab=privacy#test-configuration) in your browser test configuration.

## Subtests{% #subtests %}

The advanced options for [subtests](https://docs.datadoghq.com/synthetics/browser_tests/actions/#subtests) allow you to choose where you want your subtest to be played and set the behavior of your browser test if the subtest fails.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/advanced_options/subtest_advanced.b566a7a2ffb184ec476ff8e979749013.png?auto=format"
   alt="Advanced options for subtests in browser tests" /%}

### Set the subtest window{% #set-the-subtest-window %}

- **Main (default)**: Subtest is played in your main window, in sequence with other steps.
- **New**: Subtest is played in a new window, which is closed at the end of the subtest. This means the window cannot be reused.
- **Specific window**: Subtest is played in a numbered window, which can be reused by other subtests.

Opening your subtest in the main window means that your subtest is the continuation of your main test as it uses the URL from the previous step. Opening your subtest in a new window, or in a specific window, means that the test starts running from the subtest start URL.

### Set failure behavior{% #set-failure-behavior %}

Click **Continue with test if this step fails** and **Consider entire test as failed if this step fails** to ensure your browser test continues if the subtest fails, or fails entirely if the subtest fails.

### Override variables in subtests{% #override-variables-in-subtests %}

To override a variable value in a browser test subtest, name the variable in the subtest and use the same variable name in the parent test, and the browser test overrides the subtest value.

For more information, see [Browser Test Steps](https://docs.datadoghq.com/synthetics/browser_tests/actions/#subtests).

## Further Reading{% #further-reading %}

- [User experience monitoring with Synthetic browser tests](https://www.datadoghq.com/blog/browser-tests/)
- [Learn more about Browser Test Steps](https://docs.datadoghq.com/synthetics/browser_tests/actions/)
