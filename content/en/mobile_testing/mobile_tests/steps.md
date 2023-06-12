---
title: Mobile Test Steps
kind: documentation
description: Learn how to automatically record and manually set steps in a mobile test recording.
further_reading:
- link: "/mobile_testing/mobile_tests/"
  tag: "Documentation"
  text: "Learn about Synthetic mobile tests"
---

## Overview

Steps are a series of actions that you can record for a mobile test and edit or build on. To define the steps you want your mobile test to execute, either directly record them with the mobile test recording or add them manually. 

## Automatically recorded steps

Once you click **Start Recording**, the Datadog mobile test recorder automatically launches a mobile application and records steps on your device.

## Manually added steps

You can manually add and arrange steps on the left side of the mobile test recording.

### Assertion

Assertions allow you to validate that your browser test is in the state you expect it to be in at any point of a simulated user journey. 

To confirm your test ends in an expected state, you must end your mobile tests with an **assertion**.

// replace

{{< img src="synthetics/browser_tests/browser_test_assertions.png" alt="Options for assertions in a browser test step" style="width:70%;" >}}

Some assertions validate the active page, the page the user last interacted with, such as a **click** or an **assertion** on a page element.

To create a step, select an assertion type:

{{< tabs >}}
{{% tab "Test An Element On The Active Screen" %}}

#### Test an element's content

Create this assertion step to have your mobile test select a page element and check if it contains a specific value. 

{{% /tab %}}
{{% tab "Test Active Screen Content" %}}

#### Test that some text is present on the active screen

Create this assertion step to have your browser test confirm that the text you specified in the `Value` field is present on the current page being recorded.

#### Test that some text is not present on the active screen

Create this assertion step to have your browser test confirm that the text you specified in the `Value` field is **not** present on the current page being recorded.

{{% /tab %}}
{{< /tabs >}}

### Special actions

To automatically record steps such as **Tap**, **Double Tap**, **Type Text**, **Scroll**, **Wait**, **Rotate Device**, and **Open Deep Link**, create this assertion step manually by clicking **Special Actions** and selecting an action type.

#### Scroll

Mobile tests automatically scroll to the elements that need to be interacted with. In most cases, you do not need to add a scroll step manually. Use the scroll step when you need to trigger an additional interaction, such as an infinite scroll.

Specify the number of pixels you want the mobile test to scroll vertically and horizontally.

// replace

{{< img src="synthetics/browser_tests/browser_test_scroll_step.png" alt="Scroll step in a browser test recording Test Scroll Step" style="width:50%;" >}}

By default, the **Scroll** step scrolls through the entire page. If you need to scroll on a specific element (for example, a specific `<div>`), click **Target Element** and select an element you want the browser test to scroll on.

#### Wait

By default, mobile tests wait for a page to be fully loaded before performing a step or the next step with a timeout of 60 seconds. 

If you know that a page or page element takes more than 60 seconds to load, you can add a wait step with a max value of 300 seconds.

// replace

{{< img src="synthetics/browser_tests/browser_test_wait_step.png" alt="Wait step in a browser test recording" style="width:50%;" >}}

This additional time is systematically added to **every run** of your mobile test's recording.

### Variables

Click **Variables** and select a variable creation type from the dropdown menu. 

// replace

{{< img src="synthetics/browser_tests/variables.png" alt="Browser Test Variables" style="width:60%;" >}}

To learn how to use variables inside of your steps, see [Use variables](#use-variables). For more information, see the [Variables section][1].

#### Pattern

You can select one of the following available builtins:

`{{ numeric(n) }}`
: Generates a numeric string with `n` digits.

`{{ alphabetic(n) }}`
: Generates an alphabetic string with `n` letters.

`{{ alphanumeric(n) }}`
: Generates an alphanumeric string with `n` characters.

`{{ uuid }}`
: Generates a version 4 universally unique identifier (UUID).

`{{ date(n unit, format) }}`
: Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at + or - `n` units.

`{{ timestamp(n, unit) }}` 
: Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at + or - `n` units.

To obfuscate local variable values in test results, select **Hide and obfuscate variable value**. Once you have defined the variable string, click **Add Variable**.

#### Global variable

Select any global variables defined in [Synthetic Monitoring & Continuous Testing Settings][2].

#### Global variable - MFA

Select any MFA global variables defined in [Synthetic Monitoring & Continuous Testing Settings][2].

This type of global variable stores time-based one time password (TOTP) secret keys, allowing you to test your MFA modules and MFA-protected workflows. For more information, see [TOTPs For Multi-Factor Authentication (MFA) In Browser Tests][3].

## Manage step order

Instead of manually reordering new steps by dragging and dropping individual steps, you can set a cursor on a test step at a particular stage in your recording and insert additional steps. 

1. Hover over a recorded test step and click the **Set Cursor** icon. A blue line appears above your test step. 
2. Record additional [test steps](#automatically-recorded-steps) or add [steps manually](#manually-added-steps).
3. When you complete adding additional steps above your tests step, click **Clear Cursor** to exit.

// replace

{{< img src="synthetics/browser_tests/recording_cursor_step.mp4" alt="Set the cursor on a test step to add additional steps before this step" video="true" width="100%" >}}

## Use variables

To see all available variables on manually added steps, type `{{` in the input field.

To use a variable on automatically recorded steps, click the **Inject this variable** icon to input the variable value while recording. 

// replace

{{< img src="synthetics/browser_tests/recording_inject_variable_1.mp4" alt="Click on the test step to inject the value in your recorder page" video="true" width="100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile_testing/mobile_tests/#variables
[2]: /synthetics/settings/#global-variables
[3]: /synthetics/guide/browser-tests-totp/