---
title: Browser Testing Steps
description: >-
  Learn how to automatically record and manually set steps in a browser test
  recording.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Browser Testing > Browser Testing
  Steps
sourceUrl: https://docs.datadoghq.com/synthetics/browser_tests/actions/index.html
---

# Browser Testing Steps

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com

{% alert level="warning" %}
This product is not supported for your selected [Datadog site](https://docs.datadoghq.com/getting_started/site). ().
{% /alert %}

{% /callout %}

## Overview{% #overview %}

Steps are a series of actions that you can record for a browser test and edit or build on. To define the steps you want your browser test to execute, either directly record them with the Datadog test recorder extension or add them manually. Every step includes a set of configurable [advanced options](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/).

The default timeout for each step is 60 seconds. You can override this default timeout through the dedicated [timeout option](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/#timeout).

## Automatically recorded steps{% #automatically-recorded-steps %}

Once you click **Start Recording**, the [Datadog browser test recorder extension](https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa), automatically detects and records steps on your website.

### Click{% #click %}

Interacting with elements on your page records a step.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/browser_tests/click_step.mp4" /%}

Click on the step and select a click type you want the browser test to perform at execution time:

- Primary click corresponding to a left click
- Double click
- Contextual click corresponding to a right click

### Type text{% #type-text %}

Datadog records steps you perform on your application, such as selecting an option from a `select` dropdown menu, and a recap appears as a step.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/browser_tests/type_text.mp4" /%}

### Select option{% #select-option %}

Datadog records steps you perform on your application, such as selecting an option from a `select` dropdown menu, and a recap appears as a step on the left corner.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/select_options.28eab358d9a306d5d3459ae2741bcf53.png?auto=format"
   alt="Select options step" /%}

### Upload file{% #upload-file %}

To record an **Upload** step, either:

- Open your desktop from the browser
- Drag and drop your file in the recording iframe

Datadog records steps you perform on your application, such as uploading, and a recap appears as a step in the left corner. You can upload up to 10 files with a limit of 5MB each.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/upload_file_step.f020e1c904632e955917d417ff4f3a07.png?auto=format"
   alt="Create an upload file step" /%}

## Manually added steps{% #manually-added-steps %}

You can manually add and arrange steps on the left corner of the browser test recording.

### Assertion{% #assertion %}

Assertions allow you to validate that your browser test is in the state you expect it to be in at any point of a simulated user journey.

To confirm your test ends in an expected state, you must end your browser tests with an **assertion**.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/browser_test_assertions_2.b761507b24c0753f445ef364982b132c.png?auto=format"
   alt="Options for assertions in a browser test step" /%}

Some assertions validate the active page, the page the user last interacted with, such as a **click** or an **assertion** on a page element.

To create a step, select an assertion type:

{% tab title="Test An Element On The Active Page" %}
#### Test an element's content{% #test-an-elements-content %}

Create this assertion step to have your browser test select a page element and check if it contains a specific value.

#### Test an element's attribute{% #test-an-elements-attribute %}

Create this assertion step to have your browser test select a page element and check if one of its attributes matches the expected content.

#### Test that an element is present{% #test-that-an-element-is-present %}

Create this assertion step to have your browser test select a page element such as a specific `span`, `div`, `h`, or `a`, and confirm that it is present on the page.

Set the user locator to ensure the browser test targets the correct element by selecting `CSS` or `XPath 1.0` from the dropdown menu and adding a selector. Click **Test**.

#### Test the state of a checkbox or radio button{% #test-the-state-of-a-checkbox-or-radio-button %}

Create this assertion step to have your browser test select a page element and validate the state of the assertion (unchecked or checked).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/checkbox_state_assertion.6bf321080e21099a369530baeabd3163.png?auto=format"
   alt="Options for assertions in a browser test step" /%}

{% /tab %}

{% tab title="Test Active Page Content" %}
#### Test that some text is not present on the active page{% #test-that-some-text-is-not-present-on-the-active-page %}

Create this assertion step to have your browser test confirm that the text you specified in the `Value` field is **not** present on the current page being recorded.

#### Test that some text is present on the active page{% #test-that-some-text-is-present-on-the-active-page %}

Create this assertion step to have your browser test confirm that the text you specified in the `Value` field is present on the current page being recorded.

#### Test the content of the URL of the active page{% #test-the-content-of-the-url-of-the-active-page %}

