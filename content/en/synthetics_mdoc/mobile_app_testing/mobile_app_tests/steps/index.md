---
title: Mobile App Testing Steps
description: >-
  Learn how to automatically record and manually set steps in a mobile test
  recording.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Mobile Application Testing and
  Monitoring > Mobile App Testing Steps
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/steps/index.html
---

# Mobile App Testing Steps

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com

{% alert level="warning" %}
This product is not supported for your selected [Datadog site](https://docs.datadoghq.com/getting_started/site). ().
{% /alert %}

{% /callout %}

## Overview{% #overview %}

Steps represent individually recorded interactions or assertions that you want to execute in your test. To define a step, click **Start Recording** and interact with the device as you would normally, or create a step manually by clicking **Assertion** or **Interaction**.

## Launch a device{% #launch-a-device %}

To start recording and adding steps, select a device to launch a mobile app test from the dropdown menu and click **Launch Device**.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/launch_device.44bb046fd1c2491783dafefdb8939360.png?auto=format"
   alt="Select a device to run a mobile test on" /%}

Select **Show only available devices. Available devices load faster** to see the most available devices for shorter testing wait times.

### Notifications{% #notifications %}

Click the green **Device Connection Notification** button in the **Launch a device to start recording** modal to enable notifications for when your device is ready and when your device is going to timeout because of inactivity.

## Automatically recorded steps{% #automatically-recorded-steps %}

After you click **Start Recording**, Datadog automatically records any interactions you have with your device and displays them in the step list on the left.

To stop recording, click **Stop Recording**.

## Manually added steps{% #manually-added-steps %}

In addition to automatically creating steps by interacting directly with your device, you can manually create steps (using the element inspector, assertions, and interactions). You can also update steps by clicking into a previously recorded step or reorder steps by dragging them up and down the step list.

### Element Inspector{% #element-inspector %}

The Element Inspector allows you to visualize the element hierarchy, copy attributes, and target elements to generate interaction steps using XML.

You can use this feature by going to the test recorder, launching a device, and clicking the Element Inspector button. Use the Element Inspector to:

- **Visualize the element tree**: View the complete hierarchy of elements in your application for a clear, structured overview.
- **Copy attributes**: Copy attributes like element name or XPATH values directly from the inspector.
- **Target elements**: Generate steps such as *tap* or *scroll* by selecting the element within the element tree.

{% video
   url="https://datadog-docs.imgix.net/images/mobile_app_testing/element_inspector_3.mp4" /%}

### Assertion{% #assertion %}

Assertions allow you to validate the content displayed (or not displayed) within a particular section of your test flow.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/assertions.5b04715331e26afbaa29dae766882c11.png?auto=format"
   alt="Options for assertions in a mobile test" /%}

To create a step, select an assertion type:

{% tab title="Test An Element On The Active Screen" %}
#### Test an element's content{% #test-an-elements-content %}

Create this assertion step to have your mobile app test select a page element and check if it contains a specific value.
{% /tab %}

{% tab title="Test Active Screen Content" %}
#### Test that some text is present on the active screen{% #test-that-some-text-is-present-on-the-active-screen %}

Create this assertion step to have your mobile app test confirm that the text you specified in the `Value` field is present on the current page being recorded.

#### Test that some text is not present on the active screen{% #test-that-some-text-is-not-present-on-the-active-screen %}

Create this assertion step to have your mobile app test confirm that the text you specified in the `Value` field is **not** present on the current page being recorded.
{% /tab %}

### Interaction{% #interaction %}

In addition to automatically recording steps based on your device assertions, you can also manually create steps by clicking **Interaction**.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/mobile_app_interaction_2.b14abe29b592b40659f4e35e0296a5ee.png?auto=format"
   alt="Choose an action type to add an interaction step" /%}

#### Double tap{% #double-tap %}

Interacting with elements with a double tap on your mobile application records a step.

{% video
   url="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/double_tap_2.mp4" /%}

#### Rotate device{% #rotate-device %}

Add a name to the step and select **Portrait** or **Landscape** mode.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/rotate_device.97d83ed58c6c669492f2fbb49aff35f0.png?auto=format"
   alt="Recording a Rotate Device step in a mobile test" /%}

#### Scroll{% #scroll %}

Mobile app tests automatically scroll to the elements that need to be interacted with. In most cases, you do not need to add a scroll step manually. Use the scroll step when you need to trigger an additional interaction, such as an infinite scroll.

