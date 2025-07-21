---
title: Mobile App Testing Steps
description: Learn how to automatically record and manually set steps in a mobile test recording.
aliases:
- /mobile_testing/mobile_app_tests/steps
- /mobile_app_testing/mobile_app_tests/steps
further_reading:
- link: "/synthetics/mobile_app_testing/"
  tag: "Documentation"
  text: "Learn about Synthetic mobile tests"
- link: "/synthetics/mobile_app_testing/mobile_app_tests/advanced_options"
  tag: "Documentation"
  text: "Learn about advanced options in mobile tests"
---
 

## Overview

Steps represent individually recorded interactions or assertions that you want to execute in your test. To define a step, click **Start Recording** and interact with the device as you would normally, or create a step manually by clicking **Assertion** or **Interaction**. 

## Launch a device

To start recording and adding steps, select a device to launch a mobile app test from the dropdown menu and click **Launch Device**. 

{{< img src="mobile_app_testing/launch_device.png" alt="Select a device to run a mobile test on" style="width:60%" >}}

Select **Show only available devices. Available devices load faster** to see the most available devices for shorter testing wait times. 

### Notifications

Click the green **Device Connection Notification** button in the **Launch a device to start recording** modal to enable notifications for when your device is ready and when your device is going to timeout because of inactivity.

## Automatically recorded steps

After you click **Start Recording**, Datadog automatically records any interactions you have with your device and displays them in the step list on the left.

To stop recording, click **Stop Recording**.

## Manually added steps

