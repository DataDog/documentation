---
title: Advanced Options for Browser Test Steps
kind: documentation
description: Configure advanced options for Browser Test Steps
further_reading:
- link: "/synthetics/browser_tests/actions/"
  tag: "Documentation"
  text: "Learn more about Browser Test Steps"
---

## User specified locator

By default, [browser tests][1] use the Datadog locator system. It is recommended to only use custom selectors in edge cases as the Datadog locator system is what allows tests to be self-maintaining.

Custom selectors are created by performing a step of interest in the recorder (**click**, **hover**, **assert**, etc.) on any element of your page. This specifies the kind of step that needs to be performed.

To specify your custom locator:

* Record or manually add a [step][2] to your recording.
* Click on the recorded step and click **Advanced options**.
* The HTML element can then be selected either with an X-path or with a CSS class/ID, for example: `div`, `h1`, or `.hero-body`.
* Once you have defined an element, click **Test** to highlight the element in the recording on the right.

{{< img src="synthetics/browser_tests/advanced_options/css.gif" alt="Test Highlighted Element">}}

By default the box **If user specified locator fails, fail test** is selected. This means that, by default, if the defined locator fails, the test is considered a failure.

You can decide to fall back on the regular browser test algorithm by deselecting the **If user specified locator fails, fail test** box.

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="Fail test option" style="width:70%">}}

## Timeout

If a browser test is not able to locate an element, by default it retries the step for 60 seconds.

You can decide to decrease or increase this time out up to 300 seconds if you want your test to wait for less or more time to be able to find the step targeted element.

{{< img src="synthetics/browser_tests/advanced_options/time_before_fail.png" alt="Time before fail" style="width:50%">}}

## Optional step

In some cases, such as in the event of a pop-up, you may want to make some steps optional. To configure this option, select **Allow this step to fail**. If the step fails after the amount of minutes specified on the timeout option (60 seconds by default), then the test will move on and execute the next step.

{{< img src="synthetics/browser_tests/advanced_options/timeout.png" alt="Timeout" style="width:25%">}}

## Prevent screenshot capture

You can prevent a step screenshot from being captured at test execution. This can be helpful to ensure no sensitive data gets featured in your test results. It however needs to be use mindfully as it can make failure troubleshooting way more challenging. You can read more about our security recommendations [here][3].

{{< img src="synthetics/browser_tests/advanced_options/screenshot_capture_option.png" alt="Screenshot capture option" style="width:50%">}}

**Note:** This feature is also available at the global test level, as an [advanced option][4] in your browser test configuration.

## Subtests

[Subtests][5] advanced options also allow you to choose where you want your subtest to be played:

* **Main (default)**: Subtest is played in your main tab, in sequence with other steps.
* **New**: Subtest is played in a new tab, which is closed at the end of the subtest i.e. the tab cannot be reused.
* **Specific tab**: Subtest is played in a numbered tab, which can be reused by other subtests.

{{< img src="synthetics/browser_tests/advanced_options/subtest.png" alt="Subtests" style="width:60%">}}

Opening your subtest in the main tab means that your subtest is the continuation of your main test as it uses the URL from the previous step. Opening your subtest in a new tab, or in a specific tab, means that the test starts running from the subtest start URL.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/
[2]: /synthetics/browser_tests/actions/
[3]: /security/synthetics/
[4]: /synthetics/browser_tests/?tab=privacy#test-configuration
[5]: /synthetics/browser_tests/actions/#subtests
