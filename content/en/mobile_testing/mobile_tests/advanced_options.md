---
title: Advanced Options for Mobile Test Steps
kind: documentation
description: Configure advanced options for Mobile Test Steps
further_reading:
- link: "https://www.datadoghq.com/blog/test-maintenance-best-practices/"
  tag: "Blog"
  text: "Best practices for maintaining end-to-end tests"
- link: "/synthetics/mobile_tests/steps/"
  tag: "Documentation"
  text: "Learn more about Mobile Test Steps"
---

## Overview

This page describes advanced options for Synthetic mobile tests. 


## Locate an element

### Datadog algorithm

Flakiness is a pain point in end-to-end testing because tests occasionally fail when a frontend team implements changes, causing an identifier in your test to alert instead of an actual application issue.

To prevent flaky tests, Datadog uses an algorithm that leverages a set of locators to target elements in mobile tests. A small change in the UI may modify an element (for example, moving it to another location). The mobile test automatically locates the element again based on points of reference that were not affected by the change. 

When the test runs successfully, the mobile test recomputes (or "self heals") any broken locators with updated values, ensuring your tests do not break from simple UI updates and that your tests are automatically adapting to your application's UI. 

To ensure that your mobile test does not validate an unexpected change, use [assertions][5] in your test creation. Assertions allow you to define what is and what is not expected behavior associated with the test step journey. 

### User specified locator

By default, mobile tests use the Datadog locator system. When a test searches for a specific element to interact with (for example, a checkout button), instead of looking at an element with a specific XPath or a specific CSS selector, the test uses several different points of reference to locate the element (for example, XPath, text, classes, and nearby elements). 

These points of reference become a set of locators, each of which uniquely define the element. You should only use custom selectors in edge cases because the Datadog locator system enables tests to be self-maintaining.

Custom selectors are created by performing a step of interest in the recorder (such as a **click**, **hover**, or **assert**) on any element of your page. This specifies the kind of step that needs to be performed.

To use a specific identifier (for example, to click on the `nth` element in a dropdown menu regardless of what the content of the element is):

1. Record or manually add a [step][1] to your recording.
2. Click on the recorded step and click **Advanced options**.
3. Enter an XPath 1.0 selector or CSS class/ID under **User Specified Locator**, for example: `div`, `h1`, or `.hero-body`, for the HTML element.
4. Once you have defined an element, click **Test** to highlight the element in the recording to the right.

By default, the **If user specified locator fails, fail test** checkbox is selected. This means that if the defined locator fails, the test is considered a failure.

// replace

{{< img src="synthetics/browser_tests/advanced_options/css.mp4" alt="Test Highlighted Element" video=true >}}

You can decide to fall back on the regular browser test algorithm by clearing the **If user specified locator fails, fail test** box.

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="Fail test option" style="width:70%">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/actions/
[2]: /data_security/synthetics/
[3]: /synthetics/browser_tests/?tab=privacy#test-configuration
[4]: /synthetics/browser_tests/actions/#subtests
[5]: /synthetics/browser_tests/actions/#assertion