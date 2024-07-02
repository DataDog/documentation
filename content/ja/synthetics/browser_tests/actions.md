---
title: Browser Testing Steps
kind: documentation
description: Learn how to automatically record and manually set steps in a browser test recording.
further_reading:
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentation
  text: Learn about advanced options for browser tests
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable"
  tag: 外部サイト
  text: Create and manage Synthetic Global Variables with Terraform
---

## Overview

Steps are a series of actions that you can record for a browser test and edit or build on. To define the steps you want your browser test to execute, either directly record them with the Datadog test recorder extension or add them manually. Every step includes a set of configurable [advanced options][1].

The default timeout for each step is 60 seconds. You can override this default timeout through the dedicated [timeout option][2]. 

## Automatically recorded steps

Once you click **Start Recording**, the [Datadog browser test recorder extension][3], available for Chrome and Edge browsers, automatically detects and records steps on your website.

### Click

Interacting with elements on your page records a step. 

{{< img src="synthetics/browser_tests/click_step.mp4" alt="Click type dropdown menu in the Click step type" video="true" width="60%" >}}

Click on the step and select a click type you want the browser test to perform at execution time:

* Primary click corresponding to a left click
* Double click
* Contextual click corresponding to a right click

### Type text

Datadog records steps you perform on your application, such as selecting an option from a `select` dropdown menu, and a recap appears as a step.

{{< img src="synthetics/browser_tests/input_text.mp4" alt="Browser Test Input Text Step" video="true" width="95%" >}}

### Select option

Datadog records steps you perform on your application, such as selecting an option from a `select` dropdown menu, and a recap appears as a step on the left corner. 

{{< img src="synthetics/browser_tests/select_options.png" alt="Select options step" style="width:70%;" >}}

### Upload file

To record an **Upload** step, either:

* Open your desktop from the browser
* Drag and drop your file in the recording iframe

Datadog records steps you perform on your application, such as uploading, and a recap appears as a step in the left corner. You can upload up to 10 files with a limit of 5MB each.

{{< img src="synthetics/browser_tests/upload_file_step.png" alt="Create an upload file step" style="width:70%;" >}}

## Manually added steps

You can manually add and arrange steps on the left corner of the browser test recording.

### Assertion

Assertions allow you to validate that your browser test is in the state you expect it to be in at any point of a simulated user journey. 

To confirm your test ends in an expected state, you must end your browser tests with an **assertion**.

{{< img src="synthetics/browser_tests/browser_test_assertions.png" alt="Options for assertions in a browser test step" style="width:70%;" >}}

Some assertions validate the active page, the page the user last interacted with, such as a **click** or an **assertion** on a page element.

To create a step, select an assertion type:

{{< tabs >}}
{{% tab "Test An Element On The Active Page" %}}

#### Test an element's content

Create this assertion step to have your browser test select a page element and check if it contains a specific value. 

#### Test an element's attribute

Create this assertion step to have your browser test select a page element and check if one of its attributes matches the expected content. 

#### Test that an element is present

Create this assertion step to have your browser test select a page element such as a specific `span`, `div`, `h`, or `a`, and confirm that it is present on the page.

Set the user locator to ensure the browser test targets the correct element by selecting `CSS` or `XPath 1.0` from the dropdown menu and adding a selector. Click **Test**. 

Datadog recommends using the two assertions listed above for better accuracy. For more information, see [Advanced Options][1].

[1]: /synthetics/browser_tests/advanced_options#user-specified-locator
{{% /tab %}}
{{% tab "Test Active Page Content" %}}

#### Test that some text is not present on the active page

Create this assertion step to have your browser test confirm that the text you specified in the `Value` field is **not** present on the current page being recorded.

#### Test that some text is present on the active page

Create this assertion step to have your browser test confirm that the text you specified in the `Value` field is present on the current page being recorded.

#### Test the content of the URL of the active page

Create this assertion step to have your browser test verify that the URL of the last page that was interacted with contains a value you specified.

You can test for a value in the URL such as `string`, `number`, or `regex`.

{{% /tab %}}

{{% tab "Special Assertions" %}}

#### Test that an email was received

Create this assertion step to have your browser test confirm that your application's email mechanisms are working and verify that the values you specified, such as `string`, `number`, or `regex`, are present in the email subject or body. 

For more information, see [Email Validation with Browser Tests][1].

#### Test your UI with custom JavaScript

Create this assertion step to test a custom assertion on the active page using your JavaScript code. JavaScript assertions support both synchronous and asynchronous code. Because browser tests load external JavaScript by adding the script to the page, they only work if your website accepts external JavaScript.

The JavaScript assertion function contains the following parameters and requires a return statement.