Create this assertion step to have your browser test verify that the URL of the last page that was interacted with contains a value you specified.

You can test for a value in the URL such as `string`, `number`, or `regex`.
{% /tab %}

{% tab title="Special Assertions" %}
#### Test that an email was received{% #test-that-an-email-was-received %}

Create this assertion step to have your browser test confirm that your application's email mechanisms are working and verify that the values you specified, such as `string`, `number`, or `regex`, are present in the email subject or body.

For more information, see [Email Validation with Browser Tests](https://docs.datadoghq.com/synthetics/guide/email-validation).

#### Test your UI with custom JavaScript{% #test-your-ui-with-custom-javascript %}

Create this assertion step to test a custom assertion on the active page using your JavaScript code. JavaScript assertions support both synchronous and asynchronous code. Because browser tests load external JavaScript by adding the script to the page, they only work if your website accepts external JavaScript.

The JavaScript assertion function contains the following parameters and requires a return statement.

- The `return` (mandatory) statement reflects the condition the assertion needs to meet for your test step to succeed. Any type can be returned, but the value is automatically cast as a boolean. If a falsy value is returned, the test step fails.

- `vars` (optional): A string containing your browser test's [variables](https://docs.datadoghq.com/synthetics/browser_tests/actions#use-variables). Use `vars.<YOUR_VARIABLE>` to reference a browser test variable in your JavaScript snippet. For example, if your browser test contains a `USERNAME` variable, call it in your JavaScript snippet using `vars.USERNAME`.

- `element` (optional): The locator of the element on the page. To set this up, use the **Select** and **Update** target element buttons. The selected element automatically leverages Datadog's browser test multi-locating algorithm.

  {% video
     url="https://datadog-docs.imgix.net/images/synthetics/browser_tests/assertion_java.mp4" /%}

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

#### Test a downloaded file{% #test-a-downloaded-file %}

Create this assertion step to have your browser test verify the downloaded files from the previous steps. You can check that a file was correctly downloaded and assert the file name, size, and MD5 value.

For more information about how to test downloads, see [Test File Upload and Download](https://docs.datadoghq.com/synthetics/guide/testing-file-upload-and-download/#testing-a-file-download).

#### Test HTTP Request Count{% #test-http-request-count %}

Create this assertion step to test the number of HTTP requests made to a specific URL pattern. Enter the expected request count and the target URL regex to test against.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/number_and_target_2.6002f039543482045203240ca87646eb.png?auto=format"
   alt="Test number and target of requests option with the requests made dropdown shown" /%}

{% /tab %}

### Interaction{% #interaction %}

In addition to recording steps based on your browser assertions, you can also manually create steps by clicking **Interaction**. Then, you can choose an action type to add an interaction.

{% image
   source="https://datadog-docs.imgix.net/images/mobile_app_testing/test_steps/mobile_app_interaction_2.b14abe29b592b40659f4e35e0296a5ee.png?auto=format"
   alt="Choose an action type to add an interaction step" /%}

#### Refresh page{% #refresh-page %}

Create this navigation step to have your browser test refresh the current page of the recording.

#### Click on email link{% #click-on-email-link %}

After you have [created an email variable](https://docs.datadoghq.com/synthetics/guide/email-validation/#create-an-email-variable), create this navigation step to have your browser test access unique Synthetic mail inboxes.

Select the email and links you want the browser test to click on. This step brings you to the corresponding page and allows you to move on with the rest of your journey from that specific page.

#### Navigate to link{% #navigate-to-link %}

Create this navigation step to have your browser test go to a specific page. You must prepend your URLs with `http` or `https` in the **Enter link URL** box.

#### Press key{% #press-key %}

Add a **Press Key** step to simulate users entering keystrokes. The [Datadog browser test recorder extension](https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa) can record the following keys:

- Enter
- Arrows (up, down, right, and left)
- Tab (outside a form)
- Escape
- Backspace

To press keys that are not automatically recorded, specify the values that need to be pressed in the **Value** field.

Select `Alt`, `Control`, `Meta`, and `Shift` modifiers to add to the inputted value.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/browser_test_press_key.928ba39ca6bda31ebded75b2acf44d14.png?auto=format"
   alt="Press Key step in a browser test recording" /%}

#### Hover on element{% #hover-on-element %}

This step uses a dedicated click, not a hovering mechanism, to avoid generating a separate step every time a user hovers over an element during recording.

Select **Hover** and click on an element to add a step.

#### Scroll{% #scroll %}

Browser tests automatically scroll to the elements that need to be interacted with. In most cases, you do not need to add a scroll step manually. Use the scroll step when you need to trigger an additional interaction, such as an infinite scroll.

Specify the number of pixels you want the browser test to scroll vertically and horizontally.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/browser_test_scroll_step.e0351a4b434f56937a1f2f6cefb3de6d.png?auto=format"
   alt="Scroll step in a browser test recording Test Scroll Step" /%}