Specify the number of pixels you want the mobile app test to scroll vertically and horizontally.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/scroll_step.deb1fce52b33eb1cf992182db157f503.png?auto=format"
   alt="Scroll step in a mobile test recording" /%}

By default, the **Scroll** step scrolls through the entire page. If you need to scroll on a specific element (for example, a specific `<div>`), click **Starting Element** and select an element you want the mobile app test to scroll on.

#### Scroll to element{% #scroll-to-element %}

This action allows you to scroll to a specific element horizontally or vertically.

{% video
   url="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/scroll_to_element_3.mp4" /%}

#### Tap{% #tap %}

Interacting with elements with a tap on your mobile application records a step.

{% video
   url="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/tap_2.mp4" /%}

#### Type text{% #type-text %}

Interacting with a text input field on your mobile application, adding a name, and setting a value records a step.

{% video
   url="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/type_text_2.mp4" /%}

To see all available variables on manually added steps, type `{{` in the input field.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/injecting_variable.330275b6daaa9dff5466e7ebd6547274.png?auto=format"
   alt="Type Text step to use variables in mobile tests" /%}

To use a variable on automatically recorded steps, add a step name and specify the variable value to input the variable value while recording.

#### Press back{% #press-back %}

Interacting with the **Back** button below the mobile application records a step. Available on Android only.

{% video
   url="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/press_back_2.mp4" /%}

#### Extract variable from element{% #extract-variable-from-element %}

This action allows you to extract the value of an element and save it as a variable.

{% video
   url="https://datadog-docs.imgix.net/images//mobile_app_testing/test_steps/extract_variable_from_element_2.mp4" /%}

#### Open deep link{% #open-deep-link %}

Add a name to the step and enter a deep link URI.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/open_deep_link.835b8cf51740597e67e78a1066cbdcb0.png?auto=format"
   alt="Recording an Open Deep Link step in a mobile test" /%}

#### Restart application{% #restart-application %}

This action allows you to restart your application. This action does not reinstall the application but instead closes and then launches the application again.

{% video
   url="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/restart_application_2.mp4" /%}

#### Wait{% #wait %}

If you know that a page or page element takes more than 60 seconds to load, you can add a wait step with a max value of 300 seconds.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/wait_step.8e501390f7889bfce372dc62bc34ad2a.png?auto=format"
   alt="Recording a Wait step in a mobile test" /%}

By default, mobile app tests wait for a page to be fully loaded before performing a step or the next step with a timeout of 60 seconds. This additional time is systematically added to **every run** of your mobile app test's recording.

#### Toggle Wi-Fi{% #toggle-wi-fi %}

This action allows you to enable or disable Wi-Fi within your test to monitor how your application performs with or without internet access.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/toggle_wifi.dd28203ee35f32cc98f51d9ef73f2362.png?auto=format"
   alt="Toggle Wi-Fi interaction step" /%}

#### HTTP requests{% #http-requests %}

You can run HTTP requests, add assertions, and extract variables as part of your Mobile app tests. If you are using [restrictive networks](https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/restricted_networks/), ensure the required IP address ranges are added to your allowlist to enable HTTP steps to run in your Synthetic Monitoring Mobile tests.

**Note**: You can copy an HTTP step from a Synthetic Monitoring Mobile test and re-use it into a Synthetic Monitoring Browser test. However, copying steps from a Browser test to a Mobile test is not supported.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/http_interaction.362596c4d0c489df459c16ed259e05d2.png?auto=format"
   alt="Mobile app testing interactions Run HTTP test" /%}

To define your HTTP request:

1. Enter the URL you wish to test.

