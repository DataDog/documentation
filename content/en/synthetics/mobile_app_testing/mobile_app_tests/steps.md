---
title: Mobile App Testing Steps
kind: documentation
description: Learn how to automatically record and manually set steps in a mobile test recording.
aliases:
- /mobile_testing/mobile_app_tests/steps
- /mobile_app_testing/mobile_app_tests/steps
further_reading:
- link: "/synthetics/mobile_app_testing/mobile_app_tests/"
  tag: "Documentation"
  text: "Learn about Synthetic mobile tests"
- link: "/synthetics/mobile_app_testing/mobile_app_tests/advanced_options"
  tag: "Documentation"
  text: "Learn about advanced options in mobile tests"
---

{{< site-region region="us,us5,eu" >}}
<div class="alert alert-warning">Mobile Application Testing is Generally Available for US1, US5, and EU sites.</div>
{{< /site-region >}}

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">Mobile Application Testing is not supported on this site.</div>
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Mobile Application Testing is not supported on this site.</div>
{{< /site-region >}}
 

## Overview

Steps represent individually recorded interactions or assertions that you want to execute in your test. To define a step, click **Start Recording** and interact with the device as you would normally, or create a step manually by clicking **Assertions** or **Special Actions**. 

## Launch a device

To start recording and adding steps, select a device to launch a mobile app test from the dropdown menu and click **Launch Device**. 

{{< img src="mobile_app_testing/launch_device.png" alt="Select a device to run a mobile test on" style="width:60%" >}}

Select **Show only available devices. Available devices load faster** to see the most available devices for shorter testing wait times. 

### Notifications

Click the green **Device Connection Notification** button in the **Launch a device to start recording** modal to enable notifications for when your device is ready and when your device is going to timeout because of inactivity.

## Automatically recorded steps

Once you click **Start Recording**, Datadog automatically records any interactions you have with your device and displays them in the step list on the left.

To stop recording, click **Stop Recording**.

## Manually added steps