By default, the **Scroll** step scrolls through the entire page. If you need to scroll on a specific element (for example, a specific `<div>`), click **Target Element** and select an element you want the browser test to scroll on.

#### Wait{% #wait %}

By default, browser tests wait for a page to be fully loaded before performing a step or the next step with a timeout of 60 seconds.

If you know that a page or page element takes more than 60 seconds to load, you can customize the timeout in the step's [advanced options](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/#timeout) or add a hardcoded wait step with a max value of 300 seconds.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/browser_test_wait_step.c1314cc3d70c3b4efad2a689b95792ab.png?auto=format"
   alt="Wait step in a browser test recording" /%}

This additional time is systematically added to **every run** of your browser test's recording.

#### Run HTTP test{% #run-http-test %}

You can run HTTP requests, add assertions, and extract variables as part of your browser tests.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/http_request_3.19dc07f52027c0001b20b682a090d11a.png?auto=format"
   alt="HTTP Request step" /%}

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
   - **NTLM**: Add NTLM authentication credentials. Supports both NTLMv2 and NTLMv1.
   - **OAuth 2.0**: Select a Grant Type (Client credentials, or Resource owner password).

   {% /tab %}

   {% tab title="Query Parameters" %}

   - **Encode parameters**: Add the names and values of query parameters that require encoding.

   {% /tab %}

   {% tab title="Request Body" %}

   - **Body type**: Select the type of the request body (`text/plain`, `application/json`, `text/xml`, `text/html`, `application/x-www-form-urlencoded`, `application/octet-stream`, `multipart/form-data`, `GraphQL`, or `None`) you want to add to your HTTP request.
   - **Request body**: Add the content of your HTTP request body. For file uploads in Browser HTTP steps, the body size is limited to 3MB, while the request body has a maximum size limit of 50 KB.

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

Assertions define what an expected test result is. After you click **Send**, basic assertions on `status code`, `response time`, and `header` `content-type` are added based on the test response. Assertions are optional for HTTP steps in browser tests.

| Type            | Operator                                                                                                                                                                                  | Value type                                                                                                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `body`          | `contains`, `does not contain`, `is`, `is not`,`matches`, `does not match`,[`jsonpath`](https://restfulapi.net/json-jsonpath/), [`xpath`](https://www.w3schools.com/xml/xpath_syntax.asp) | *String**[Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)**String*, *[Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)* |
| `header`        | `contains`, `does not contain`, `is`, `is not`,`matches`, `does not match`                                                                                                                | *String**[Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)*                                                                                                       |
| `response time` | `is less than`                                                                                                                                                                            | *Integer (ms)*                                                                                                                                                                                             |
| `status code`   | `is`, `is not`                                                                                                                                                                            | *Integer*                                                                                                                                                                                                  |

HTTP requests can decompress bodies with the following `content-encoding` headers: `br`, `deflate`, `gzip`, and `identity`.

- If a test does not contain an assertion on the response body, the body payload drops and returns an associated response time for the request within the timeout limit set by the Synthetics Worker.

- If a test contains an assertion on the response body and the timeout limit is reached, an `Assertions on the body/response cannot be run beyond this limit` error appears.

You can create up to 20 assertions per step by clicking **New Assertion** or by clicking directly on the response preview.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/assertions.4d0a576917d9751dd29a04f1686addac.png?auto=format"
   alt="Define assertions for your browser test to succeed or fail on" /%}

##### Extract a variable from the response{% #extract-a-variable-from-the-response %}

Optionally, extract a variable from the response of your HTTP request by parsing its response headers or body. The value of the variable updates each time the HTTP request step runs. Then, you can use the variable in later steps of your browser test.

To start parsing a variable, click **Extract a variable from response content**. Then, define the variable:

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores and must have at least three characters.

