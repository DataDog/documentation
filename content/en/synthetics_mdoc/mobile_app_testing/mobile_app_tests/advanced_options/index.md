---
title: Advanced Options for Mobile App Testing Steps
description: Configure advanced options for Mobile Test Steps
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Mobile Application Testing and
  Monitoring > Advanced Options for Mobile App Testing Steps
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/advanced_options/index.html
---

# Advanced Options for Mobile App Testing Steps

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com

{% alert level="warning" %}
This product is not supported for your selected [Datadog site](https://docs.datadoghq.com/getting_started/site). ().
{% /alert %}

{% /callout %}

## Overview{% #overview %}

This page describes advanced options for Synthetic mobile app tests.

## Locate an element{% #locate-an-element %}

### Datadog algorithm{% #datadog-algorithm %}

To ensure that your mobile app test does not validate an unexpected change to your mobile application's UI, use [assertions](https://docs.datadoghq.com/mobile_app_testing/mobile_app_tests/steps/) in your test creation. Assertions allow you to define what is and what is not expected behavior associated with the test step journey.

### User specified locator{% #user-specified-locator %}

By default, mobile app tests use the Datadog locator system. When a test searches for a specific element to interact with (for example, a checkout button), instead of looking at an element with a specific XPath or a specific CSS selector, the test uses several different points of reference to locate the element (for example, XPath, text, classes, and nearby elements).

These points of reference become a set of locators, each of which uniquely define the element. You should only use custom selectors in edge cases because the Datadog locator system enables tests to be self-maintaining.

Custom selectors are created by performing a [step in the recorder](https://docs.datadoghq.com/mobile_app_testing/mobile_app_tests/steps/) (such as a **tap**, **double tap**, or **open deep link**) on any element of your page. This specifies the kind of step that needs to be performed.

Optionally, under advanced options, use handlebars (`{{`) syntax to insert dynamic content. A pre-populated dropdown list of variables is shown:

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/mobile_app_advanced_user_locator_2.8efe693269a3396d957f74a19e1bc2be.png?auto=format"
   alt="User specified locator field highlighting handlebar syntax with variables" /%}

## Timeout{% #timeout %}

If a mobile app test cannot locate an element, it retries the step for 60 seconds by default.

You can customize this timeout up to 60 seconds if you want your test to wait for less time to be able to find the step targeted element.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/timeout.2d3dda52fcc38357094b6a50e61ab7ed.png?auto=format"
   alt="Wait for 30 seconds before declaring the test step as failed" /%}

## Optional step{% #optional-step %}

In some cases, such as in the event of a pop-up, you may want to make some steps optional. To configure this option, select **Continue with test if this step fails**. If the step fails after the amount of minutes specified on the timeout option, then the mobile app test moves on and executes the next step.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/failure_behavior.343ef53a013a5dcfd5ebb86c9f2aa797.png?auto=format"
   alt="Choose if the test should fail or continue if the test step fails" /%}

Optionally, click **Consider entire test as failed if this step fails** to ensure important steps are performing.

## Prevent screenshot capture{% #prevent-screenshot-capture %}

You can prevent a step screenshot from being captured at test execution by clicking **Do not capture screenshot for this step**.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/no_screenshots.ffefb74855d735851b5ecca76d9c3112.png?auto=format"
   alt="Do not capture a screenshot for this test step" /%}

This is helpful to ensure no sensitive data gets featured in your test results. Use mindfully as it can make failure troubleshooting more difficult. For more information, see [Synthetic Monitoring Data Security](https://docs.datadoghq.com/data_security/synthetics/).

## Exit on success{% #exit-on-success %}

Configure this option to exit the test after a successful step completion. This prevents running unnecessary steps and avoids marking the test as a failure.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/exit_on_success.d5284996153d171049a5e66e5616077c.png?auto=format"
   alt="Stop the test and mark it as passed" /%}

## Subtests{% #subtests %}

The advanced options for [subtests](https://docs.datadoghq.com/mobile_testing/mobile_app_tests/steps/#subtests) allow you to set the behavior of your mobile app test if the subtest fails.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/example_subtest.7f9c7672305fcbaafcb9a34246117f78.png?auto=format"
   alt="Select a mobile test to add as a subtest" /%}

### Set failure behavior{% #set-failure-behavior %}

Click **Continue with test if this step fails** to ensure your mobile app test continues if the subtest fails.

## Further reading{% #further-reading %}

- [Best practices for maintaining end-to-end tests](https://www.datadoghq.com/blog/test-maintenance-best-practices/)
- [Learn how to create mobile app tests](https://docs.datadoghq.com/synthetics/mobile_app_testing/)
- [Learn how to create steps in mobile app tests](https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/steps/)
- [Learn about Synthetic Monitoring Data Security](https://docs.datadoghq.com/data_security/synthetics/)