In addition to automatically creating steps by interacting directly with your device, you can manually create steps (using [assertions](#assertion) and [special actions](#special-actions)). You can also update steps by clicking into a previously recorded step or [reorder steps](#manage-step-order) by dragging them up and down the step list.

### Assertion

Assertions allow you to validate the content displayed (or not displayed) within a particular section of your test flow.


{{< img src="mobile_app_testing/assertions.png" alt="Options for assertions in a mobile test" style="width:60%;" >}}


To create a step, select an assertion type:

{{< tabs >}}
{{% tab "Test An Element On The Active Screen" %}}

#### Test an element's content

Create this assertion step to have your mobile app test select a page element and check if it contains a specific value. 

{{% /tab %}}
{{% tab "Test Active Screen Content" %}}

#### Test that some text is present on the active screen

Create this assertion step to have your mobile app test confirm that the text you specified in the `Value` field is present on the current page being recorded.

#### Test that some text is not present on the active screen

Create this assertion step to have your mobile app test confirm that the text you specified in the `Value` field is **not** present on the current page being recorded.

{{% /tab %}}
{{< /tabs >}}

### Special actions

In addition to automatically recording steps based on your device interactions, you can also manually create steps by clicking **Special Actions**. 

{{< img src="mobile_app_testing/special_actions.png" alt="Choose an action type to add an assertion step" style="width:60%;" >}}

#### Tap

Interacting with elements with a tap on your mobile application records a step.

{{< img src="mobile_app_testing/tap.mp4" alt="Recording a tap step in a mobile test" video=true >}}

#### Double tap

Interacting with elements with a double tap on your mobile application records a step.

{{< img src="mobile_app_testing/double_tap.mp4" alt="Recording a double tap step in a mobile test" video=true >}}

#### Type text

Interacting with a text input field on your mobile application, adding a name, and setting a value records a step.

{{< img src="mobile_app_testing/type_text.mp4" alt="Recording a Type Text step in a mobile test" video=true >}}

To see all available variables on manually added steps, type `{{` in the input field.

{{< img src="mobile_app_testing/injecting_variable.png" alt="Type Text step to use variables in mobile tests" style="width:25%" >}}

To use a variable on automatically recorded steps, add a step name and specify the variable value to input the variable value while recording. 

#### Scroll

Mobile app tests automatically scroll to the elements that need to be interacted with. In most cases, you do not need to add a scroll step manually. Use the scroll step when you need to trigger an additional interaction, such as an infinite scroll.

Specify the number of pixels you want the mobile app test to scroll vertically and horizontally.

{{< img src="mobile_app_testing/scroll_step.png" alt="Scroll step in a mobile test recording" style="width:60%;" >}}

By default, the **Scroll** step scrolls through the entire page. If you need to scroll on a specific element (for example, a specific `<div>`), click **Starting Element** and select an element you want the mobile app test to scroll on.

#### Scroll to element

This action allows you to scroll to a specific element horizontally or vertically.

{{< img src="mobile_app_testing/test_steps/scroll_to_element_2.mp4" alt="Recording a scroll to element in a mobile test" style="width:60%" video=true >}}

#### Press back

Interacting with the **Back** button below the mobile application records a step.

{{< img src="mobile_app_testing/press_back.mp4" alt="Recording a Press Back step in a mobile test" video=true >}}

#### Wait

If you know that a page or page element takes more than 60 seconds to load, you can add a wait step with a max value of 300 seconds.

{{< img src="mobile_app_testing/wait_step.png" alt="Recording a Wait step in a mobile test" style="width:60%;" >}}

By default, mobile app tests wait for a page to be fully loaded before performing a step or the next step with a timeout of 60 seconds. This additional time is systematically added to **every run** of your mobile app test's recording.

#### Rotate device

Add a name to the step and select **Portrait** or **Landscape** mode.

{{< img src="mobile_app_testing/rotate_device.png" alt="Recording a Rotate Device step in a mobile test" style="width:60%" >}}

#### Open deep link

Add a name to the step and enter a deep link URI.

{{< img src="mobile_app_testing/open_deep_link.png" alt="Recording an Open Deep Link step in a mobile test" style="width:60%" >}}

#### Restart application

This action allows you to restart your application.
This action does not reinstall the application but instead closes and then launches the application again. 

{{< img src="mobile_app_testing/test_steps/restart_application.mp4" alt="Recording how to restart your application" style="width:60%" video=true >}}

For more information about additional configuration in test steps, see [Advanced Options for Mobile App Test Steps][4].

### Subtests

You can run mobile app tests within other mobile app tests to reuse existing workflows up to two levels of nesting.

To use an existing mobile app test as a subtest, click **Subtest**, select a mobile app test from the dropdown menu, and click **Add Subtest**.

{{< img src="mobile_app_testing/example_subtest.png" alt="Select a mobile test to add as a subtest" style="width:60%" >}}

In order to override variables from subtests in parent tests, ensure the variables created at the parent test level have the same names as the variables present in the subtest. A variable always uses the value that was first assigned to it. 

For more information about advanced options for subtests, see [Advanced Options for Mobile App Test Steps][5].

If it does not make sense for you to run your subtest independently, you can pause it. The test continues to be called as part of your parent test, and is not executed individually. For more information, see [Reusing Browser Test Journeys Across Your Test Suite][6].

### Variables
If your subtest contains variables, they are inherited by the test you import them into. 
To override these variables, create a variable in your parent test with the name as the variables within your subtest. 

#### Extract variable from element

This action allows you to extract the value of an element and save it as a variable.

{{< img src="mobile_app_testing/test_steps/extract_variable_from_element.mp4" alt="Recording how to extract a variable from an element on a mobile test" style="width:60%" video=true >}}

## Manage step order

Instead of manually reordering new steps by dragging and dropping individual steps, you can set a cursor on a test step at a particular stage in your recording and insert additional steps. 

1. Hover over a recorded test step and click the **Set Cursor** icon. A blue line appears above your test step. 
2. Record additional [test steps](#automatically-recorded-steps) or add [steps manually](#manually-added-steps).
3. When you complete adding additional steps above your tests step, click **Clear Cursor** to exit.

{{< img src="mobile_app_testing/recording_cursor_step.mp4" alt="Set the cursor on a test step to add additional steps before this step" video=true >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile_app_testing/mobile_app_tests/#variables
[2]: /synthetics/settings/#global-variables
[3]: /synthetics/guide/browser-tests-totp/
[4]: /mobile_app_testing/mobile_app_tests/advanced_options
[5]: /mobile_app_testing/mobile_app_tests/advanced_options#subtests
[6]: /synthetics/guide/reusing-browser-test-journeys/