1. Decide whether to extract your variable from the response headers or the response body.

   - Extract the value from **response header**: use the full response header of your HTTP request as the variable value or parse it with [`regex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
   - Extract the value from **response body**: use the full response body of your HTTP request as the variable value or parse it with [`regex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), [`JSONPath`](https://restfulapi.net/json-jsonpath/), or [`XPath`](https://www.w3schools.com/xml/xpath_syntax.asp).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/extracted_variable.c4ade627eef3b3a787c604a20738eb2c.png?auto=format"
   alt="Extracted variable from response" /%}

### Special actions{% #special-actions %}

You can use the [Datadog browser test recorder extension](https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa) to record and monitor most steps associated with user journeys. However, the extension does not automatically record some steps such as **Hover**, **Press Key**, **Scroll**, and **Wait**.

Create this assertion step manually by clicking **Special Actions** and selecting an action type.

### Variables{% #variables %}

Click **Variables** and select a variable creation type from the dropdown menu.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/variables.0db1e7839757e75e41c402b954e6b38e.png?auto=format"
   alt="Browser Test Variables" /%}

To learn how to use variables inside of your steps, see Use variables.

#### Pattern{% #pattern %}

You can select one of the following available builtins:

{% dl %}

{% dt %}
`{{ numeric(n) }}`
{% /dt %}

{% dd %}
Generates a numeric string with `n` digits.
{% /dd %}

{% dt %}
`{{ alphabetic(n) }}`
{% /dt %}

{% dd %}
Generates an alphabetic string with `n` letters.
{% /dd %}

{% dt %}
`{{ alphanumeric(n) }}`
{% /dt %}

{% dd %}
Generates an alphanumeric string with `n` characters.
{% /dd %}

{% dt %}
`{{ date(n unit, format) }}`
{% /dt %}

{% dd %}
Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at + or - `n` units.
{% /dd %}

{% dt %}
`{{ timestamp(n, unit) }}`
{% /dt %}

{% dd %}
Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at + or - `n` units.
{% /dd %}

{% dt %}
`{{ uuid }}`
{% /dt %}

{% dd %}
Generates a version 4 universally unique identifier (UUID).
{% /dd %}

{% /dl %}

To obfuscate local variable values in test results, select **Hide and obfuscate variable value**. Once you have defined the variable string, click **Add Variable**.

#### Element{% #element %}

Create a variable from content such as a `span` or `div` by extracting the element's text.

#### Email body{% #email-body %}

Create a variable from the email body using one of the following methods: [`regex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) or [`Xpath`](https://www.w3schools.com/xml/xpath_syntax.asp).

- [`Regex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) searches and returns the first matching pattern (for example, `/*./`) from the email's plain text body. If the pattern is not found, it then searches the HTML body.