1. Optionally, specify **Advanced Options**:



   {% tab title="Request Options" %}

   - **Follow redirects**: Select this option to have your HTTP test follow up to ten redirects when performing the request.
   - **Ignore server certificate error**: Select this option to have your HTTP test go on with connection even if there are errors when validating the SSL certificate.
   - **Request headers**: Define headers to add to your HTTP request. You can also override the default headers (for example, the `user-agent` header).
   - **Cookies**: Define cookies to add to your HTTP request. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

   {% /tab %}

   {% tab title="Authentication" %}

   - **Client certificate**: Authenticate through mTLS by uploading your client certificate and the associated private key.
   - **HTTP Basic Auth**: Add HTTP basic authentication credentials.
   - **Digest Auth**: Add Digest authentication credentials.
   - **AWS Signature**: Add AWS Access Key ID and Secret Access Key.
   - **NTLM**: Add NTLM authentication credentials. Support both NTLMv2 and NTLMv1.
   - **OAuth 2.0**: Select a Grant Type (Client credentials, or Resource owner password).

   {% /tab %}

   {% tab title="Query Parameters" %}

   - **Encode parameters**: Add the name and value of query parameters that require encoding.

   {% /tab %}

   {% tab title="Request Body" %}

   - **Body type**: Select the type of the request body (`text/plain`, `application/json`, `text/xml`, `text/html`, `application/x-www-form-urlencoded`, `GraphQL`, or `None`) you want to add to your HTTP request.
   - **Request body**: Add the content of your HTTP request body. The request body is limited to a maximum size of 50 KB.

   {% /tab %}

   {% tab title="Proxy" %}

   - **Proxy URL**: Specify the URL of the proxy the HTTP request should go through (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   - **Proxy Header**: Add headers to include in the HTTP request to the proxy.

   {% /tab %}

   {% tab title="Privacy" %}

   - **Do not save response body**: Select this option to prevent the response body from being saved at runtime. This helps ensure no sensitive data is displayed in your test results, but it can make failure troubleshooting more difficult. For full security recommendations, see [Synthetic Monitoring Data Security](https://docs.datadoghq.com/data_security/synthetics).

   {% /tab %}



1. Click **Send** to try out the request configuration. A response preview appears.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/http_mobile_request.c903a9fc7592361b02d7a7bf1aca5199.png?auto=format"
   alt="Make HTTP Request" /%}

##### Add assertions{% #add-assertions %}

Assertions define what an expected test result is. After you click **Send**, basic assertions on `status code`, `response time`, and `header` `content-type` are added based on the test response. Assertions are optional for HTTP steps in Mobile app tests.

| Type            | Operator                                                                                                                                                                                  | Value type                                                                                                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `body`          | `contains`, `does not contain`, `is`, `is not`,`matches`, `does not match`,[`jsonpath`](https://restfulapi.net/json-jsonpath/), [`xpath`](https://www.w3schools.com/xml/xpath_syntax.asp) | *String**[Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)**String*, *[Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)* |
| `header`        | `contains`, `does not contain`, `is`, `is not`,`matches`, `does not match`                                                                                                                | *String**[Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)*                                                                                                       |
| `response time` | `is less than`                                                                                                                                                                            | *Integer (ms)*                                                                                                                                                                                             |
| `status code`   | `is`, `is not`                                                                                                                                                                            | *Integer*                                                                                                                                                                                                  |

HTTP requests can decompress bodies with the following `content-encoding` headers: `br`, `deflate`, `gzip`, and `identity`.

- If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

- If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/assertions.4d0a576917d9751dd29a04f1686addac.png?auto=format"
   alt="Define assertions for your browser test to succeed or fail on" /%}

You can create up to 20 assertions per step by clicking **New Assertion** or by clicking directly on the response preview.

##### Extract a variable from the response{% #extract-a-variable-from-the-response %}

Optionally, extract a variable from the response of your HTTP request by parsing its response headers or body. The value of the variable updates each time the HTTP request step runs. Once created, this variable can be used in the following steps of your browser test.

To start parsing a variable, click **Extract a variable from response content**:

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores and must have at least three characters.

1. Decide whether to extract your variable from the response headers or the response body.

   - Extract the value from **response header**: use the full response header of your HTTP request as the variable value or parse it with [`regex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
   - Extract the value from **response body**: use the full response body of your HTTP request as the variable value or parse it with [`regex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), [`JSONPath`](https://restfulapi.net/json-jsonpath/), or [`XPath`](https://www.w3schools.com/xml/xpath_syntax.asp).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/extracted_variable.c4ade627eef3b3a787c604a20738eb2c.png?auto=format"
   alt="Extracted variable from response" /%}

For more information about additional configuration in test steps, see [Advanced Options for Mobile App Test Steps](https://docs.datadoghq.com/mobile_app_testing/mobile_app_tests/advanced_options).

### Subtests{% #subtests %}

You can run mobile app tests within other mobile app tests to reuse existing workflows up to two levels of nesting.

To use an existing mobile app test as a subtest, click **Subtest**, select a mobile app test from the dropdown menu, and click **Add Subtest**.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/example_subtest.7f9c7672305fcbaafcb9a34246117f78.png?auto=format"
   alt="Select a mobile test to add as a subtest" /%}

In order to override variables from subtests in parent tests, ensure the variables created at the parent test level have the same names as the variables present in the subtest. A variable always uses the value that was first assigned to it.

For more information about advanced options for subtests, see [Advanced Options for Mobile App Test Steps](https://docs.datadoghq.com/mobile_app_testing/mobile_app_tests/advanced_options#subtests).

If it does not make sense for you to run your subtest independently, you can pause it. The test continues to be called as part of your parent test, and is not executed individually. For more information, see [Reusing Browser Test Journeys Across Your Test Suite](https://docs.datadoghq.com/synthetics/guide/reusing-browser-test-journeys/).

#### Step preview{% #step-preview %}

When adding subtests to your mobile tests, click the **steps** dropdown to show a preview of each step within the subtest:

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/subtest_mobile_preview_steps.e8bfc9ffa301eaa134fde9a24794bd7a.png?auto=format"
   alt="Add a subtest and select existing subtest or extract from steps" /%}

After adding the subtest to your mobile test, click the subtest to view another preview of each step within the subtest:

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/subtest_preview_steps_click.01c953b68bbb31857ab56d1155564da4.png?auto=format"
   alt="Selecting a subtest shows a preview of the steps" /%}

## Variables{% #variables %}

### Create local variables{% #create-local-variables %}

To create a local variable, click **+ All steps > Variables**. You can select one of the following available builtins to add to your variable string:

{% dl %}

{% dt %}
{{ numeric(n) }}
{% /dt %}

{% dd %}
Generates a numeric string with `n` digits.
{% /dd %}

{% dt %}
{{ alphabetic(n) }}
{% /dt %}

{% dd %}
Generates an alphabetic string with `n` letters.
{% /dd %}

{% dt %}
{{ alphanumeric(n) }}
{% /dt %}

{% dd %}
Generates an alphanumeric string with `n` characters.
{% /dd %}

{% dt %}
{{ date(n unit, format) }}
{% /dt %}

{% dd %}
Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at + or - `n` units.
{% /dd %}

{% dt %}
{{ timestamp(n, unit) }}
{% /dt %}

{% dd %}
Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at +/- `n` units.
{% /dd %}

{% dt %}
{{ uuid }}
{% /dt %}

{% dd %}
Generates a version 4 universally unique identifier (UUID).
{% /dd %}

{% dt %}
{{ public-id }}
{% /dt %}

{% dd %}
Injects the Public ID of your test.
{% /dd %}

{% dt %}
{{ result-id }}
{% /dt %}

{% dd %}
Injects the Result ID of your test run.
{% /dd %}

{% /dl %}

To obfuscate local variable values in test results, select **Hide and obfuscate variable value**. Once you have defined the variable string, click **Add Variable**.

**Note**: When you import a subtest into another test, any variables defined in the subtest are inherited by the main test. To override these variables, create a variable in your parent test with the name as the variables within your subtest.

### Use global variables{% #use-global-variables %}

You can use the [global variables defined in **Settings**](https://docs.datadoghq.com/mobile_app_testing/mobile_app_tests/advanced_options) in the **Advanced Options** of your mobile app test details, as well as in your test recording to define local variables. To view a list of available variables, type `{{` in the desired field.

Make sure to define the variables you want to use in the user journey before you start recording.

You can inject available variables directly into the test steps while recording.

## Manage step order{% #manage-step-order %}

Instead of manually reordering new steps by dragging and dropping individual steps, you can set a cursor on a test step at a particular stage in your recording and insert additional steps.

1. Hover between two recorded test steps and click **Add Steps here**. A blue line appears above your test step.
1. Record additional test steps or add steps manually.
1. When you complete adding additional steps above your tests step, click **Clear** to exit.

{% video
   url="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/manage_step_order_2.mp4" /%}

## Edit a recording{% #edit-a-recording %}

To edit a mobile recording after it's saved:

- Navigate to [Synthetic Monitoring > Tests.](https://app.datadoghq.com/synthetics/tests)
- Click on a previously saved mobile test.
- Click the video icon in the left hand panel, then click "edit recording".
- Select multiple or single steps for deletion or replay, then click **Save & Quit**.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/edit_recording_2.d6ca956916600af424ad44b1c3dfb4c6.png?auto=format"
   alt="Editing a mobile recording, and using the multi-select feature" /%}

## Further reading{% #further-reading %}

- [Learn about Synthetic mobile tests](https://docs.datadoghq.com/synthetics/mobile_app_testing/)
- [Learn about advanced options in mobile tests](https://docs.datadoghq.com/synthetics/mobile_app_testing/mobile_app_tests/advanced_options)