* The `return` (mandatory) statement reflects the condition the assertion needs to meet for your test step to succeed. Any type can be returned, but the value is automatically cast as a boolean.

* `vars` (optional): A string containing your browser test's [variables][2]. Use `vars.<YOUR_VARIABLE>` to reference a browser test variable in your JavaScript snippet. For example, if your browser test contains a `USERNAME` variable, call it in your JavaScript snippet using `vars.USERNAME`.

* `element` (optional): The locator of the element on the page. To set this up, use the **Select** and **Update** target element buttons. The selected element automatically leverages Datadog's browser test multi-locating algorithm.

{{< img src="synthetics/browser_tests/js_assertion.mp4" alt="Browser Test JavaScript Assertion" video="true" width="100%" >}}

Since JavaScript assertions run in the context of the active page, these steps can access all the objects defined in the active page (such as libraries, built-ins, and global variables). To load external libraries, use a promise. 

For example:

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// Script is now loaded

return jQuery().jquery.startsWith('3.5.1')
```

#### Test a downloaded file

Create this assertion step to have your browser test verify the downloaded files from the previous steps. You can check that a file was correctly downloaded and assert the file name, size, and MD5 value.

For more information about how to test downloads, see [Test File Upload and Download][3].

[1]: /synthetics/guide/email-validation
[2]: /synthetics/browser_tests/actions#use-variables
[3]: /synthetics/guide/testing-file-upload-and-download/#testing-a-file-download
{{% /tab %}}
{{< /tabs >}}

### Navigation

{{< img src="synthetics/browser_tests/navigation_step.png" alt="Choose between three navigation types in a browser test recording" style="width:60%;" >}}

#### Refresh a page

Create this navigation step to have your browser test refresh the current page of the recording.

#### Go to an email and click on a link

Once you have [created an email variable][4], create this navigation step to have your browser test access unique Synthetic mail inboxes.

Select the email and links you want the browser test to click on. This step brings you to the corresponding page and allows you to move on with the rest of your journey from that specific page.

#### Follow a specific link

Create this navigation step to have your browser test go to a specific page. You must prepend your URLs with `http` or `https` in the **Enter link URL** box.

### Special actions

You can use the [Datadog browser test recorder extension][3] to record and monitor most steps associated with user journeys. However, the extension does not automatically record some steps such as **Hover**, **Press Key**, **Scroll**, and **Wait**.

Create this assertion step manually by clicking **Special Actions** and selecting an action type.

#### Hover

This step uses a dedicated click, not a hovering mechanism, to avoid generating a separate step every time a user hovers over an element during recording.

Select **Hover** and click on an element to add a step.

#### Press key

Add a **Press Key** step to simulate users entering keystrokes. The [Datadog browser test recorder extension][3] can record the following keys:

* Enter
* Arrows (up, down, right, and left)
* Tab (outside a form)
* Escape
* Backspace

To press keys that are not automatically recorded, specify the values that need to be pressed in the **Value** field. 

 Select `Alt`, `Control`, `Meta`, and `Shift` modifiers to add to the inputted value.

{{< img src="synthetics/browser_tests/browser_test_press_key.png" alt="Press Key step in a browser test recording" style="width:50%;" >}}

#### Scroll

Browser tests automatically scroll to the elements that need to be interacted with. In most cases, you do not need to add a scroll step manually. Use the scroll step when you need to trigger an additional interaction, such as an infinite scroll.

Specify the number of pixels you want the browser test to scroll vertically and horizontally.

{{< img src="synthetics/browser_tests/browser_test_scroll_step.png" alt="Scroll step in a browser test recording Test Scroll Step" style="width:50%;" >}}

By default, the **Scroll** step scrolls through the entire page. If you need to scroll on a specific element (for example, a specific `<div>`), click **Target Element** and select an element you want the browser test to scroll on.

#### Wait

By default, browser tests wait for a page to be fully loaded before performing a step or the next step with a timeout of 60 seconds. 

If you know that a page or page element takes more than 60 seconds to load, you can customize the timeout in the step's [advanced options][2] or add a hardcoded wait step with a max value of 300 seconds.

{{< img src="synthetics/browser_tests/browser_test_wait_step.png" alt="Wait step in a browser test recording" style="width:50%;" >}}

This additional time is systematically added to **every run** of your browser test's recording.

### Variables

Click **Variables** and select a variable creation type from the dropdown menu. 

{{< img src="synthetics/browser_tests/variables.png" alt="Browser Test Variables" style="width:60%;" >}}

To learn how to use variables inside of your steps, see [Use variables](#use-variables).

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

#### Element

Create a variable from content such as a `span` or `div` by extracting the element's text.

#### Email body

Create a variable from the email body using one of the following methods: [`regex`][13] or [`Xpath`][12].

* [`Regex`][13] searches and returns the first matching pattern (for example, `/*./`) from the email's plain text body. If the pattern is not found, it then searches the HTML body.

* [`Xpath`][12] is only applicable when the email contains an HTML body. It returns the content of the corresponding location (for example, `$`).

#### JavaScript

JavaScript steps support both synchronous and asynchronous code. Because browser tests load external JavaScript by adding the script to the page, they only work if your website accepts external JavaScript.

The JavaScript function comes with the following parameters and requires a return statement.

* The `return` (mandatory) statement returns the value you want to associate with your JavaScript variable. The statement can return any type but automatically casts the value as a string.

* `vars` (optional): A string containing your browser test's [variables](#use-variables) that you can use inside your code. Use `vars.<YOUR_VARIABLE>` to reference a browser test variable in your JavaScript snippet. For example, if your browser test already features a `PRICE` variable, call it in your JavaScript snippet using `vars.PRICE`.

* `element` (optional): The locator of the element on the page. To set this up, use the **Select** and **Update** target element buttons. The selected element automatically leverages Datadog's browser test multi-locating algorithm.

{{< img src="synthetics/browser_tests/js_variable.mp4" alt="Browser Test JavaScript Variable" video="true" width="100%" >}}

Since JavaScript assertions run in the context of the active page, these steps can access all the objects defined in the active page (such as libraries, built-ins, and global variables). To load external libraries, use a promise. 

For example:

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// Script is now loaded

return jQuery().jquery.startsWith('3.5.1')
```

#### Global variable

Select any global variables defined in [Synthetic Monitoring Settings][5].

#### Global variable - MFA

Select any MFA global variables defined in [Synthetic Monitoring Settings][5].

This type of global variable stores time-based one time password (TOTP) secret keys, allowing you to test your MFA modules and MFA-protected workflows. For more information, see [TOTPs For Multi-Factor Authentication (MFA) In Browser Tests][6].

#### Email

Create a Datadog Synthetics email address that you can use in test steps to [assert if an email was sent correctly][7] or [navigate to a link in the email][8], for example, to click on a confirmation link.

A unique mailbox is generated at each test execution to avoid conflicts between test runs.

### Subtests

You can run browser tests within other browser tests to reuse existing workflows up to two levels of nesting.

To use an existing browser test as a subtest, click **Add New Subtest**, select a browser test from the dropdown menu under the **From Existing Test** tab, and click **Add Subtest**.

To convert steps from your current browser test into a subtest, click on the **Extract From Steps** tab, select the recorded steps you want to extract, and click **Convert to Subtest**. By default, a subtest executes in sequence with the previous steps of the parent test. 

{{< img src="synthetics/browser_tests/advanced_options/subtest.png" alt="Add a subtest in a browser test" style="width:60%;" >}}

In order to override variables from subtests in parent tests, ensure the variables created at the parent test level have the same names as the variables present in the subtest. A variable always uses the value that was first assigned to it. 

For more information about advanced options for subtests, see [Advanced Options for Browser Test Steps][9].

If it does not make sense for you to run your subtest independently, you can pause it. The test continues to be called as part of your parent test, and is not executed individually. For more information, see [Reusing Browser Test Journeys Across Your Test Suite][10].

### HTTP requests

You can run HTTP requests as part of your browser tests.

{{< img src="synthetics/browser_tests/recorder_http_requests2.png" alt="HTTP Request step" style="width:70%;" >}}

#### Set up

To define your HTTP request:

1. Select a **Method** and **URL** to query. Choose between `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE`, and `OPTIONS`.
2. Optionally, specify **Advanced Options**:

   {{< tabs >}}

   {{% tab "Request Options" %}}

   * **Follow redirects**: Tick to have your HTTP test follow up to ten redirects when performing the request.
   * **Ignore server certificate error**: Tick to have your HTTP test go on with connection even if there are errors when validating the SSL certificate.
   * **Request headers**: Define headers to add to your HTTP request. You can also override the default headers (for example, the `user-agent` header).
   * **Cookies**: Define cookies to add to your HTTP request. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

   {{% /tab %}}

   {{% tab "Authentication" %}}

   * **Client certificate**: Authenticate through mTLS by uploading your client certificate and the associated private key.
   * **HTTP Basic Auth**: Add HTTP basic authentication credentials.
   * **Digest Auth**: Add Digest authentication credentials. 
   * **NTLM**: Add NTLM authentication credentials. Support both NTLMv2 and NTLMv1.

   {{% /tab %}}

   {{% tab "Query Parameters" %}}

   * **Encode parameters**: Add the name and value of query parameters that require encoding. 

   {{% /tab %}}

   {{% tab "Request Body" %}}

   * **Body type**: Select the type of the request body (`text/plain`, `application/json`, `text/xml`, `text/html`, `application/x-www-form-urlencoded`, `GraphQL`, or `None`) you want to add to your HTTP request.
   * **Request body**: Add the content of your HTTP request body. The request body is limited to a maximum size of 50 kilobytes.

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
3. Click **Test URL** to try out the request configuration. A response preview appears.

{{< img src="synthetics/browser_tests/http_request2.png" alt="Make HTTP Request" style="width:80%;" >}}

#### Add assertions

Assertions define what an expected test result is. After you click **Test URL**, basic assertions on `status code`, `response time`, and `header` `content-type` are added based on the test response. Assertions are optional for HTTP steps in browser tests.

| Type          | Operator                                                                                               | Value type                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][11], [`xpath`][12] | _String_ <br> _[Regex][13]_ <br> _String_, _[Regex][13]_ |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _String_ <br> _[Regex][13]_                                      |
| response time | `is less than`                                                                                         | _Integer (ms)_                                                  |
| status code   | `is`, `is not`                                                                                         | _Integer_                                                      |

HTTP requests can decompress bodies with the following `content-encoding` headers: `br`, `deflate`, `gzip`, and `identity`.

- If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

- If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

{{< img src="synthetics/browser_tests/assertions.png" alt="Define assertions for your browser test to succeed or fail on" style="width:80%;" >}}

You can create up to 20 assertions per step by clicking **New Assertion** or by clicking directly on the response preview.

#### Extract a variable from the response

Optionally, extract a variable from the response of your HTTP request by parsing its response headers or body. The value of the variable updates each time the HTTP request step runs. Once created, this variable can be used in the [following steps](#use-variables) of your browser test.

To start parsing a variable, click **Extract a variable from response content**:

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores and must have at least three characters.
2. Decide whether to extract your variable from the response headers or the response body.

   * Extract the value from **response header**: use the full response header of your HTTP request as the variable value or parse it with a [`regex`][13].
   * Extract the value from **response body**: use the full response body of your HTTP request as the variable value or parse it with a [`regex`][13], a [`JSONPath`][11], or a [`XPath`][12].

{{< img src="synthetics/browser_tests/extracted_variable.png" alt="Extracted variable from response" style="width:80%;" >}}


## Manage step order

Instead of manually reordering new steps by dragging and dropping individual steps, you can set a cursor on a test step at a particular stage in your recording and insert additional steps. 

1. Hover over a recorded test step and click the **Set Cursor** icon. A blue line appears above your test step. 
2. Record additional [test steps](#automatically-recorded-steps) or add [steps manually](#manually-added-steps).
3. When you complete adding additional steps above your tests step, click **Clear Cursor** to exit.

{{< img src="synthetics/browser_tests/recording_cursor_step.mp4" alt="Set the cursor on a test step to add additional steps before this step" video="true" width="100%" >}}

## Use variables

To see all available variables on manually added steps, type `{{` in the input field.

To use a variable on automatically recorded steps, click the **Inject this variable** icon to input the variable value while recording. 

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="Click on the test step to inject the value in your recorder page" video="true" width="100%" >}}

If a variable is assigned different values along your browser test steps (for example, across subtests), the variable systematically uses the value that was first assigned to it.

Some variables only compute at runtime, such as a variable from an HTTP request or a JavaScript step. For example, assume you have a `Type text` step featuring `{{ <YOUR_VARIABLE_NAME> }}`. At test execution, `{{ <YOUR_VARIABLE_NAME> }}` is systematically replaced by your variable's associated value. To record a step using one of these variables, record a step with the actual variable value, and replace the actual value with `{{ <YOUR_VARIABLE_NAME> }}` in the step's definition before saving your test. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/advanced_options/
[2]: /synthetics/browser_tests/advanced_options/#timeout
[3]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[4]: /synthetics/guide/email-validation/#create-an-email-variable
[5]: /synthetics/settings/
[6]: /synthetics/guide/browser-tests-totp
[7]: /synthetics/guide/email-validation/#confirm-the-email-was-sent
[8]: /synthetics/guide/email-validation/#navigate-through-links-in-an-email
[9]: /synthetics/browser_tests/advanced_options/#subtests
[10]: /synthetics/guide/reusing-browser-test-journeys
[11]: https://restfulapi.net/json-jsonpath/
[12]: https://www.w3schools.com/xml/xpath_syntax.asp
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