- [`Xpath`](https://www.w3schools.com/xml/xpath_syntax.asp) is only applicable when the email contains an HTML body. It returns the content of the corresponding location (for example, `$`).

#### JavaScript{% #javascript %}

JavaScript steps support both synchronous and asynchronous code. Because browser tests load external JavaScript by adding the script to the page, they only work if your website accepts external JavaScript.

The JavaScript function comes with the following parameters and requires a return statement.

- The `return` (mandatory) statement returns the value you want to associate with your JavaScript variable. The statement can return any type but automatically casts the value as a string.

- `vars` (optional): A string containing your browser test's variables that you can use inside your code. Use `vars.<YOUR_VARIABLE>` to reference a browser test variable in your JavaScript snippet. For example, if your browser test already features a `PRICE` variable, call it in your JavaScript snippet using `vars.PRICE`.

- `element` (optional): The locator of the element on the page. To set this up, use the **Select** and **Update** target element buttons. The selected element automatically leverages Datadog's browser test multi-locating algorithm.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/browser_tests/custom_java_script.mp4" /%}

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

#### Global variable{% #global-variable %}

Select any global variables defined in [Synthetic Monitoring Settings](https://docs.datadoghq.com/synthetics/settings/).

#### Global variable - MFA{% #global-variable---mfa %}

Select any MFA global variables defined in [Synthetic Monitoring Settings](https://docs.datadoghq.com/synthetics/settings/).

This type of global variable stores time-based one time password (TOTP) secret keys, allowing you to test your MFA modules and MFA-protected workflows. For more information, see [TOTPs For Multi-Factor Authentication (MFA) In Browser Tests](https://docs.datadoghq.com/synthetics/guide/browser-tests-totp).

#### Email{% #email %}

Create a Datadog Synthetics email address that you can use in test steps to [assert if an email was sent correctly](https://docs.datadoghq.com/synthetics/guide/email-validation/#confirm-the-email-was-sent) or [navigate to a link in the email](https://docs.datadoghq.com/synthetics/guide/email-validation/#navigate-through-links-in-an-email), for example, to click on a confirmation link.

A unique mailbox is generated at each test execution to avoid conflicts between test runs.

### Subtests{% #subtests %}

You can run browser tests within other browser tests to reuse existing workflows up to two levels of nesting.

To use an existing browser test as a subtest, click **Add New Subtest**, select a browser test from the dropdown menu under the **From Existing Test** tab, and click **Add Subtest**.

To convert steps from your current browser test into a subtest, click on the **Extract From Steps** tab, select the recorded steps you want to extract, and click **Convert to Subtest**. By default, a subtest executes in sequence with the previous steps of the parent test.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/advanced_options/subtest.c65b82ae806a7e33c80cd1391fd75b25.png?auto=format"
   alt="Add a subtest in a browser test" /%}

In order to override variables from subtests in parent tests, ensure the variables created at the parent test level have the same names as the variables present in the subtest. A variable always uses the value that was first assigned to it.

For more information about advanced options for subtests, see [Advanced Options for Browser Test Steps](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/#subtests).

If it does not make sense for you to run your subtest independently, you can pause it. The test continues to be called as part of your parent test, and is not executed individually. For more information, see [Reusing Browser Test Journeys Across Your Test Suite](https://docs.datadoghq.com/synthetics/guide/reusing-browser-test-journeys).

## Manage step order{% #manage-step-order %}

Instead of manually reordering new steps by dragging and dropping individual steps, you can set a cursor on a test step at a particular stage in your recording and insert additional steps.

1. Hover over a recorded test step and click the **Set Cursor** icon. A blue line appears above your test step.
1. Record additional test steps or add steps manually.
1. When you complete adding additional steps above your tests step, click **Clear Cursor** to exit.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/browser_tests/recording_cursor_step.mp4" /%}

## Use variables{% #use-variables %}

To see all available variables on manually added steps, type `{{` in the input field.

To use a variable on automatically recorded steps, click the **Inject this variable** icon to input the variable value while recording.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/browser_tests/variable_input.mp4" /%}

If a variable is assigned different values along your browser test steps (for example, across subtests), the variable systematically uses the value that was first assigned to it.

Some variables only compute at runtime, such as a variable from an HTTP request or a JavaScript step. For example, assume you have a `Type text` step featuring `{{ <YOUR_VARIABLE_NAME> }}`. At test execution, `{{ <YOUR_VARIABLE_NAME> }}` is systematically replaced by your variable's associated value. To record a step using one of these variables, record a step with the actual variable value, and replace the actual value with `{{ <YOUR_VARIABLE_NAME> }}` in the step's definition before saving your test.

### Use multiple variables{% #use-multiple-variables %}

You can add multiple variables to your browser test recording steps.

In your browser test recording, click the **+ Add Variable** button to add one or more variables to your test:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/extract_multiple_variables.0cdec11e3d0fa23fdadf02c1f76b4335.png?auto=format"
   alt="Defining a local variable from global variables" /%}

In your browser test's recorder, add a step recording, and click **Extract variables from the response(optional)** to extract and use the variables in your browser test:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/edit_test_extract_multiple_variables.984a01b69a156996ceb8860fdfad0deb.png?auto=format"
   alt="Injecting a local variable into a field during a browser recording" /%}

## Edit a recording{% #edit-a-recording %}

To edit a browser recording after it's saved:

- Navigate to [Synthetic Monitoring > Tests.](https://app.datadoghq.com/synthetics/tests)
- Click on a previously saved browser test.
- Click the gear icon on the top right hand corner and then click "edit recording".
- Select multiple or single steps for deletion or replay, then click **Save & Quit**.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/edit_a_recording.638e845cb1cb8374590f26d6a3d24084.png?auto=format"
   alt="Editing a browser recording, and using the multi-select feature" /%}

## Further Reading{% #further-reading %}

- [Learn about advanced options for browser tests](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/)
- [Create and manage Synthetic Global Variables with Terraform](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable)
