---
title: Advanced Options for Mobile App Testing Steps
description: Configure advanced options for Mobile Test Steps
aliases:
- /mobile_testing/mobile_app_tests/advanced_options
- /mobile_app_testing/mobile_app_tests/advanced_options
further_reading:
- link: "https://www.datadoghq.com/blog/test-maintenance-best-practices/"
  tag: "Blog"
  text: "Best practices for maintaining end-to-end tests"
- link: "/synthetics/mobile_app_testing/mobile_app_tests/"
  tag: "Documentation"
  text: "Learn how to create mobile app tests"
- link: "/synthetics/mobile_app_testing/mobile_app_tests/steps/"
  tag: "Documentation"
  text: "Learn how to create steps in mobile app tests"
- link: "/data_security/synthetics/"
  tag: "Documentation"
  text: "Learn about Synthetic Monitoring Data Security"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Mobile Application Testing is not supported on this site.</div>
{{< /site-region >}}

## Overview

This page describes advanced options for Synthetic mobile app tests. 

## Locate an element

### Datadog algorithm

To ensure that your mobile app test does not validate an unexpected change to your mobile application's UI, use [assertions][1] in your test creation. Assertions allow you to define what is and what is not expected behavior associated with the test step journey. 

### User specified locator

By default, mobile app tests use the Datadog locator system. When a test searches for a specific element to interact with (for example, a checkout button), instead of looking at an element with a specific XPath or a specific CSS selector, the test uses several different points of reference to locate the element (for example, XPath, text, classes, and nearby elements). 

These points of reference become a set of locators, each of which uniquely define the element. You should only use custom selectors in edge cases because the Datadog locator system enables tests to be self-maintaining.

Custom selectors are created by performing a [step in the recorder][1] (such as a **tap**, **double tap**, or **open deep link**) on any element of your page. This specifies the kind of step that needs to be performed.

Optionally, under advanced options, use handlebars (`{{`) syntax to insert dynamic content. A pre-populated dropdown list of variables is shown:

{{< img src="mobile_app_testing/mobile_app_advanced_user_locator_2.png" alt="User specified locator field highlighting handlebar syntax with variables" style="width:70%">}}

## Timeout

If a mobile app test cannot locate an element, it retries the step for 60 seconds by default.

You can customize this timeout up to 60 seconds if you want your test to wait for less time to be able to find the step targeted element.

{{< img src="mobile_app_testing/timeout.png" alt="Wait for 30 seconds before declaring the test step as failed" style="width:50%" >}}

## Optional step

In some cases, such as in the event of a pop-up, you may want to make some steps optional. To configure this option, select **Continue with test if this step fails**. If the step fails after the amount of minutes specified on the timeout option, then the mobile app test moves on and executes the next step.

{{< img src="mobile_app_testing/failure_behavior.png" alt="Choose if the test should fail or continue if the test step fails" style="width:50%" >}}

Optionally, click **Consider entire test as failed if this step fails** to ensure important steps are performing.

## Prevent screenshot capture

You can prevent a step screenshot from being captured at test execution by clicking **Do not capture screenshot for this step**. 

{{< img src="mobile_app_testing/no_screenshots.png" alt="Do not capture a screenshot for this test step" style="width:50%" >}}

This is helpful to ensure no sensitive data gets featured in your test results. Use mindfully as it can make failure troubleshooting more difficult. For more information, see [Synthetic Monitoring Data Security][2].

## Subtests

The advanced options for [subtests][3] allow you to set the behavior of your mobile app test if the subtest fails.

{{< img src="mobile_app_testing/example_subtest.png" alt="Select a mobile test to add as a subtest" style="width:50%" >}}

### Set failure behavior

Click **Continue with test if this step fails** to ensure your mobile app test continues if the subtest fails.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile_app_testing/mobile_app_tests/steps/
[2]: /data_security/synthetics/
[3]: /mobile_testing/mobile_app_tests/steps/#subtests