In addition to automatically creating steps by interacting directly with your device, you can manually create steps (using the [element inspector](#element-inspector), [assertions](#assertion), and [interactions](#interaction)). You can also update steps by clicking into a previously recorded step or [reorder steps](#manage-step-order) by dragging them up and down the step list.

### Element Inspector

The Element Inspector allows you to visualize the element hierarchy, copy attributes, and target elements to generate interaction steps using XML.

You can use this feature by going to the test recorder, launching a device, and clicking the Element Inspector button. Use the Element Inspector to:

- **Visualize the element tree**: View the complete hierarchy of elements in your application for a clear, structured overview.
- **Copy attributes**: Copy attributes like element name or XPATH values directly from the inspector.
- **Target elements**: Generate steps such as _tap_ or _scroll_ by selecting the element within the element tree. 

{{< img src="mobile_app_testing/element_inspector_3.mp4" alt="Video showing the Element Inspector in Mobile App Tests" style="width:60%; height:300px;" video="true" >}}

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

### Interaction

In addition to automatically recording steps based on your device assertions, you can also manually create steps by clicking **Interaction**. 

{{< img src="mobile_app_testing/test_steps/mobile_app_interaction_2.png" alt="Choose an action type to add an interaction step" style="width:60%;" >}}

#### Double tap

Interacting with elements with a double tap on your mobile application records a step.

{{< img src="mobile_app_testing/test_steps/double_tap_2.mp4" alt="Recording a double tap step in a mobile test" style="width:60%" video=true >}}

#### Rotate device

Add a name to the step and select **Portrait** or **Landscape** mode.

{{< img src="mobile_app_testing/rotate_device.png" alt="Recording a Rotate Device step in a mobile test" style="width:60%" >}}

#### Scroll

Mobile app tests automatically scroll to the elements that need to be interacted with. In most cases, you do not need to add a scroll step manually. Use the scroll step when you need to trigger an additional interaction, such as an infinite scroll.

Specify the number of pixels you want the mobile app test to scroll vertically and horizontally.

{{< img src="mobile_app_testing/scroll_step.png" alt="Scroll step in a mobile test recording" style="width:60%;" >}}

By default, the **Scroll** step scrolls through the entire page. If you need to scroll on a specific element (for example, a specific `<div>`), click **Starting Element** and select an element you want the mobile app test to scroll on.

#### Scroll to element

This action allows you to scroll to a specific element horizontally or vertically.

{{< img src="mobile_app_testing/test_steps/scroll_to_element_3.mp4" alt="Recording a scroll to element in a mobile test" style="width:60%" video=true >}}

#### Tap

Interacting with elements with a tap on your mobile application records a step.

{{< img src="mobile_app_testing/test_steps/tap_2.mp4" alt="Recording a tap step in a mobile test" video=true >}}

#### Type text

Interacting with a text input field on your mobile application, adding a name, and setting a value records a step.

{{< img src="mobile_app_testing/test_steps/type_text_2.mp4" alt="Recording a Type Text step in a mobile test" video=true >}}

To see all available variables on manually added steps, type `{{` in the input field.

{{< img src="mobile_app_testing/injecting_variable.png" alt="Type Text step to use variables in mobile tests" style="width:25%" >}}

To use a variable on automatically recorded steps, add a step name and specify the variable value to input the variable value while recording. 

#### Press back

Interacting with the **Back** button below the mobile application records a step. Available on Android only.

{{< img src="mobile_app_testing/test_steps/press_back_2.mp4" alt="Recording a Press Back step in a mobile test" video=true >}}

#### Extract variable from element

This action allows you to extract the value of an element and save it as a variable.

{{< img src="/mobile_app_testing/test_steps/extract_variable_from_element_2.mp4" alt="Recording how to extract a variable from an element on a mobile test" style="width:60%" video=true >}}

#### Open deep link

Add a name to the step and enter a deep link URI.

{{< img src="mobile_app_testing/open_deep_link.png" alt="Recording an Open Deep Link step in a mobile test" style="width:60%" >}}

#### Restart application

This action allows you to restart your application.
This action does not reinstall the application but instead closes and then launches the application again. 

{{< img src="mobile_app_testing/test_steps/restart_application_2.mp4" alt="Recording how to restart your application" style="width:60%" video=true >}}

#### Wait

If you know that a page or page element takes more than 60 seconds to load, you can add a wait step with a max value of 300 seconds.

{{< img src="mobile_app_testing/wait_step.png" alt="Recording a Wait step in a mobile test" style="width:60%;" >}}

By default, mobile app tests wait for a page to be fully loaded before performing a step or the next step with a timeout of 60 seconds. This additional time is systematically added to **every run** of your mobile app test's recording.

#### Toggle Wi-Fi

This action allows you to enable or disable Wi-Fi within your test to monitor how your application performs with or without internet access.

{{< img src="mobile_app_testing/test_steps/toggle_wifi.png" alt="Toggle Wi-Fi interaction step" style="width:60%" >}}

#### HTTP requests

You can run HTTP requests, add [assertions](#add-assertions), and [extract variables](#extract-a-variable-from-the-response) as part of your Mobile app tests. If you are using [restrictive networks][8], ensure the required IP address ranges are added to your allowlist to enable HTTP steps to run in your Synthetic Monitoring Mobile tests.

**Note**: You can copy an HTTP step from a Synthetic Monitoring Mobile test and re-use it into a Synthetic Monitoring Browser test. However, copying steps from a Browser test to a Mobile test is not supported.

{{< img src="mobile_app_testing/test_steps/http_interaction.png" alt="Mobile app testing interactions Run HTTP test" style="width:70%;" >}}

To define your HTTP request:

1. Enter the URL you wish to test.
2. Optionally, specify **Advanced Options**:
   
   {{< tabs >}}

   {{% tab "Request Options" %}}

   * **Follow redirects**: Select this option to have your HTTP test follow up to ten redirects when performing the request.
   * **Ignore server certificate error**: Select this option to have your HTTP test go on with connection even if there are errors when validating the SSL certificate.
   * **Request headers**: Define headers to add to your HTTP request. You can also override the default headers (for example, the `user-agent` header).
   * **Cookies**: Define cookies to add to your HTTP request. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

   {{% /tab %}}

   {{% tab "Authentication" %}}

   * **Client certificate**: Authenticate through mTLS by uploading your client certificate and the associated private key.
   * **HTTP Basic Auth**: Add HTTP basic authentication credentials.
   * **Digest Auth**: Add Digest authentication credentials. 
   * **AWS Signature**: Add AWS Access Key ID and Secret Access Key.
   * **NTLM**: Add NTLM authentication credentials. Support both NTLMv2 and NTLMv1.
   * **OAuth 2.0**: Select a Grant Type (Client credentials, or Resource owner password).

   {{% /tab %}}

   {{% tab "Query Parameters" %}}

   * **Encode parameters**: Add the name and value of query parameters that require encoding. 

   {{% /tab %}}

   {{% tab "Request Body" %}}

   * **Body type**: Select the type of the request body (`text/plain`, `application/json`, `text/xml`, `text/html`, `application/x-www-form-urlencoded`, `GraphQL`, or `None`) you want to add to your HTTP request.
   * **Request body**: Add the content of your HTTP request body. The request body is limited to a maximum size of 50 KB.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **Proxy URL**: Specify the URL of the proxy the HTTP request should go through (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * **Proxy Header**: Add headers to include in the HTTP request to the proxy.

   {{% /tab %}}
  
   {{% tab "Privacy" %}}

   * **Do not save response body**: Select this option to prevent the response body from being saved at runtime. This helps ensure no sensitive data is displayed in your test results, but it can make failure troubleshooting more difficult. For full security recommendations, see [Synthetic Monitoring Data Security][1].

[1]: /data_security/synthetics
   {{% /tab %}}

   {{< /tabs >}}
   </br>
3. Click **Send** to try out the request configuration. A response preview appears.

{{< img src="mobile_app_testing/test_steps/http_mobile_request.png" alt="Make HTTP Request" style="width:80%;" >}}

##### Add assertions

Assertions define what an expected test result is. After you click **Send**, basic assertions on `status code`, `response time`, and `header` `content-type` are added based on the test response. Assertions are optional for HTTP steps in Mobile app tests.

| Type            | Operator                                                                                                               | Value type                                               |
|-----------------|------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| `body`          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][11], [`xpath`][12] | _String_ <br> _[Regex][13]_ <br> _String_, _[Regex][13]_ |
| `header`        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                                       | _String_ <br> _[Regex][13]_                              |
| `response time` | `is less than`                                                                                                         | _Integer (ms)_                                           |
| `status code`   | `is`, `is not`                                                                                                         | _Integer_                                                |

HTTP requests can decompress bodies with the following `content-encoding` headers: `br`, `deflate`, `gzip`, and `identity`.

- If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

- If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

{{< img src="synthetics/browser_tests/assertions.png" alt="Define assertions for your browser test to succeed or fail on" style="width:80%;" >}}

You can create up to 20 assertions per step by clicking **New Assertion** or by clicking directly on the response preview.

##### Extract a variable from the response

Optionally, extract a variable from the response of your HTTP request by parsing its response headers or body. The value of the variable updates each time the HTTP request step runs. Once created, this variable can be used in the [following steps](#use-variables) of your browser test.

To start parsing a variable, click **Extract a variable from response content**:

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores and must have at least three characters.
2. Decide whether to extract your variable from the response headers or the response body.

   * Extract the value from **response header**: use the full response header of your HTTP request as the variable value or parse it with [`regex`][13].
   * Extract the value from **response body**: use the full response body of your HTTP request as the variable value or parse it with [`regex`][13], [`JSONPath`][11], or [`XPath`][12].

{{< img src="synthetics/browser_tests/extracted_variable.png" alt="Extracted variable from response" style="width:80%;" >}}

</br>

For more information about additional configuration in test steps, see [Advanced Options for Mobile App Test Steps][4].

### Subtests

You can run mobile app tests within other mobile app tests to reuse existing workflows up to two levels of nesting.

To use an existing mobile app test as a subtest, click **Subtest**, select a mobile app test from the dropdown menu, and click **Add Subtest**.

{{< img src="mobile_app_testing/example_subtest.png" alt="Select a mobile test to add as a subtest" style="width:60%" >}}

In order to override variables from subtests in parent tests, ensure the variables created at the parent test level have the same names as the variables present in the subtest. A variable always uses the value that was first assigned to it. 

For more information about advanced options for subtests, see [Advanced Options for Mobile App Test Steps][5].

If it does not make sense for you to run your subtest independently, you can pause it. The test continues to be called as part of your parent test, and is not executed individually. For more information, see [Reusing Browser Test Journeys Across Your Test Suite][6].

#### Step preview

When adding subtests to your mobile tests, click the **steps** dropdown to show a preview of each step within the subtest:

{{< img src="mobile_app_testing/test_steps/subtest_mobile_preview_steps.png" alt="Add a subtest and select existing subtest or extract from steps" style="width:60%" >}}

After adding the subtest to your mobile test, click the subtest to view another preview of each step within the subtest:

{{< img src="mobile_app_testing/test_steps/subtest_preview_steps_click.png" alt="Selecting a subtest shows a preview of the steps" style="width:60%" >}}

## Variables

{{% synthetics-variables %}}

**Note**: When you import a subtest into another test, any variables defined in the subtest are inherited by the main test.
To override these variables, create a variable in your parent test with the name as the variables within your subtest. 

### Use global variables

You can use the [global variables defined in **Settings**][4] in the **Advanced Options** of your mobile app test details, as well as in your test recording to define local variables. To view a list of available variables, type `{{` in the desired field.

Make sure to define the variables you want to use in the user journey before you start recording.

You can inject available variables directly into the test steps while recording.

## Manage step order

Instead of manually reordering new steps by dragging and dropping individual steps, you can set a cursor on a test step at a particular stage in your recording and insert additional steps. 

1. Hover between two recorded test steps and click **Add Steps here**. A blue line appears above your test step. 
2. Record additional [test steps](#automatically-recorded-steps) or add [steps manually](#manually-added-steps).
3. When you complete adding additional steps above your tests step, click **Clear** to exit.

{{< img src="mobile_app_testing/test_steps/manage_step_order_2.mp4" alt="Set the cursor on a test step to add additional steps before this step" video=true >}}

## Edit a recording 

To edit a mobile recording after it's saved:

- Navigate to [Synthetic Monitoring > Tests.][7]
- Click on a previously saved mobile test.
- Click the video icon in the left hand panel, then click "edit recording".
- Select multiple or single steps for deletion or replay, then click **Save & Quit**.

{{< img src="mobile_app_testing/test_steps/edit_recording_2.png" alt="Editing a mobile recording, and using the multi-select feature" width="70%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile_app_testing/mobile_app_tests/#variables
[2]: /synthetics/settings/#global-variables
[3]: /synthetics/guide/browser-tests-totp/
[4]: /mobile_app_testing/mobile_app_tests/advanced_options
[5]: /mobile_app_testing/mobile_app_tests/advanced_options#subtests
[6]: /synthetics/guide/reusing-browser-test-journeys/
[7]: https://app.datadoghq.com/synthetics/tests
[8]: /synthetics/mobile_app_testing/mobile_app_tests/restricted_networks/
[11]: https://restfulapi.net/json-jsonpath/
[12]: https://www.w3schools.com/xml/xpath_syntax.asp
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
