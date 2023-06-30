---
title: Mobile Test Steps
kind: documentation
description: Learn how to automatically record and manually set steps in a mobile test recording.
further_reading:
- link: "/mobile_testing/mobile_tests/"
  tag: "Documentation"
  text: "Learn about Synthetic mobile tests"
- link: "/mobile_testing/advanced_options/"
  tag: "Documentation"
  text: "Learn about advanced options in mobile tests"
---

## Overview

Steps are a series of actions that you can record for a mobile test and edit or build on. To define the steps you want your mobile test to execute, either directly record them with the mobile test recording or add them manually. 

## Launch a device

To start recording and adding steps, select a device to launch a mobile test from the dropdown menu and click **Launch Device**. 

{{< img src="mobile_testing/launch_device.png" alt="Select a device to run a mobile test on" style="width:60%" >}}

Select **Show only available devices. Available devices load faster** to see the most available devices for shorter wait times. Click the **Device Connection Notification** button to enable notifications for when your device is ready.

## Automatically recorded steps

Once you click **Start Recording**, the Datadog mobile test recorder automatically launches your mobile application on a real device and records steps as you interact with your application.

To stop recording, click **End Device Session** or **Save & Quit**.

## Manually added steps

You can manually add, customize, and arrange steps on the left side of the mobile test recording.

### Assertion

Assertions allow you to validate that your browser test is in the state you expect it to be in at any point of a simulated user journey. 

To confirm your test ends in an expected state, you must end your mobile tests with an **assertion**.

{{< img src="mobile_testing/assertions.png" alt="Options for assertions in a mobile test" style="width:60%;" >}}

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

To automatically record steps such as **Tap**, **Double Tap**, **Type Text**, **Scroll**, **Press Back**, **Wait**, **Device Rotation**, and **Open Deep Link**, create this assertion step manually by clicking **Special Actions** and selecting an action type.

{{< img src="mobile_testing/special_actions.png" alt="Choose an action type to add an assertion step" style="width:60%;" >}}

#### Scroll

Mobile tests automatically scroll to the elements that need to be interacted with. In most cases, you do not need to add a scroll step manually. Use the scroll step when you need to trigger an additional interaction, such as an infinite scroll.

Specify the number of pixels you want the mobile test to scroll vertically and horizontally.

{{< img src="mobile_testing/scroll_step.png" alt="Scroll step in a mobile tst recording" style="width:60%;" >}}

By default, the **Scroll** step scrolls through the entire page. If you need to scroll on a specific element (for example, a specific `<div>`), click **Starting Element** and select an element you want the mobile test to scroll on.

#### Wait

If you know that a page or page element takes more than 60 seconds to load, you can add a wait step with a max value of 300 seconds.

{{< img src="mobile_testing/wait_step.png" alt="Wait step in a mobile test recording" style="width:60%;" >}}

By default, mobile tests wait for a page to be fully loaded before performing a step or the next step with a timeout of 60 seconds. This additional time is systematically added to **every run** of your mobile test's recording.

### Variables

Click **Variables** and select a variable creation type from the dropdown menu. 

{{< img src="mobile_testing/builtin_variables.png" alt="Out-of-the-box variable templates" style="width:80%;" >}}

To learn how to use variables inside of your steps, see [Use variables](#use-variables). For more information, see the [Variables section][1].

#### Pattern

You can select one of the following available builtins:

`{{ numeric(n) }}`
: Generates a numeric string with `n` digits.

`{{ alphabetic(n) }}`
: Generates an alphabetic string with `n` letters.

`{{ alphanumeric(n) }}`
: Generates an alphanumeric string with `n` characters.

`{{ date(n unit, format) }}`
: Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at + or - `n` units.

`{{ timestamp(n, unit) }}` 
: Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at + or - `n` units.

`{{ uuid }}`
: Generates a version 4 universally unique identifier (UUID).

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

{{< img src="mobile_testing/recording_cursor_step.mp4" alt="Set the cursor on a test step to add additional steps before this step" video="true" width="100%" >}}

## Use variables

To see all available variables on manually added steps, type `{{` in the input field.

{{< img src="mobile_testing/injecting_variable.png" alt="Type Text step to use variables in mobile tests" style="width:25%" >}}

To use a variable on automatically recorded steps, add a step name and specify the variable value in the **Type Text step** modal to input the variable value while recording. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile_testing/mobile_tests/#variables
[2]: /synthetics/settings/#global-variables
[3]: /synthetics/guide/browser-tests-totp/