---
title: Advanced Options for Browser Testing Steps
description: Configure advanced options for Browser Test Steps
aliases:
  - /synthetics/guide/browser-tests-switch-tabs/
  - /synthetics/guide/browser-test-self-maintenance/
further_reading:
- link: "https://www.datadoghq.com/blog/browser-tests/"
  tag: "Blog"
  text: "User experience monitoring with Synthetic browser tests"
- link: "/synthetics/browser_tests/actions/"
  tag: "Documentation"
  text: "Learn more about Browser Test Steps"
---

## Overview

This page describes advanced options for Synthetic browser tests. 


## Locate an element

### Datadog algorithm

Flakiness is a pain point in end-to-end testing because tests occasionally fail when a frontend team implements changes, causing an identifier in your test to alert instead of an actual application issue.

To prevent flaky tests, Datadog uses an algorithm that leverages a set of locators to target elements in browser tests. A small change in the UI may modify an element (for example, moving it to another location). The browser test automatically locates the element again based on points of reference that were not affected by the change. 

When the test runs successfully, the browser test recomputes (or "self heals") any broken locators with updated values, ensuring your tests do not break from simple UI updates and that your tests are automatically adapting to your application's UI. 

To ensure that your browser test does not validate an unexpected change, use [assertions][5] in your test creation. Assertions allow you to define what is and what is not expected behavior associated with the test step journey. 

### User specified locator

By default, browser tests use the Datadog locator system. When a test searches for a specific element to interact with (for example, a checkout button), instead of looking at an element with a specific XPath or a specific CSS selector, the test uses several different points of reference to locate the element (for example, XPath, text, classes, and nearby elements). 

These points of reference become a set of locators, each of which uniquely define the element. You should only use custom selectors in edge cases because the Datadog locator system enables tests to be self-maintaining.

Custom selectors are created by performing a step of interest in the recorder (such as a **click**, **hover**, or **assert**) on any element of your page. This specifies the kind of step that needs to be performed.

To use a specific identifier (for example, to click on the `nth` element in a dropdown menu regardless of what the content of the element is):

1. Record or manually add a [step][1] to your recording.
2. Click on the recorded step and click **Advanced options**.
3. Enter an XPath 1.0 selector or CSS class/ID under **User Specified Locator**, for example: `div`, `h1`, or `.hero-body`, for the HTML element.
4. Optionally, handlebars syntax can be used to insert dynamic content such as variables:

{{< img src="synthetics/browser_tests/advanced_options/advanced_user_locator.png" alt="User specified locator field highlighting handlebar syntax with variables" style="width:70%">}}

5. Once you have defined an element, click **Test** to highlight the element in the recording to the right.

By default, the **If user specified locator fails, fail test** checkbox is selected. This means that if the defined locator fails, the test is considered a failure.

{{< img src="synthetics/browser_tests/advanced_options/css.mp4" alt="Test Highlighted Element" video=true >}}

You can decide to fall back on the regular browser test algorithm by clearing the **If user specified locator fails, fail test** box.

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="Fail test option" style="width:70%">}}


## Timeout

If a browser test cannot locate an element, it retries the step for 60 seconds.

You can decide to decrease or increase this time out up to 300 seconds if you want your test to wait for less or more time to be able to find the step targeted element.

{{< img src="synthetics/browser_tests/advanced_options/time_before_fail.png" alt="Time before fail" style="width:50%">}}

## Optional step

In some cases, such as in the event of a pop-up, you may want to make some steps optional. To configure this option, select **Allow this step to fail**. If the step fails after the amount of minutes specified on the timeout option (60 seconds by default), then the test moves on and executes the next step.

{{< img src="synthetics/browser_tests/advanced_options/timeout.png" alt="Timeout" style="width:25%">}}

## Prevent screenshot capture

You can prevent a step screenshot from being captured at test execution. This is helpful to ensure no sensitive data gets featured in your test results. Use mindfully as it can make failure troubleshooting more difficult. For more information, see [Synthetic Monitoring Data Security][2].

{{< img src="synthetics/browser_tests/advanced_options/screenshot_capture_option.png" alt="Screenshot capture option" style="width:50%">}}

**Note:** This feature is also available at the global test level as an [advanced option][3] in your browser test configuration.

## Subtests

The advanced options for [subtests][4] allow you to choose where you want your subtest to be played and set the behavior of your browser test if the subtest fails.

{{< img src="synthetics/browser_tests/advanced_options/subtest_advanced.png" alt="Advanced options for subtests in browser tests" style="width:60%">}}

### Set the subtest window

* **Main (default)**: Subtest is played in your main window, in sequence with other steps.
* **New**: Subtest is played in a new window, which is closed at the end of the subtest. This means the window cannot be reused.
* **Specific window**: Subtest is played in a numbered window, which can be reused by other subtests.

Opening your subtest in the main window means that your subtest is the continuation of your main test as it uses the URL from the previous step. Opening your subtest in a new window, or in a specific window, means that the test starts running from the subtest start URL.

### Set failure behavior

Click **Continue with test if this step fails** and **Consider entire test as failed if this step fails** to ensure your browser test continues if the subtest fails, or fails entirely if the subtest fails.

### Override variables in subtests

To override a variable value in a browser test subtest, name the variable in the subtest and use the same variable name in the parent test, and the browser test overrides the subtest value.

For more information, see [Browser Test Steps][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/actions/
[2]: /data_security/synthetics/
[3]: /synthetics/browser_tests/?tab=privacy#test-configuration
[4]: /synthetics/browser_tests/actions/#subtests
[5]: /synthetics/browser_tests/actions/#assertion